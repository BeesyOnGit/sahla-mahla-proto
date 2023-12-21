import "./App.css";
import { ReactElement, ReactNode, Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { setTheme, useWindowDimensions } from "./MiddleWear/ClientFunctions";
import { Contexts } from "./Contexts/Contexts";
import Sidebar from "./Components/SideBar/Sidebar";
import { sideBarLang } from "./Components/SideBar/sidebarLang";
import Login from "./Pages/Login/Login";
import RouteProtection from "./Routes/RouteProtection";
import Alerts from "./Components/Alerts/Alerts";
import Home from "./Pages/Home/Home";
import Library from "./Pages/Library/Library";
import AllLibrary from "./Pages/Library/SubPages/AllLibrary/AllLibrary";
import BookMarked from "./Pages/Library/SubPages/BookMarked/BookMarked";
import OwnedResources from "./Pages/ResourcesPage/subPages/SellingResources/SellingResources";
import MyResources from "./Pages/ResourcesPage/subPages/MyResources/MyResources";
import Resources from "./Pages/ResourcesPage/Resources";
import SellingResources from "./Pages/ResourcesPage/subPages/SellingResources/SellingResources";
import Profile from "./Pages/Profile/Profile";
import Projects from "./Pages/Projects/Projects";
import AllProjects from "./Pages/Projects/subPages/AllProjects/AllProjects";
import AddOffer from "./Pages/Projects/subPages/AddOffer/AddOffer";
// import { alerts } from "./MiddleWear/Signals";

function App() {
    const { darkMode, userLang, initialLanguage, Token } = Contexts();
    const { pathname } = useLocation();
    // const dimentions = useWindowDimensions();
    const navigate = useNavigate();

    initialLanguage();
    useEffect(() => {
        setTheme(JSON.parse(darkMode));
    }, []);

    useEffect(() => {
        if (userLang == "ar") {
            const html = document.querySelector("html");
            html!.dir = "rtl";
            return;
        }
        const html = document.querySelector("html");
        html!.dir = "ltr";
    }, [userLang]);

    const navitems: { 1: SidebarItem[]; 2: SidebarItem[] } = {
        1: [
            {
                name: sideBarLang[userLang].NavElems.home,
                path: "/home",
                ico: "fi fi-sr-home",
                page: <Home />,
                needValidation: true,
                subRoute: [
                    {
                        path: "new",
                        page: <div>new page</div>,
                        needValidation: false,
                    },
                ],
            },
            {
                name: sideBarLang[userLang].NavElems.orders,
                path: "/orders",
                ico: "fi fi-br-list",
                page: <div>orders</div>,
            },
            {
                name: sideBarLang[userLang].NavElems.findWork,
                path: "/offers",
                ico: "fi fi-sr-briefcase",
                page: <Projects />,
                needValidation: true,
                subRoute: [
                    {
                        path: "all",
                        page: <AllProjects />,
                    },
                    {
                        path: "new",
                        page: <AddOffer />,
                    },
                ],
            },
            {
                name: sideBarLang[userLang].NavElems.resources,
                path: "/resources",
                ico: "fi fi-sr-images",
                needValidation: true,
                page: <Resources />,
                subRoute: [
                    {
                        path: "owned",
                        page: <MyResources />,
                    },
                    {
                        path: "selling",
                        page: <SellingResources />,
                    },
                ],
            },
            {
                name: sideBarLang[userLang].NavElems.library,
                path: "/library",
                ico: "fi fi-sr-books",
                page: <Library />,
                subRoute: [
                    {
                        path: "all",
                        page: <AllLibrary />,
                    },
                    {
                        path: "bookmarked",
                        page: <BookMarked />,
                        needValidation: false,
                    },
                ],
            },
            {
                name: sideBarLang[userLang].NavElems.commManagement,
                path: "/gst-comm",
                ico: "fi fi-sr-chart-pie-alt",
            },
            {
                name: sideBarLang[userLang].NavElems.profile,
                path: "/profile",
                ico: "fi fi-sr-user",
                page: <Profile />,
            },
            {
                name: sideBarLang[userLang].NavElems.logout,
                path: "/logout",
                ico: "fi fi-br-sign-out-alt logout",
            },
        ],
        2: [
            {
                name: sideBarLang[userLang].NavElems.home,
                path: "/home",
                ico: "fi fi-sr-home",
                page: <Home />,
                needValidation: true,
            },
            {
                name: sideBarLang[userLang].NavElems.myOrders,
                path: "/myorders",
                ico: "fi fi-br-list",
                // subRoute: [
                //     {
                //         path: "pending",
                //         page: "",
                //         needValidation: true,
                //     },
                // ],
            },
            {
                name: sideBarLang[userLang].NavElems.library,
                path: "/library",
                ico: "fi fi-sr-books",
                page: <Library />,
                needValidation: false,
                subRoute: [
                    {
                        path: "all",
                        page: <AllLibrary />,
                        needValidation: false,
                    },
                ],
            },
            {
                name: sideBarLang[userLang].NavElems.commManagement,
                path: "/gst-comm",
                ico: "fi fi-sr-chart-pie-alt",
            },
            {
                name: sideBarLang[userLang].NavElems.profile,
                path: "/profile",
                ico: "fi fi-sr-user",
            },
            {
                name: sideBarLang[userLang].NavElems.delivery,
                path: "/delivery",
                ico: "i fi-sr-shipping-fast",
            },
            {
                name: sideBarLang[userLang].NavElems.support,
                path: "/support",
                ico: "fi fi-sr-user-headset",
            },

            {
                name: sideBarLang[userLang].NavElems.logout,
                path: "/logout",
                ico: "fi fi-br-sign-out-alt",
            },
        ],
    };

    return (
        <div className="AppContainer">
            <Alerts />
            {!hideNav[pathname] && <Sidebar navItems={navitems[1]} />}
            <section className="routes">
                <Routes>
                    <Route path="/login" element={!Token ? <Login /> : <Navigate to="/" />} />
                    <Route path="/" element={<Navigate to="/home" />}></Route>
                    {navitems[1].map((elem, i) => {
                        const { path, page, needValidation, subRoute } = elem;
                        return (
                            <Route
                                key={i}
                                path={path}
                                element={
                                    <RouteProtection needValidation key={i}>
                                        {page}
                                    </RouteProtection>
                                }
                            >
                                {subRoute &&
                                    subRoute.map((e, i) => {
                                        const { path, page, needValidation } = e;
                                        return (
                                            <Route
                                                key={i}
                                                path={path}
                                                element={
                                                    needValidation ? (
                                                        <RouteProtection key={i} needValidation>
                                                            {page}
                                                        </RouteProtection>
                                                    ) : (
                                                        page
                                                    )
                                                }
                                            />
                                        );
                                    })}
                            </Route>
                        );
                    })}
                    <Route
                        path="/validation-page"
                        element={
                            <RouteProtection>
                                <div>validation page</div>
                            </RouteProtection>
                        }
                    />
                </Routes>
            </section>
        </div>
    );
}

export default App;

const hideNav: any = {
    "/login": true,
    "/validation-page": true,
};

export type SidebarItem = {
    name: string;
    ico: string;
    path: string;
    page?: JSX.Element;
    needValidation?: boolean;
    subRoute?: { path: string; page: JSX.Element; needValidation?: boolean }[];
};

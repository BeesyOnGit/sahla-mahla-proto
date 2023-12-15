import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { setTheme, useWindowDimensions } from "./MiddleWear/ClientFunctions";
import { Contexts } from "./Contexts/Contexts";
import Sidebar from "./Components/SideBar/Sidebar";
import { sideBarLang } from "./Components/SideBar/sidebarLang";
import Login from "./Pages/Login/Login";
import RouteProtection from "./Routes/RouteProtection";
import Alerts from "./Components/Alerts/Alerts";
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

    const navitems = {
        1: [
            {
                name: sideBarLang[userLang].NavElems.home,
                navigation: "/",
                ico: "fi fi-sr-home",
            },
            {
                name: sideBarLang[userLang].NavElems.orders,
                navigation: "/orders",
                ico: "fi fi-sr-boxes",
            },
            {
                name: sideBarLang[userLang].NavElems.inventory,
                navigation: "/inventory",
                ico: "fi fi-sr-truck-loading",
            },
            {
                name: sideBarLang[userLang].NavElems.stats,
                navigation: "/stats",
                ico: "fi fi-sr-chart-pie-alt",
            },
            {
                name: sideBarLang[userLang].NavElems.storeManage,
                navigation: "/store-management",
                ico: "fi fi-sr-store-alt",
            },
            {
                name: sideBarLang[userLang].NavElems.profile,
                navigation: "/user-profile",
                ico: "fi fi-sr-user",
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
                    <Route
                        path="/"
                        element={
                            <RouteProtection needValidation>
                                <div>Home page</div>
                            </RouteProtection>
                        }
                    />
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

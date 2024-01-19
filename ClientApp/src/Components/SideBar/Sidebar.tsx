import { useState } from "react";
import NavItem, { navItemsType } from "./NavItem";
import "./Sidebar.scss";

export type sideBarType = {
    navItems: navItemsType[];
    children?: any;
};

function Sidebar(props: sideBarType) {
    // const { width, height } = useWindowDimensions();
    const { navItems, children } = props;

    const [notifStat, setNotifStat] = useState("");
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [selectedNavItem, setSelectedNav] = useState(0);
    const [hoveredNavItem, sethoveredNav] = useState(undefined);

    // if (!window.localStorage.showBar) {
    //     window.localStorage.setItem("showBar", "true");
    // }
    // const [showSideBar, setShowSideBar] = useState(JSON.parse(window.localStorage.showBar));

    // const toggleSideBar = () => {
    //     const curentSideBarState = JSON.parse(window.localStorage.showBar);
    //     window.localStorage.showBar = (!curentSideBarState).toString();
    //     setShowSideBar(!curentSideBarState);
    // };

    // const showBar = "true";

    const changeHover = (boolean: boolean) => {
        setIsHovered(boolean);
    };

    // const ShowButtonCondition = width! <= 480;

    return (
        <>
            <div
                // className={showSideBar == true ? "sidebarDiv" : "sidebarDiv hidden"}
                className="sidebarDiv"
                onMouseEnter={() => {
                    changeHover(true);
                }}
                onMouseLeave={() => {
                    changeHover(false);
                }}
            >
                <section className="logoSideBar">
                    <h1>S&M</h1>
                </section>
                <section className="PageNavigation customScroll">
                    {Array.isArray(navItems) &&
                        navItems
                            .filter((e: any, i) => {
                                return e.ignoreNav == false;
                            })
                            .map((e: any, index: number) => {
                                return (
                                    <NavItem
                                        key={index}
                                        {...e}
                                        index={index}
                                        // notif={notifStat[e.name!] || null}
                                        hover={isHovered}
                                        selected={selectedNavItem}
                                        setSelectedNav={setSelectedNav}
                                        hoverdItem={hoveredNavItem}
                                        setHoveredItem={sethoveredNav}
                                    />
                                );
                            })}
                </section>
                {children}
                {/* {ShowButtonCondition ? <i className="fi fi-sr-angle-circle-left SideBarHideButton" onClick={() => toggleSideBar()}></i> : null} */}
            </div>
        </>
    );
}

export default Sidebar;

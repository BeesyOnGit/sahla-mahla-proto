import React from "react";
import { navElem } from "../../../App";
import "./NavElems.css";
import { useLocation, useNavigate } from "react-router-dom";
import { urlPath } from "../../../MiddleWear/ClientFunctions";

function NavElems({ icon, name, link, notif }: navElem) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isSelected = {
        [pathname]: " ",
        [link]: "navSelected",
    };

    return (
        <div className={"navElemContainer " + isSelected[urlPath(pathname)]} onClick={() => navigate(link)}>
            <i className={icon}> </i>
            <div> {name} </div>
            {notif ? <span className="navNotifs"> {notif} </span> : null}
        </div>
    );
}

export default NavElems;

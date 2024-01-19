import { useLocation, useNavigate } from "react-router-dom";
import "./NavItem.scss";
import { useState } from "react";
import { Contexts } from "../../Contexts/Contexts";
import { urlPath } from "../../MiddleWear/ClientFunctions";
export type navItemsType = {
    name: string;
    path: string;
    ico: string;
    notif?: number;
    hover?: boolean;
    selected?: number;
    index?: number;
    setSelectedNav?: any;
    setHoveredItem?: any;
    hoverdItem?: number;
};

function NavItem({ name, path, ico, notif, hover, selected, index, setSelectedNav, setHoveredItem, hoverdItem }: navItemsType) {
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const navItemHash: any = {
        false: "IconOnly",
        true: "IconTexte",
    };

    const ItemDeCoHash: any = {
        "-1": "botRight",
        "1": "topRight",
    };

    const texteClasses: any = {
        true: "texteVisible",
        false: "texteInvisible",
    };
    const changeHover = (val: number | undefined) => {
        setHoveredItem(val);
    };

    const selectedCondition = urlPath(pathname) == path;
    selectedCondition ? setSelectedNav(index) : null;

    return (
        <div
            className={
                "NavItem " +
                " " +
                navItemHash[`${hover}`] +
                " " +
                (selectedCondition ? "NavActive " : " ") +
                (ItemDeCoHash[`${index! - selected!}`] || "") +
                " " +
                (ItemDeCoHash[`${index! - hoverdItem!}`] || "")
            }
            onClick={() => navigate(path)}
            onMouseEnter={() => changeHover(index)}
            onMouseLeave={() => changeHover(undefined)}
        >
            {/* {selectedCondition ? (
                <>
                    <div className="num top">
                        <span className="NavDecorationSpan"></span>
                        <span className="NavDecorationSpan hider"></span>
                    </div>
                    <div className="num bottom">
                        <span className="NavDecorationSpan"></span>
                        <span className="NavDecorationSpan hider"></span>
                    </div>
                </>
            ) : null} */}

            <i className={"inconnav " + ico}></i>
            <span className={"navItemName " + texteClasses[`${hover}`]}>{name}</span>

            {notif ? <span className="navNotification bgWarning">{notif}</span> : null}
        </div>
    );
}

export default NavItem;

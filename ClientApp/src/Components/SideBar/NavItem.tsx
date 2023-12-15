import { useLocation, useNavigate } from "react-router-dom";
import "./NavItem.scss";
import { useState } from "react";
import { Contexts } from "../../Contexts/Contexts";
export type navItemsType = {
    name: string;
    navigation: string;
    ico: string;
    notif?: number;
    hover?: boolean;
    selected?: number;
    index?: number;
    setSelectedNav?: any;
    setHoveredItem?: any;
    hoverdItem?: number;
};

function NavItem({ name, navigation, ico, notif, hover, selected, index, setSelectedNav, setHoveredItem, hoverdItem }: navItemsType) {
    const { userLang } = Contexts();

    const location = useLocation();

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

    const selectedCondition = location.pathname == navigation;
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
            onClick={() => navigate(navigation)}
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
            {/* <div className="num2"></div> */}
            <i className={"inconnav " + ico}></i>
            <span className={"navItemName " + texteClasses[`${hover}`] + " " + userLang}>{name}</span>

            {notif ? <span className="navNotification bgWarning">{notif}</span> : null}
        </div>
    );
}

export default NavItem;

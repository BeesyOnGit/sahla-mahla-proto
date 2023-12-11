import React, { useEffect, useState } from "react";
import { Contexts } from "../../Contexts/Contexts";
import "./NavbarDesktop.css";
import { useNavigate } from "react-router-dom";
import { navElements } from "./NavFunctions";
import AutoInputs from "../AutoInputs/AutoInputs";
import { isScroll } from "../../MiddleWear/Signals";

export type navProps = {};

export const DarkmodeActiv: any = { true: "toggled" };
export const DarkmodeInActiv: any = { false: "toggled" };

function Navbar(props: navProps) {
    const { userLang, darkMode, switchDkMode, switchLanguage } = Contexts();

    const { value: pageScrolled } = isScroll;
    console.log("🚀 ~ file: NavbarDesktop.tsx:18 ~ Navbar ~ pageScrolled:", pageScrolled);

    const navigate = useNavigate();

    const noSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const arrayElems = navElements();

    return (
        <div className={"navBarBody " + navBarBgStyle[`${pageScrolled}`]}>
            <div className="headerLogo">
                <img src="/logo.webp" className="logo" onClick={() => navigate("/")} />
            </div>

            <div className="navRightDiv">
                <AutoInputs onSubmit={noSubmit} inputsArr={arrayElems} />
            </div>
        </div>
    );
}

export default Navbar;

const navBarBgStyle: any = {
    true: "navScrolled",
    false: "",
};

import React, { useEffect, useState } from "react";
import { Contexts } from "../../Contexts/Contexts";
import "./NavbarDesktop.css";
import { useNavigate } from "react-router-dom";
import { navElements } from "./NavFunctions";
import AutoInputs from "../AutoInputs/AutoInputs";

export type navProps = {};
const ClassSelector = { true: "Mobil", false: "Desktop" };

export const DarkmodeActiv: any = { true: "toggled" };
export const DarkmodeInActiv: any = { false: "toggled" };
export const langfr: any = { fr: "toggled" };
export const langar: any = { ar: "toggled" };

function Navbar(props: navProps) {
    const { userLang, darkMode, switchDkMode, switchLanguage } = Contexts();

    const navigate = useNavigate();

    const noSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const arrayElems = navElements();

    return (
        <div className="navBarBody">
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

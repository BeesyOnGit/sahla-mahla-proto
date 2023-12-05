import "./SideNav.css";
import { navElem } from "../../App";
import NavElems from "./NavElems/NavElems";
import { useNavigate } from "react-router-dom";
import { logoutFunction } from "../../Pages/Login/LoginFunctions";
import Button from "../Button/Button";
import { sideNavLang } from "./SideNavLang";
import { Contexts } from "../../Contexts/Contexts";
type sideNav = {
    navigationElements: Array<navElem>;
    hidenState: boolean;
    changehidenState: Function;
    name: string;
};

function SideNav({ hidenState, navigationElements, changehidenState, name }: sideNav) {
    const { userLang, switchLanguage } = Contexts();
    const navigate = useNavigate();

    const source = window.localStorage.logo ? window.localStorage.logo : "/logo.webp";
    return (
        <nav className="navContainer" style={hidenState ? { width: "0" } : {}}>
            <div className="NavLogoContainer" onClick={() => navigate("/")}>
                <img className="logoImage" src={source} alt="" />
                <div className="businessName"> {name} </div>
            </div>
            {navigationElements.map((element: navElem, index: number) => {
                return <NavElems key={index} {...element} />;
            })}

            <div className="navRest">
                <Button
                    className="hideButton"
                    icon="fi fi-sr-eye-crossed"
                    content={sideNavLang[userLang].hideButton}
                    onClick={() => {
                        changehidenState(true);
                    }}
                />
                <Button
                    className="hideButton"
                    icon="fi fi-br-refresh"
                    content={sideNavLang[userLang].switchLang}
                    onClick={() => {
                        switchLanguage();
                    }}
                />
            </div>

            <div className="lougout negativeResponse" onClick={() => logoutFunction()}>
                <span> {sideNavLang[userLang].lougout} </span> <i className="fi fi-sr-hand-wave"></i>{" "}
            </div>
        </nav>
    );
}

export default SideNav;

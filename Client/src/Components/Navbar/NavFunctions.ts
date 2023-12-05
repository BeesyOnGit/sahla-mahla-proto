import { Navigate, useNavigate } from "react-router-dom";
import { InputType, langType } from "../../MiddleWear/ClientInterface";
import { navbarLang } from "./NavbarLang";
export const navElements = () => {
    const lang: langType = window.localStorage.lang;
    const navigate = useNavigate();
    const elems: InputType[] = [
        {
            inputType: "button",
            type: "button",
            icon: "fi fi-ss-badge-check proIconAnimation",
            content: navbarLang[lang].proOffer,
            className: "navButton",
            onClick: () => {
                navigate("/sahla-Pro");
            },
        },
        {
            inputType: "button",
            type: "button",
            icon: "fi fi-br-earth-africa",
            content: navbarLang[lang].language,
            className: "navButton",
        },
        {
            inputType: "button",
            type: "button",
            content: navbarLang[lang].freelanceOffer,
            className: "navButton",
            onClick: () => {
                navigate("/freelance");
            },
        },
        {
            inputType: "button",
            type: "button",
            content: navbarLang[lang].about,
            className: "navButton",
            onClick: () => {
                navigate("/about");
            },
        },
        {
            inputType: "button",
            type: "button",
            content: navbarLang[lang].login,
            className: "logButton",
            onClick: () => {
                navigate("/login");
            },
        },
    ];
    return elems;
};

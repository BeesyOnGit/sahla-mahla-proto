import { useState, useContext, createContext } from "react";

export interface ContextsType {
    darkMode: string;
    Token: string;
    // SToken: string;
    // SvToken: string;
    userLang: string;
    initialDkMode: Function;
    initialLanguage: Function;
    setAlertHandler: Function;

    switchDkMode: Function;
    switchLanguage: Function;
}

const Context: any = createContext(null);
export const Contexts = () => useContext<ContextsType>(Context);

export default function ContextProvider(props: any) {
    /*************
    Token section
    **************/

    const [Token, setToken] = useState(window.localStorage.user_token);
    // const [SToken, setSToken] = useState(window.localStorage.S_token);
    // const [SvToken, setSvToken] = useState(window.localStorage.Sv_token);

    /*************
    language section
    **************/

    const [userLang, setUserLang] = useState(window.localStorage.lang);

    const initialLanguage = () => {
        if (window.localStorage.lang) {
            return setUserLang(window.localStorage.lang);
        }

        window.localStorage.setItem("lang", "fr");
        return setUserLang(window.localStorage.lang);
    };

    const switchLanguage = (lang: string) => {
        // location.reload();
        window.localStorage.lang = lang;

        setUserLang(lang);
    };

    /*************
    darkMode section
    **************/

    const [darkMode, setdarkMode] = useState<boolean>(window.localStorage.dk_Mode ? JSON.parse(window.localStorage.dk_Mode) : false);

    const initialDkMode = () => {
        if (window.localStorage.dk_Mode) {
            return setdarkMode(JSON.parse(window.localStorage.dk_Mode));
        }

        window.localStorage.setItem("dk_Mode", "false");
        return setdarkMode(JSON.parse(window.localStorage.dk_Mode));
    };

    const switchDkMode = (state: string) => {
        window.localStorage.dk_Mode = state;
        setdarkMode(JSON.parse(state));
        return location.reload();
    };

    /*************
    organisation Section
    **************/

    const variables = {
        Token,
        userLang,
        darkMode,
    };
    const setters = {
        setToken,
        // setSvToken,
        // setSToken,
        initialLanguage,
        switchLanguage,
        initialDkMode,
        switchDkMode,
    };
    const value = { ...variables, ...setters };

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

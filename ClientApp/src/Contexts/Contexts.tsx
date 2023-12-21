import { useState, useContext, createContext } from "react";
import { alertType, langType } from "../MiddleWear/ClientInterface";

export interface ContextsType {
    darkMode: string;
    Token: string;
    // SToken: string;
    // SvToken: string;
    userLang: langType;
    initialDkMode: Function;
    initialLanguage: Function;
    setAlertHandler: Function;
    refresh: boolean;
    refreshApp: Function;
    switchDkMode: Function;
    switchLanguage: Function;
    setNewAlert: Function;
    alerts: alertType[];
    apiWait: boolean;
    setApiWait: Function;
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

    const [userLang, setUserLang] = useState<langType>(window.localStorage.lang);

    const initialLanguage = () => {
        if (window.localStorage.lang) {
            return setUserLang(window.localStorage.lang);
        }
        const lang = navigator.language.split("-")[0];

        window.localStorage.setItem("lang", lang);
        return setUserLang(window.localStorage.lang);
    };

    const switchLanguage = (lang: langType) => {
        // location.reload();
        window.localStorage.lang = lang;

        setUserLang(lang);
    };
    /*************
    refresh section
    **************/

    const [refresh, setRefresh] = useState<boolean>(true);

    const refreshApp = () => {
        setRefresh(!refresh);
    };

    /*************
    alertSection Section
    **************/

    const [alerts, setAlerts] = useState<Array<alertType>>([]);

    const setNewAlert = (alert: alertType) => {
        const tmp = [...alerts];
        tmp.push(alert);
        setAlerts(tmp);
        new Audio("/alertNotifSound.mp3").play();
        const time = setTimeout(() => {
            setAlerts((prevMessages) => prevMessages.slice(1));
            clearTimeout(time);
            setApiWait(false);
        }, 6000);
    };

    /*************
    api wait Section
    **************/

    const [apiWait, setApiWait] = useState<boolean>(false);

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
        refresh,
        alerts,
        apiWait,
    };
    const setters = {
        setToken,
        // setSvToken,
        // setSToken,
        initialLanguage,
        switchLanguage,
        initialDkMode,
        switchDkMode,
        refreshApp,
        setNewAlert,
        setApiWait,
    };
    const value = { ...variables, ...setters };

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

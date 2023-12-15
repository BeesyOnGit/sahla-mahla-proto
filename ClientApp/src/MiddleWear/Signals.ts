import { signal } from "@preact/signals-react";
import { alertType } from "./ClientInterface";

// export const alerts = signal<alertType[]>([]);

export const setNewAlert = (alert: alertType) => {
    // const { value: currAlerts } = alerts;
    // currAlerts.push(alert);
    // new Audio("/alertNotifSound.mp3").play();
    // const time = setTimeout(() => {
    //     currAlerts.shift();
    //     // setAlerts((prevMessages) => prevMessages.slice(1));
    //     clearTimeout(time);
    //     // setApiWait(false);
    // }, 5000);
};

// // // // // // // // //

export const refresh = signal<boolean>(true);

export const refreshPage = () => {
    refresh.value = !refresh.value;
};

// // // // // // // // //

export const Token = signal(window.localStorage.user_token);

export const setToken = (token: string) => {
    Token.value = token;
};

// // // // // // // // //

export const lang = signal<"ar" | "fr" | "en">(window.localStorage.lang);

export const initialLanguage = () => {
    if (window.localStorage.lang) {
        return (lang.value = window.localStorage.lang);
    }
    const browserlang = navigator.language.split("-")[0];

    window.localStorage.setItem("lang", browserlang);
    return (lang.value = window.localStorage.lang);
};

// // // // // // // // //

export const darkMode = signal<boolean>(window.localStorage.dk_Mode ? JSON.parse(window.localStorage.dk_Mode) : false);

export const initialDkMode = () => {
    if (window.localStorage.dk_Mode) {
        return (darkMode.value = JSON.parse(window.localStorage.dk_Mode));
    }

    window.localStorage.setItem("dk_Mode", "false");
    return (darkMode.value = JSON.parse(window.localStorage.dk_Mode));
};

export const switchDkMode = (state: string) => {
    window.localStorage.dk_Mode = state;
    darkMode.value = JSON.parse(state);
    return location.reload();
};

import { langType } from "../../MiddleWear/ClientInterface";

type logoutLangType = {
    [key in langType]: {
        logoutprogress: string;
        secondUnit: string;
        cancel: string;
    };
};

export const LogoutLang: logoutLangType = {
    fr: {
        logoutprogress: "déconnexion en cours ...",
        secondUnit: "secondes",
        cancel: "finalement je veux rester",
    },
    ar: {
        logoutprogress: "جارٍ تسجيل الخروج ...",
        secondUnit: "ثواني",
        cancel: "في النهاية أريد البقاء",
    },
    en: {
        logoutprogress: "logging out...",
        secondUnit: "seconds",
        cancel: "actually, I want to stay",
    },
};

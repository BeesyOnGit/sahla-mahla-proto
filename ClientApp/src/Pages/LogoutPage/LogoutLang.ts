import { langType } from "../../MiddleWear/ClientInterface";

type logoutLangType = {
    [key in langType]: {
        logoutprogress: string;
        cancel: string;
    };
};

export const LogoutLang: logoutLangType = {
    fr: {
        logoutprogress: "deconnexion en cours ...",
        cancel: "finalement je veux rester",
    },
};

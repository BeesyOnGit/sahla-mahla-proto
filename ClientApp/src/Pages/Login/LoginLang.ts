import { langType } from "../../MiddleWear/ClientInterface";

export type loginLangType = {
    [key in langType]: {
        titleFreelance: string;
        title: string;
        button: string;
        freelanceQuestion: string;
        notFreelanceQuestion: string;
        inputs: {
            id: string;
            pass: string;
        };
    };
};

export const LoginLang: loginLangType = {
    en: {
        titleFreelance: "login as a freelance",
        title: "login",
        button: "login",
        freelanceQuestion: "are you a freelance?",
        notFreelanceQuestion: "are you not a freelance?",
        inputs: {
            id: "email or phone number",
            pass: "password",
        },
    },
    ar: {
        titleFreelance: "تسجيل الدخول كمستقل",
        title: "تسجيل الدخول",
        button: "تسجيل الدخول",
        freelanceQuestion: "هل أنت مستقل؟",
        notFreelanceQuestion: "هل أنت لست مستقل؟",
        inputs: {
            id: "البريد الإلكتروني أو رقم الهاتف",
            pass: "كلمة المرور",
        },
    },
    fr: {
        titleFreelance: "connexion en tant que freelance",
        title: "connexion",
        button: "me connecter",
        freelanceQuestion: "êtes-vous un freelance ?",
        notFreelanceQuestion: "n'êtes-vous pas un freelance ?",
        inputs: {
            id: "email ou numéro de téléphone",
            pass: "mot de passe",
        },
    },
};

import { langType } from "../../MiddleWear/ClientInterface";

type mailValidationType = {
    [key in langType]: {
        checkYourMail: string;
        mailConfirmed: string;
        inValidation: string;
    };
};

export const MailValidationLang: mailValidationType = {
    fr: {
        checkYourMail: "verrifiez votre boite mail pour confirmer l'inscription",
        mailConfirmed: "email confirmé redirection vers l'application",
        inValidation: "email en cours de validation",
    },
    en: {
        checkYourMail: "Check your email to confirm the registration",
        mailConfirmed: "Email confirmed, redirecting to the application",
        inValidation: "Email validation in progress",
    },
    ar: {
        checkYourMail: "تحقق من بريدك الإلكتروني لتأكيد التسجيل",
        mailConfirmed: "تم تأكيد البريد الإلكتروني، جار التوجيه إلى التطبيق",
        inValidation: "جاري التحقق من صحة البريد الإلكتروني",
    },
};

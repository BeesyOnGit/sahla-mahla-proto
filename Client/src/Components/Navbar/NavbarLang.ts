export type navBarLangType = {
    [key in "fr" | "ar" | "en"]: {
        proOffer: string;
        language: string;
        freelanceOffer: string;
        about: string;
        login: string;
    };
};
export const navbarLang: navBarLangType = {
    fr: {
        proOffer: "sahla PRO",
        language: "français",
        freelanceOffer: "devenir freelance",
        about: "à propos",
        login: "se connecter",
    },
    en: {
        proOffer: "SAHLA PRO",
        language: "english",
        freelanceOffer: "become a freelance",
        about: "about",
        login: "log in",
    },
    ar: {
        proOffer: "عرض PRO",
        language: "العربية",
        freelanceOffer: "أصبح عاملاً حرًّا",
        about: "حول",
        login: "تسجيل الدخول",
    },
};

export type footerLangType = {
    [key in "fr" | "ar" | "en"]: {
        becomFreelance: string;
        clientPage: string;
        resourcesPage: string;
        sahlaBusiness: string;
        pc: string;
        gua: string;
        copywrite: string;
    };
};

export const FooterLang: footerLangType = {
    fr: {
        becomFreelance: "devenir freelance",
        clientPage: "page client",
        resourcesPage: "voir les resources",
        sahlaBusiness: "sahla & business",
        pc: "politique de confidentialité",
        gua: "conditions générales d'utilisation",
        copywrite: "Sahla & Mahla tous droits réservés",
    },
    en: {
        becomFreelance: "become a freelancer",
        clientPage: "client page",
        resourcesPage: "view resources",
        sahlaBusiness: "sahla & business",
        pc: "privacy policy",
        gua: "general terms and conditions",
        copywrite: "Sahla & Mahla all rights reserved",
    },
    ar: {
        becomFreelance: "كن فريلانسر",
        clientPage: "صفحة العميل",
        resourcesPage: "عرض الموارد",
        sahlaBusiness: "صهلة والأعمال",
        pc: "سياسة الخصوصية",
        gua: "الشروط العامة للاستخدام",
        copywrite: "سهلة ومهلة جميع الحقوق محفوظة",
    },
};

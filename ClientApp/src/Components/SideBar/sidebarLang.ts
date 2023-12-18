export type sideBarLangType = {
    [key in "fr" | "ar" | "en"]: {
        NavElems: {
            home: string;
            orders: string;
            findWork: string;
            resources: string;
            library: string;
            commManagement: string;
            profile: string;
            logout: string;
            myOrders: string;
            delivery: string;
            support: string;
        };
    };
};

export const sideBarLang: sideBarLangType = {
    fr: {
        NavElems: {
            home: "accueil",
            orders: "commandes",
            findWork: "trouver un projet",
            resources: "ressources",
            library: "bibliothèque",
            commManagement: "gestion commerciale",
            profile: "profil",
            logout: "déconnexion",
            myOrders: "mes commandes",
            delivery: "livraison",
            support: "support",
        },
    },
    en: {
        NavElems: {
            home: "home",
            orders: "orders",
            findWork: "find a project",
            resources: "resources",
            library: "library",
            commManagement: "commercial management",
            profile: "profile",
            logout: "logout",
            myOrders: "my orders",
            delivery: "delivery",
            support: "support",
        },
    },
    ar: {
        NavElems: {
            home: "الرئيسية",
            orders: "الطلبات",
            findWork: "البحث عن مشروع",
            resources: "الموارد",
            library: "المكتبة",
            commManagement: "إدارة التجارية",
            profile: "الملف الشخصي",
            logout: "تسجيل الخروج",
            myOrders: "طلباتي",
            delivery: "التوصيل",
            support: "الدعم",
        },
    },
};

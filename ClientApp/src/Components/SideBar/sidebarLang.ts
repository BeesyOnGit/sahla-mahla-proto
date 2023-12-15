export type sideBarLangType = {
    [key in "fr" | "ar"]: {};
};

export const sideBarLang: any = {
    fr: {
        NavElems: {
            home: "accueil",
            orders: "commandes",
            inventory: "gestion de stock",
            stats: "statistiques",
            storeManage: "gestion du store",
            profile: "profile",
            weezButton: "retour vers WEEZ",
        },
    },
    ar: {
        NavElems: {
            home: "الصفحة الرئيسية",
            orders: "الطلبات",
            inventory: "إدارة المخزون",
            stats: "الإحصائيات",
            storeManage: "إدارة المتجر",
            profile: "صفحتي الشخصية",
            weezButton: "WEEZ العودة إلى",
        },
    },
};

export type SideNavLangType = {
    fr: langType;
    ar: langType;
};
type langType = {
    orders: string;
    inventory: string;
    employes: string;
    finances: string;
    products: string;
    params: string;
    hideButton: string;
    switchLang: string;
    showButton: string;
    lougout: string;
};
export const sideNavLang: SideNavLangType = {
    fr: {
        orders: "commandes",
        inventory: "GST Stock",
        employes: "employés",
        finances: "finances",
        products: "produits",
        params: "paramètres",
        hideButton: "cacher",
        showButton: "afficher",
        lougout: "déconnexion",
        switchLang: "langue",
    },
    ar: {
        orders: "الطلبات",
        inventory: "إدارة المخزون",
        employes: "الموظفين",
        finances: "تسيير مالي",
        products: "المنتجات",
        params: "الإعدادات",
        hideButton: "إخفاء",
        showButton: "عرض",
        lougout: "الانفصال",
        switchLang: "تغيير اللغة",
    },
};

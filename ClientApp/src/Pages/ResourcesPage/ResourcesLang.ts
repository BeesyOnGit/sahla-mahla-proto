import { langType } from "../../MiddleWear/ClientInterface";

type resourcesLangType = {
    [key in langType]: {
        myResources: string;
        sellingResources: string;
        addResourceNav: string;
        noResourcesOwned: string;
        noResourcesToSell: string;
        addresTitle: string;
        addResInputs: {
            title: string;
            description: string;
            price: string;
            discount: string;
            categories: string;
            resource: string;
            priceTitle: string;
            addResButton: string;
            resourcetitle: string;
        };
    };
};

export const resourcesLang: resourcesLangType = {
    fr: {
        myResources: "mes ressources",
        sellingResources: "ressources à vendre",
        noResourcesOwned: "aucune ressource achetée pour l'instant",
        noResourcesToSell: "aucune ressource à vendre pour l'instant",
        addresTitle: "ajouter une resource a ventre",
        addResourceNav: "ajouter une resource",
        addResInputs: {
            title: "titre",
            description: "description",
            price: "prix",
            discount: "remise (promotion)",
            categories: "catégories de la resource",
            resource: "téléharger la resource",
            priceTitle: "prix de la resource",
            addResButton: "mettre en vente",
            resourcetitle: "téléchargement de la resource",
        },
    },
    en: {
        myResources: "my resources",
        sellingResources: "resources for sale",
        noResourcesOwned: "no resources purchased yet",
        noResourcesToSell: "no resources to sell at the moment",
        addresTitle: "add a resource for sale",
        addResourceNav: "add a resource",
        addResInputs: {
            title: "title",
            description: "description",
            price: "price",
            discount: "discount (promotion)",
            categories: "resource categories",
            resource: "download the resource",
            priceTitle: "resource price",
            addResButton: "put up for sale",
            resourcetitle: "resource download",
        },
    },
    ar: {
        myResources: "مواردي",
        sellingResources: "الموارد المعروضة للبيع",
        noResourcesOwned: "لا يوجد موارد تم شراؤها حتى الآن",
        noResourcesToSell: "لا توجد موارد للبيع في الوقت الحالي",
        addresTitle: "إضافة مورد للبيع",
        addResourceNav: "إضافة مورد",
        addResInputs: {
            title: "العنوان",
            description: "الوصف",
            price: "السعر",
            discount: "الخصم (الترقية)",
            categories: "فئات المورد",
            resource: "تحميل المورد",
            priceTitle: "سعر المورد",
            addResButton: "عرض للبيع",
            resourcetitle: "تحميل المورد",
        },
    },
};

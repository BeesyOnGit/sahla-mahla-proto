type resourcesLangType = {
    [key in "fr" | "ar" | "en"]: {
        myResources: string;
        sellingResources: string;
        noResourcesOwned: string;
        noResourcesToSell: string;
    };
};

export const resourcesLang: resourcesLangType = {
    fr: {
        myResources: "mes ressources",
        sellingResources: "ressources à vendre",
        noResourcesOwned: "aucune ressource achetée pour l'instant",
        noResourcesToSell: "aucune ressource à vendre pour l'instant",
    },
    en: {
        myResources: "my resources",
        sellingResources: "selling resources",
        noResourcesOwned: "no resources owned yet",
        noResourcesToSell: "no resources to sell at the moment",
    },
    ar: {
        myResources: "مواردي",
        sellingResources: "الموارد المعروضة للبيع",
        noResourcesOwned: "لا يوجد موارد مملوكة حاليًا",
        noResourcesToSell: "لا توجد موارد للبيع حاليًا",
    },
};

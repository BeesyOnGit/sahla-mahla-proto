type resourcesLangType = {
    [key in "fr" | "ar" | "en"]: {
        myResouresources: string;
        sellingResources: string;
        noResourcesOwned: string;
        noResourcesToSell: string;
    };
};

export const resourcesLang: resourcesLangType = {
    fr: {
        myResouresources: "mes resources",
        sellingResources: "resources a vendre",
        noResourcesOwned: "aucune resource achtée pour l'instant",
        noResourcesToSell: "aucune resrouce a vendre pour l'instant",
    },
};

type HomeLangType = {
    [key in "ar" | "fr" | "en"]: {
        intro: string;
        keywordFreelance: string;
        phrase: string;
        keywordHighlight: string;
        ending: string;
        inputPlaceHolder: string;
        partnership: string;
        services: {
            servicesTitle: string;
            ai: string;
            brandConception: string;
            website: string;
            voiceOver: string;
            video: string;
        };
        multimedia: {
            multimediaTitle: string;
            socialnetwork: string;
            seo: string;
            illustration: string;
            translate: string;
            fincompta: string;
        };
    };
};

export const HomeLang: HomeLangType = {
    fr: {
        intro: "trouvez des services",
        keywordFreelance: "freelance",
        phrase: "instantanément &",
        keywordHighlight: "une bibliothèque",
        ending: "riche.",
        inputPlaceHolder: "conception flyer, logo, affiche publicitaire...",
        partnership: "nos partenaires",
        services: {
            servicesTitle: "services freealance les plus demandés",
            ai: "intéligence artificielle",
            brandConception: "conception de marque",
            website: "conceprtion de sites web",
            voiceOver: "voix off",
            video: "videos explicatives",
        },
        multimedia: {
            multimediaTitle: "trouvez des resources multimedia dans toutes les catégories",
            socialnetwork: "reseaux sociaux",
            seo: "SEO",
            illustration: "illustrations",
            translate: "traduction",
            fincompta: "finance & comptabilité",
        },
    },
    en: {
        intro: "find services",
        keywordFreelance: "freelance",
        phrase: "instantly &",
        keywordHighlight: "a library",
        ending: "rich.",
        inputPlaceHolder: "flyer design, logo, advertising poster...",
    },
    ar: {
        intro: "ابحث عن خدمات",
        keywordFreelance: "لعمال حرّين",
        phrase: "فورًا و",
        keywordHighlight: "مكتبة",
        ending: "غنية.",
        inputPlaceHolder: "تصميم نشرة، شعار، ملصق إعلاني...",
    },
};

type HomeLangType = {
    [key in "ar" | "fr" | "en"]: {
        intro: string;
        keywordFreelance: string;
        phrase: string;
        keywordHighlight: string;
        ending: string;
        inputPlaceHolder: string;
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

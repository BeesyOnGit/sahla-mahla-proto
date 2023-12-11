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
        mission: {
            missionTitle: string;
            mission1: {
                title: string;
                description: string;
            };
            mission2: {
                title: string;
                description: string;
            };
            mission3: {
                title: string;
                description: string;
            };
            mission4: {
                title: string;
                description: string;
            };
        };

        business: {
            businessSahla: string;
            businessTitle: string;
            businessDesc: string;
            forbuisiness1: string;
            forbuisiness2: string;
            forbuisiness3: string;
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
            ai: "intelligence artificielle",
            brandConception: "conception de marque",
            website: "conception de sites web",
            voiceOver: "voix off",
            video: "vidéos explicatives",
        },
        multimedia: {
            multimediaTitle: "trouvez des ressources multimédia dans toutes les catégories",
            socialnetwork: "réseaux sociaux",
            seo: "seo",
            illustration: "illustrations",
            translate: "traduction",
            fincompta: "finance & comptabilité",
        },
        mission: {
            missionTitle: "la mission de sahla & mahla",
            mission1: {
                title: "tenir compte de votre budget",
                description:
                    "trouvez des services de haute qualité à tous les prix. pas de tarifs horaires, mais une tarification en fonction des projets.",
            },
            mission2: {
                title: "un travail de qualité réalisé rapidement",
                description: "confiez votre projet à un freelance talentueux en quelques minutes et obtenez des résultats durables.",
            },
            mission3: {
                title: "payer une fois satisfait(e)",
                description:
                    "les devis sont établis à l’avance, ce qui évite les surprises. le paiement est débloqué uniquement lorsque vous l’approuvez.",
            },
            mission4: {
                title: "une assistance 24h/24 et 7j/7",
                description: "notre équipe d’assistance est disponible 24 heures sur 24 pour vous aider à tout moment et en tout lieu.",
            },
        },
        business: {
            businessSahla: "sahla &",
            businessTitle: "business",
            businessDesc: "des solutions avancées et des experts professionnels pour entreprises",
            forbuisiness1: "bénéficiez des services des meilleurs freelance et d'outils professionnels pour vos projets",
            forbuisiness2: "créez votre place de marché d'experts certifiés",
            forbuisiness3: "gérez vos freelances et recrutez de nouveaux experts grâce à une solution saas de bout en bout",
        },
    },
    en: {
        intro: "find services",
        keywordFreelance: "freelance",
        phrase: "instantly &",
        keywordHighlight: "a library",
        ending: "rich.",
        inputPlaceHolder: "flyer design, logo, advertising poster...",
        partnership: "our partners",
        services: {
            servicesTitle: "most requested freelance services",
            ai: "artificial intelligence",
            brandConception: "brand conception",
            website: "website conception",
            voiceOver: "voice over",
            video: "explanatory videos",
        },
        multimedia: {
            multimediaTitle: "find multimedia resources in all categories",
            socialnetwork: "social networks",
            seo: "SEO",
            illustration: "illustrations",
            translate: "translation",
            fincompta: "finance & accounting",
        },
        mission: {
            missionTitle: "The Mission of Sahla & Mahla",
            mission1: {
                title: "TAKE YOUR BUDGET INTO ACCOUNT",
                description: "Find high-quality services at all price points. No hourly rates, but project-based pricing.",
            },
            mission2: {
                title: "QUALITY WORK DONE QUICKLY",
                description: "Entrust your project to a talented freelancer within minutes and get lasting results.",
            },
            mission3: {
                title: "PAY ONCE SATISFIED",
                description: "Quotes are provided in advance, avoiding surprises. Payment is released only when you approve.",
            },
            mission4: {
                title: "24/7 SUPPORT",
                description: "Our support team is available 24/7 to assist you anytime, anywhere.",
            },
        },
        business: {
            businessSahla: "Sahla &",
            businessTitle: "business",
            businessDesc: "Advanced solutions and professional experts for businesses",
            forbuisiness1: "Benefit from top freelance services and professional tools for your projects",
            forbuisiness2: "Create your marketplace of certified experts",
            forbuisiness3: "Manage your freelancers and recruit new experts through an end-to-end SaaS solution",
        },
    },
    ar: {
        intro: "ابحث عن خدمات",
        keywordFreelance: "لعمال حرّين",
        phrase: "فورًا و",
        keywordHighlight: "مكتبة",
        ending: "غنية.",
        inputPlaceHolder: "تصميم نشرة، شعار، ملصق إعلاني...",
        partnership: "شركاؤنا",
        services: {
            servicesTitle: "الخدمات الحرة الأكثر طلبًا",
            ai: "الذكاء الاصطناعي",
            brandConception: "تصميم العلامة التجارية",
            website: "تصميم مواقع الويب",
            voiceOver: "التعليق الصوتي",
            video: "مقاطع الفيديو التوضيحية",
        },
        multimedia: {
            multimediaTitle: "العثور على موارد الوسائط المتعددة في جميع الفئات",
            socialnetwork: "شبكات اجتماعية",
            seo: "تحسين محركات البحث",
            illustration: "الرسوم التوضيحية",
            translate: "الترجمة",
            fincompta: "المالية والمحاسبة",
        },
        mission: {
            missionTitle: "مهمة شهلة ومهلة",
            mission1: {
                title: "أخذ ميزانيتك في الاعتبار",
                description: "العثور على خدمات عالية الجودة بجميع الأسعار. لا توجد أسعار ساعية، ولكن التسعير حسب المشاريع.",
            },
            mission2: {
                title: "عمل ذو جودة عالية بسرعة",
                description: "ثق مشروعك لفريلانسر موهوب في دقائق واحصل على نتائج دائمة.",
            },
            mission3: {
                title: "الدفع بعد الرضا",
                description: "تقدم العروض مسبقًا، مما يجنبك المفاجآت. يتم الدفع فقط عند الموافقة.",
            },
            mission4: {
                title: "الدعم على مدار الساعة",
                description: "فريق الدعم لدينا متاح على مدار الساعة لمساعدتك في أي وقت وفي أي مكان.",
            },
        },
        business: {
            businessSahla: "صهلة و",
            businessTitle: "الأعمال التجارية",
            businessDesc: "حلول متقدمة وخبراء محترفون للشركات",
            forbuisiness1: "استفد من أفضل خدمات الفريلانس والأدوات المهنية لمشاريعك",
            forbuisiness2: "أنشئ سوقك الخاص للخبراء المعتمدين",
            forbuisiness3: "إدارة الفريلانسرز الخاصين بك واستقطاب خبراء جدد من خلال حل SaaS من البداية إلى النهاية",
        },
    },
};

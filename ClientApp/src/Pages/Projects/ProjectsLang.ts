import { langType } from "../../MiddleWear/ClientInterface";

type projectsType = {
    [key in langType]: {
        noProjects: string;
        createOffer: string;
        allOffers: string;
        inputs: {
            projectInfosTitle: string;
            projectBudgetTimeTitle: string;
            offerTitle: string;
            offerDesc: string;
            offerAmount: string;
            offerDeadline: string;
            offerTargetFields: string;
            subButton: string;
            submitableUntil: string;
        };

        card: {
            amount: string;
            proposedDeadline: string;
            offerStatus: string;
            submitableUntil: string;
            submitOffer: string;
            seeMoreDetails: string;
            fieldsWanted: string;
        };
    };
};

export const ProjectLang: projectsType = {
    fr: {
        noProjects: "pas de projets pour l'instant",
        createOffer: "créer une nouvelle offre",
        allOffers: "toutes les offres",
        inputs: {
            projectBudgetTimeTitle: "budget et délais de l'offre",
            projectInfosTitle: "informations de l'offre",
            offerTitle: "titre",
            offerDesc: "détails de l'offre",
            offerAmount: "mon budget",
            offerTargetFields: "domaine(s) touché(s)",
            offerDeadline: "deadline",
            subButton: "soumettre offre",
            submitableUntil: "soumissions finies dans",
        },
        card: {
            amount: "budget",
            proposedDeadline: "deadline proposée",
            offerStatus: "état de l'offre",
            submitableUntil: "expire dans",
            submitOffer: "participer",
            seeMoreDetails: "voir plus de détails",
            fieldsWanted: "domaines visés",
        },
    },
    en: {
        noProjects: "no projects at the moment",
        createOffer: "create a new offer",
        allOffers: "all offers",
        inputs: {
            projectBudgetTimeTitle: "budget and offer deadlines",
            projectInfosTitle: "offer information",
            offerTitle: "title",
            offerDesc: "offer details",
            offerAmount: "my budget",
            offerTargetFields: "affected field(s)",
            offerDeadline: "deadline",
            subButton: "submit offer",
            submitableUntil: "submissions finish in",
        },
        card: {
            amount: "budget",
            proposedDeadline: "proposed deadline",
            offerStatus: "offer status",
            submitableUntil: "expires in",
            submitOffer: "participate",
            seeMoreDetails: "see more details",
            fieldsWanted: "targeted fields",
        },
    },
    ar: {
        noProjects: "لا توجد مشاريع في الوقت الحالي",
        createOffer: "إنشاء عرض جديد",
        allOffers: "جميع العروض",
        inputs: {
            projectBudgetTimeTitle: "الميزانية ومواعيد العرض",
            projectInfosTitle: "معلومات العرض",
            offerTitle: "عنوان",
            offerDesc: "تفاصيل العرض",
            offerAmount: "ميزانيتي",
            offerTargetFields: "المجالات المستهدفة",
            offerDeadline: "الموعد النهائي",
            subButton: "تقديم العرض",
            submitableUntil: "تنتهي التقديمات في",
        },
        card: {
            amount: "الميزانية",
            proposedDeadline: "الموعد النهائي المقترح",
            offerStatus: "حالة العرض",
            submitableUntil: "تنتهي في",
            submitOffer: "المشاركة",
            seeMoreDetails: "رؤية المزيد من التفاصيل",
            fieldsWanted: "المجالات المستهدفة",
        },
    },
};

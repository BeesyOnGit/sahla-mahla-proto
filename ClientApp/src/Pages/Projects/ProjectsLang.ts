import { langType } from "../../MiddleWear/ClientInterface";

type projectsType = {
    [key in langType]: {
        noProjects: string;
        createOffer: string;
        allOffers: string;
        offerRecap: string;
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
            proposedPrice: string;
            proposedDeadline: string;
            anyQuestion: string;
            submitOffer: string;
        };

        card: {
            amount: string;
            proposedDeadline: string;
            offerStatus: string;
            submitableUntil: string;
            submitOffer: string;
            seeMoreDetails: string;
            fieldsWanted: string;
            expired: string;
            title: string;
            buyer: string;
            projectStat: string;
        };
    };
};

export const ProjectLang: projectsType = {
    fr: {
        noProjects: "pas de projets pour l'instant",
        createOffer: "créer une nouvelle offre",
        allOffers: "toutes les offres",
        offerRecap: "récapitulatif de l'offre",
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
            proposedPrice: "prix proposé",
            proposedDeadline: "délai proposé",
            anyQuestion: "des question ?",
            submitOffer: "soumettre une offre",
        },
        card: {
            amount: "budget",
            proposedDeadline: "deadline",
            offerStatus: "état de l'offre",
            submitableUntil: "expire dans",
            submitOffer: "participer",
            seeMoreDetails: "voir plus de détails",
            fieldsWanted: "domaines visés",
            expired: "expiré",
            title: "titre",
            buyer: "propriétaire",
            projectStat: "etat du projet",
        },
    },
    en: {
        noProjects: "no projects at the moment",
        createOffer: "create a new offer",
        allOffers: "all offers",
        offerRecap: "offer recap",
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
            proposedPrice: "proposed price",
            proposedDeadline: "proposed deadline",
            anyQuestion: "any questions ?",
            submitOffer: "submit an offer",
        },
        card: {
            amount: "budget",
            proposedDeadline: "deadline",
            offerStatus: "offer status",
            submitableUntil: "expires in",
            submitOffer: "participate",
            seeMoreDetails: "see more details",
            fieldsWanted: "targeted fields",
            expired: "expired",
            title: "title",
            buyer: "buyer",
            projectStat: "project status",
        },
    },
    ar: {
        noProjects: "لا توجد مشاريع في الوقت الحالي",
        createOffer: "إنشاء عرض جديد",
        allOffers: "جميع العروض",
        offerRecap: "ملخص العرض",
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
            proposedPrice: "السعر المقترح",
            proposedDeadline: "الموعد المقترح",
            anyQuestion: "هل هناك أي أسئلة ؟",
            submitOffer: "تقديم عرض",
        },
        card: {
            amount: "الميزانية",
            proposedDeadline: "الموعد النهائي",
            offerStatus: "حالة العرض",
            submitableUntil: "تنتهي في",
            submitOffer: "المشاركة",
            seeMoreDetails: "رؤية المزيد من التفاصيل",
            fieldsWanted: "المجالات المستهدفة",
            expired: "منتهي الصلاحية",
            title: "عنوان",
            buyer: "المشتري",
            projectStat: "حالة المشروع",
        },
    },
};

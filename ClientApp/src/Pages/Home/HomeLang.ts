import { langType } from "../../MiddleWear/ClientInterface";

type homeLangType = {
    [key in langType]: {
        subscriptionTitle: string;
        testVer: string;
        subButtoncontent: string;
        notifs: string;
        allNotifs: string;
        unreadNotifs: string;
        greatings: string;
        thanks: string;
        chart1tit: string;
        chart2tit: string;
        chart3tit: string;
        chart4tit: string;
        chart5tit: string;
        revenue: string;
        projectTitle: string;
        table: {
            created: string;
            projectTitle: string;
            client: string;
            status: string;
            amount: string;
            payment: string;
            noContent: string;
        };
    };
};

export const HomeLang: homeLangType = {
    fr: {
        subscriptionTitle: "abonnement en cours",
        testVer: "version d'essai",
        subButtoncontent: "en savoir plus",
        notifs: "notifications",
        allNotifs: "afficher tout",
        unreadNotifs: "non lu",
        greatings: "bienvenue sur sahla & mahla !",
        thanks: "nous vous remercions de vous être inscrit sur sahla & mahla, voici un lien vers une vidéo de formation complète :",
        chart1tit: "chiffre d'affaires",
        chart2tit: "bénéfice",
        chart3tit: "achats/frais",
        chart4tit: "devis envoyé(s) (0 dzd)",
        chart5tit: "devis signé(s) (0 dzd)",
        revenue: "montant (DZD)",
        projectTitle: "statistiques projets",
        table: {
            created: "date de création",
            client: "client/commanditaire",
            projectTitle: "projet",
            status: "statut",
            amount: "montant",
            payment: "statut de paiement",
            noContent: "pas de stats pour l'instant",
        },
    },
    en: {
        subscriptionTitle: "subscription in progress",
        testVer: "trial version",
        subButtoncontent: "learn more",
        notifs: "notifications",
        allNotifs: "show all",
        unreadNotifs: "unread",
        greatings: "welcome to sahla & mahla!",
        thanks: "thank you for signing up for sahla & mahla, here's a link to a complete training video:",
        chart1tit: "revenue",
        chart2tit: "profit",
        chart3tit: "purchases/expenses",
        chart4tit: "quotes sent (0 dzd)",
        chart5tit: "quotes signed (0 dzd)",
        revenue: "amount (DZD)",
        projectTitle: "project statistics",
        table: {
            created: "creation date",
            client: "client/sponsor",
            projectTitle: "project",
            status: "status",
            amount: "amount",
            payment: "payment status",
            noContent: "no stats at the moment",
        },
    },
    ar: {
        subscriptionTitle: "الاشتراك قائم",
        testVer: "نسخة تجريبية",
        subButtoncontent: "معرفة المزيد",
        notifs: "إشعارات",
        allNotifs: "عرض الكل",
        unreadNotifs: "غير مقروءة",
        greatings: "مرحبًا بكم في سهلا ومهلا!",
        thanks: "نشكركم على التسجيل في سهلا ومهلا، إليكم رابط لفيديو تدريب كامل:",
        chart1tit: "إيرادات",
        chart2tit: "ربح",
        chart3tit: "مشتريات/مصاريف",
        chart4tit: "عروض الأسعار المرسلة (0 دزد)",
        chart5tit: "عروض الأسعار الموقعة (0 دزد)",
        revenue: "المبلغ (DZD)",
        projectTitle: "إحصائيات المشاريع",
        table: {
            created: "تاريخ الإنشاء",
            client: "العميل/المكلف",
            projectTitle: "المشروع",
            status: "الحالة",
            amount: "المبلغ",
            payment: "حالة الدفع",
            noContent: "لا توجد إحصائيات في الوقت الحالي",
        },
    },
};

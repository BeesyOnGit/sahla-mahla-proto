import { langType } from "../../MiddleWear/ClientInterface";

type orderLangType = {
    [key in langType]: {
        myOrders: string;
        involvedIn: string;
        recap: string;
        emptyOrderStr: string;
        emptyInvolvStr: string;
        emptyRecapStr: string;
        buttDetail: string;
        deleteResourceTitle: string;
        ordDetail: {
            finalDeadline: string;
            noDeadline: string;
            noContractorYet: string;
            noSubmitterYet: string;
            projectparts: string;
            submitterListe: string;
            choseContractorButton: string;
            projectBuyer: string;
            projectContractor: string;
            submitWork: string;
            tmpLink: string;
            finalLink: string;
            submitLink: string;
            confirmButt: string;
            cancelBut: string;
            approveBut: string;
            download: string;
            submittedWork: string;
            cancelOrderBut: string;
            confirmChoice: string;
            confirmRemove: string;
            confirmCancel: string;
        };
    };
};

export const OrdersLang: orderLangType = {
    fr: {
        myOrders: "mes commandes en cours",
        involvedIn: "mes devis",
        recap: "récapitulatif",
        emptyOrderStr: "pas de commandes pour l'instant",
        emptyInvolvStr: "pas de devis pour l'instant",
        emptyRecapStr: "pas de vue générale pour l'instant",
        buttDetail: "détails de l'offre",
        deleteResourceTitle: "supprimer cette ressource",

        ordDetail: {
            finalDeadline: "deadline finale",
            noDeadline: "pas encore de deadline finale",
            noContractorYet: "pas encore de freelance",
            noSubmitterYet: "pas encore de propositions",
            projectparts: "parties du projet",
            submitterListe: "liste des propositions",
            choseContractorButton: "choisir freelance",
            projectBuyer: "acheteur",
            projectContractor: "réalisateur",
            submitWork: "soumission du travail",
            tmpLink: "lien temporaire",
            finalLink: "lien finale",
            submitLink: "soumettre lien(s)",
            confirmButt: "confirmer",
            approveBut: "approuver et clore le projet",
            cancelOrderBut: "annuler le projet",
            cancelBut: "annuler",
            confirmChoice: "choisir le freelance",
            confirmCancel: "confirmer l'annulation",
            confirmRemove: "confirmer la supression",
            download: "télécharger",
            submittedWork: "travail réalisé",
        },
    },
    en: {
        myOrders: "my ongoing orders",
        involvedIn: "my involved",
        recap: "summary",
        emptyOrderStr: "no orders at the moment",
        emptyInvolvStr: "no involved items at the moment",
        emptyRecapStr: "no summary at the moment",
        buttDetail: "offer details",
        deleteResourceTitle: "delete this resource",

        ordDetail: {
            finalDeadline: "final deadline",
            noDeadline: "no final deadline yet",
            noContractorYet: "no freelancer yet",
            noSubmitterYet: "no proposals yet",
            projectparts: "project parts",
            submitterListe: "proposals list",
            choseContractorButton: "choose freelancer",
            projectBuyer: "buyer",
            projectContractor: "contractor",
            submitWork: "submit work",
            tmpLink: "temporary link",
            finalLink: "final link",
            submitLink: "submit link(s)",
            confirmButt: "confirm",
            approveBut: "approve and close project",
            cancelOrderBut: "cancel project",
            cancelBut: "cancel",
            confirmChoice: "confirm freelancer",
            confirmCancel: "confirm cancellation",
            confirmRemove: "confirm removal",
            download: "download",
            submittedWork: "submitted work",
        },
    },
    ar: {
        myOrders: "طلباتي الجارية",
        involvedIn: "المتورط فيها",
        recap: "ملخص",
        emptyOrderStr: "لا توجد طلبات حالياً",
        emptyInvolvStr: "لا يوجد عناصر متورطة حالياً",
        emptyRecapStr: "لا يوجد ملخص حالياً",
        buttDetail: "تفاصيل العرض",
        deleteResourceTitle: "حذف هذا المورد",
        ordDetail: {
            finalDeadline: "الموعد النهائي",
            noDeadline: "لا يوجد موعد نهائي بعد",
            noContractorYet: "لا يوجد مستقل حتى الآن",
            noSubmitterYet: "لا يوجد اقتراحات بعد",
            projectparts: "أجزاء المشروع",
            submitterListe: "قائمة الاقتراحات",
            choseContractorButton: "اختيار مستقل",
            projectBuyer: "المشتري",
            projectContractor: "المنفذ",
            submitWork: "تقديم العمل",
            tmpLink: "رابط مؤقت",
            finalLink: "الرابط النهائي",
            submitLink: "تقديم الروابط",
            confirmButt: "تأكيد",
            approveBut: "الموافقة وإغلاق المشروع",
            cancelOrderBut: "إلغاء المشروع",
            cancelBut: "إلغاء",
            confirmChoice: "تأكيد المستقل",
            confirmCancel: "تأكيد الإلغاء",
            confirmRemove: "تأكيد الإزالة",
            download: "تحميل",
            submittedWork: "العمل المقدم",
        },
    },
};

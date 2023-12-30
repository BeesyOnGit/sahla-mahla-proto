import { langType } from "../../MiddleWear/ClientInterface";

type libraryLangType = {
    [key in langType]: {
        title: string;
        myBookmark: string;
        returnToLib: string;
        search: string;
        noResources: string;
        noFavorit: string;
        noLiked: string;
        resourceCard: {
            donwload: string;
            likes: string;
            bookMark: string;
            bought: string;
            timesSold: string;
            buyButton: string;
            deleteBut: string;
        };
        categories: {
            [key in number]: string;
        };
    };
};

export const LibraryLang: libraryLangType = {
    fr: {
        title: "bibliothèque",
        myBookmark: "mes favoris",
        returnToLib: "retour à la bibliothèque",
        search: "rechercher (Ex : nature, montagne, bureau...)",
        noResources: "aucune ressource pour cette recherche",
        noLiked: "aucun j'aime pour l'instant",
        noFavorit: "aucun favori pour l'instant",
        resourceCard: {
            donwload: "télécherger",
            likes: "aimé",
            bookMark: "favoris",
            bought: "acheté",
            timesSold: "fois",
            buyButton: "acheter",
            deleteBut: "supprimer",
        },
        categories: {
            "0": "catégories",
            "1": "vidéo",
            "2": "photo",
            "3": "design",
            "4": "logo",
            "5": "icône",
            "6": "modèle 3D",
            "7": "pdf",
            "8": "autre",
        },
    },
    en: {
        title: "library",
        myBookmark: "my bookmarks",
        returnToLib: "return to library",
        search: "search (e.g. nature, mountain, office...)",
        noResources: "no resource(s) found for this search",
        noLiked: "no likes at the moment",
        noFavorit: "no favorites at the moment",
        resourceCard: {
            donwload: "download",
            likes: "liked",
            bookMark: "bookmark",
            bought: "bought",
            timesSold: "times",
            buyButton: "buy",
            deleteBut: "delete",
        },
        categories: {
            "0": "categories",
            "1": "video",
            "2": "photo",
            "3": "design",
            "4": "logo",
            "5": "icon",
            "6": "3D model",
            "7": "pdf",
            "8": "other",
        },
    },
    ar: {
        title: "المكتبة",
        myBookmark: "إشاراتي",
        returnToLib: "العودة إلى المكتبة",
        search: "البحث (مثال: طبيعة، جبل، مكتب...)",
        noResources: "لا توجد موارد لهذا البحث",
        noLiked: "لا توجد إعجابات في الوقت الحالي",
        noFavorit: "لا توجد مفضلات في الوقت الحالي",
        resourceCard: {
            donwload: "تحميل",
            likes: "إعجاب",
            bookMark: "إشارة مرجعية",
            bought: "تم الشراء",
            timesSold: "مرات",
            buyButton: "شراء",
            deleteBut: "حذف",
        },
        categories: {
            "0": "التصنيفات",
            "1": "فيديو",
            "2": "صورة",
            "3": "تصميم",
            "4": "شعار",
            "5": "أيقونة",
            "6": "نموذج ثلاثي الأبعاد",
            "7": "PDF",
            "8": "آخر",
        },
    },
};

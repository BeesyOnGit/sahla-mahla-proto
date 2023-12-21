import { langType } from "../../MiddleWear/ClientInterface";

type profileLangType = {
    [key in langType]: {
        userInfosTitle: string;
        billingInfosTitle: string;
        adressInfosTitle: string;
        noChanges: string;
        inputs: {
            firstName: string;
            lastName: string;
            profilePic: string;
            email: string;
            emailConfirmation: string;
            phoneConfirmation: string;
            phone: string;
            dob: string;
            account: string;
            accountEndWith: string;
            notation: string;
            wilaya: string;
            commune: string;
            street: string;
            createdAt: string;
            editeddAt: string;
            passWord: string;
            noWilaya: string;
            subButton: string;
        };
    };
};

export const ProfileLang: profileLangType = {
    fr: {
        userInfosTitle: "informations personnelles",
        billingInfosTitle: "facturation",
        adressInfosTitle: "adresse",
        noChanges: "pas de changement a faire",
        inputs: {
            firstName: "prénom",
            lastName: "nom de famille",
            profilePic: "photo de profil",
            email: "e-mail",
            emailConfirmation: "confirmation de l'e-mail",
            phoneConfirmation: "confirmation du téléphone",
            phone: "numero de téléphone",
            dob: "date de naissance",
            account: "compte de paiement",
            accountEndWith: "compte se terminant par",
            notation: "notation",
            wilaya: "wilaya",
            commune: "commune",
            street: "rue",
            createdAt: "créé le",
            editeddAt: "édité le",
            passWord: "mot de passe",
            noWilaya: "choisir d'abord une wilaya",
            subButton: "actualiser mon profile",
        },
    },
    en: {
        userInfosTitle: "personal information",
        billingInfosTitle: "billing",
        adressInfosTitle: "address",
        noChanges: "no changes to be made",
        inputs: {
            firstName: "first name",
            lastName: "last name",
            profilePic: "profile picture",
            email: "e-mail",
            emailConfirmation: "e-mail confirmation",
            phoneConfirmation: "phone confirmation",
            phone: "phone number",
            dob: "date of birth",
            account: "payment account",
            accountEndWith: "account ending with",
            notation: "notation",
            wilaya: "province",
            commune: "district",
            street: "street",
            createdAt: "created at",
            editeddAt: "edited at",
            passWord: "password",
            noWilaya: "first choose a province",
            subButton: "update my profile",
        },
    },
    ar: {
        userInfosTitle: "معلومات شخصية",
        billingInfosTitle: "الفواتير",
        adressInfosTitle: "العنوان",
        noChanges: "لا توجد تغييرات لإجرائها",
        inputs: {
            firstName: "الاسم الأول",
            lastName: "اسم العائلة",
            profilePic: "صورة الملف الشخصي",
            email: "البريد الإلكتروني",
            emailConfirmation: "تأكيد البريد الإلكتروني",
            phoneConfirmation: "تأكيد الهاتف",
            phone: "رقم الهاتف",
            dob: "تاريخ الميلاد",
            account: "حساب الدفع",
            accountEndWith: "الحساب ينتهي بـ",
            notation: "التقييم",
            wilaya: "المحافظة",
            commune: "الحي",
            street: "الشارع",
            createdAt: "تم الإنشاء في",
            editeddAt: "تم التعديل في",
            passWord: "كلمة المرور",
            noWilaya: "الرجاء اختيار محافظة أولاً",
            subButton: "تحديث ملفي الشخصي",
        },
    },
};

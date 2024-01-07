import { langType } from "./ClientInterface";

export const apiResponseLang: any = {
    fr: {
        EO: "autre erreur",
        ER: "échec de l'inscription, réessayez plus tard",
        ET: "jeton invalide",
        EN: "erreur de communication réseau avec le CDN",
        E01: "email déjà existant",
        E02: "téléphone déjà existant",
        E03: "aucun compte trouvé",
        E04: "erreur lors de l'édition des détails du compte, réessayez plus tard",
        E05: "mot de passe incorrect pour ce compte",
        E06: "vous devez confirmer votre email avant de vous connecter",
        E07: "aucun jeton fourni",
        S01: "inscription réussie, s'il vous plait verrifiez votre email pour le line de validation",
        S02: "connexion réussie",
        // S03: "inscription client réussie",
        // S04: "connexion client réussie",
        S05: "authentification réussie",
        E11: "mauvais lien de confirmation par email",
        E12: "erreur lors de la vérification de votre code (mauvais timing)",
        E13: "lien de confirmation par email expiré, réessayez avec un autre lien",
        E14: "chaîne de confirmation obligatoire pour cette route",
        E15: "lien déjà utilisé, essayez avec un autre lien valide",
        E16: "erreur lors de l'envoi de l'email",
        E17: "email déjà confirmé",
        S11: "email vérifié avec succès",
        S12: "email envoyé avec succès",
        S13: "mot de passe changé avec succès",
        E21: "erreur lors de la modification du compte, réessayez plus tard",
        E22: "erreur lors de la suppression du compte, réessayez plus tard",
        S21: "détails du compte modifiés avec succès",
        S22: "compte supprimé avec succès",
        E31: "erreur lors du téléversement de la ressource sur le serveur, réessayez plus tard",
        E32: "erreur lors de la création de votre ressource, réessayez plus tard",
        E33: "aucune ressource trouvée avec cet identifiant",
        E34: "erreur lors de l'enregistrement des modifications, réessayez plus tard",
        E35: "vous ne pouvez pas supprimer une ressource téléchargée plus d'une fois",
        E36: "erreur lors de la suppression de la ressource, réessayez plus tard",
        E37: "la ressource demandée n'est pas publique",
        S31: "ressource téléversée avec succès",
        S32: "ressource modifiée avec succès",
        S33: "ressource supprimée avec succès",
        S34: "ressource(s) trouvée(s) avec succès",
        E41: "non autorisé à ajouter un plan",
        E42: "erreur lors de la création du plan, réessayez plus tard",
        E43: "aucun plan trouvé",
        E44: "erreur lors de l'enregistrement des modifications du plan, réessayez plus tard",
        E45: "erreur lors de la suppression du plan, réessayez plus tard",
        S41: "plan ajouté avec succès",
        S42: "plan modifié avec succès",
        S43: "plan supprimé avec succès",
        S44: "plan(s) trouvé(s) avec succès",
        E51: "aucune catégorie trouvée.",
        E52: "aucune wilaya/commune trouvée.",
        S51: "catégories trouvées avec succès.",
        S52: "wilaya/commune trouvée avec succès.",
        E61: "erreur : impossible de créer votre projet.",
        E62: "erreur : aucune offre trouvée.",
        E63: "erreur : problème de propriété de l'offre (vous ne pouvez modifier que vos propres offres).",
        E64: "erreur : échec de la modification des détails de l'offre. veuillez réessayer plus tard.",
        E65: "erreur : échec de la suppression de l'offre. veuillez réessayer plus tard.",
        E66: "erreur : échec de la soumission de la participation. veuillez réessayer plus tard.",
        E67: "vous ne pouvez plus participer à ce projet.",
        E68: "vous n'avez pas accès à ce projet.",
        S61: "succès : offre créée avec succès.",
        S62: "succès : offre modifiée avec succès.",
        S63: "succès : offre supprimée avec succès.",
        S64: "succès : offre(s) trouvée(s) avec succès.",
        S65: "succès : participation soumise avec succès.",
        E71: "Erreur lors de la création de la facture. Veuillez réessayer ultérieurement.",
        E72: "Aucune facture trouvée.",
        E73: "Erreur lors de la tentative de modification de la facture. Veuillez réessayer ultérieurement.",
        E74: "Erreur lors de la tentative de suppression de la facture. Veuillez réessayer ultérieurement.",
        S71: "La facture a été créée avec succès.",
        S72: "La facture a été modifiée avec succès.",
        S73: "La facture a été supprimée avec succès.",
        S74: "Facture(s) trouvée(s).",
        E101: "erreur lors de l'enregistrement de l'image, réessayez plus tard",
        E102: "erreur lors du traitement de l'image",
        E103: "propriétaire de la ressource obligatoire",
        E104: "la ressource demandée n'existe pas",
        S101: "image enregistrée avec succès",
        S102: "ressources supprimées avec succès",
        formMissing: "un ou plusieurs champs obligatoires sont vides",
        resErr: "erreur lors de la réception de la réponse, veuillez réessayer plus tard",
    },
    ar: {
        EO: "خطأ آخر",
        ER: "فشل في التسجيل، يرجى المحاولة مرة أخرى لاحقًا",
        ET: "رمز مميز غير صالح",
        EN: "خطأ في التواصل مع شبكة CDN",
        E01: "البريد الإلكتروني موجود بالفعل",
        E02: "الهاتف موجود بالفعل",
        E03: "لا يوجد حساب موجود",
        E04: "خطأ في تحرير تفاصيل الحساب، يرجى المحاولة مرة أخرى لاحقًا",
        E05: "كلمة مرور خاطئة لهذا الحساب",
        E06: "يجب عليك تأكيد بريدك الإلكتروني قبل تسجيل الدخول",
        E07: "لم يتم توفير رمز مميز",
        S01: "تم التسجيل بنجاح، يرجى فحص بريدك الإلكتروني للحصول على رابط التحقق",
        S02: "تسجيل الدخول بنجاح",
        // S03: "تم تسجيل العميل بنجاح",
        // S04: "تسجيل الدخول للعميل بنجاح",
        S05: "المصادقة بنجاح",
        E11: "رابط تأكيد البريد الإلكتروني خاطئ",
        E12: "خطأ أثناء التحقق من الرمز الخاص بك (سوء التوقيت)",
        E13: "انتهت صلاحية رابط تأكيد البريد الإلكتروني، يرجى المحاولة مع رابط آخر",
        E14: "سلسلة التأكيد إلزامية لهذا المسار",
        E15: "الرابط مستخدم بالفعل، جرب استخدام رابط صالح آخر",
        E16: "خطأ أثناء إرسال البريد الإلكتروني",
        E17: "البريد الإلكتروني مؤكد بالفعل",
        S11: "تم التحقق من البريد الإلكتروني بنجاح",
        S12: "تم إرسال البريد الإلكتروني بنجاح",
        S13: "تم تغيير كلمة المرور بنجاح",
        E21: "خطأ أثناء تحرير الحساب، يرجى المحاولة مرة أخرى لاحقًا",
        E22: "خطأ أثناء حذف الحساب، يرجى المحاولة مرة أخرى لاحقًا",
        S21: "تم تحرير تفاصيل الحساب بنجاح",
        S22: "تم حذف الحساب بنجاح",
        E31: "خطأ أثناء تحميل المورد إلى الخادم، يرجى المحاولة مرة أخرى لاحقًا",
        E32: "خطأ أثناء إنشاء المورد الخاص بك، يرجى المحاولة مرة أخرى لاحقًا",
        E33: "لا يوجد مورد موجود بهذا الرقم التعريفي",
        E34: "خطأ أثناء حفظ التغييرات، يرجى المحاولة مرة أخرى لاحقًا",
        E35: "لا يمكنك حذف مورد تم تحميله أكثر من مرة",
        E36: "خطأ أثناء حذف المورد، يرجى المحاولة مرة أخرى لاحقًا",
        E37: "المورد الذي طلبته غير عام",
        S31: "تم تحميل المورد بنجاح",
        S32: "تم تعديل المورد بنجاح",
        S33: "تم حذف المورد بنجاح",
        S34: "تم العثور على المورد (أو الموارد)",
        E41: "غير مخول بإضافة خطة",
        E42: "خطأ أثناء إنشاء الخطة. يرجى المحاولة مرة أخرى لاحقًا",
        E43: "لا توجد خطة موجودة",
        E44: "خطأ أثناء حفظ تغييرات الخطة. يرجى المحاولة مرة أخرى لاحقًا",
        E45: "خطأ أثناء حذف الخطة. يرجى المحاولة مرة أخرى لاحقًا",
        S41: "تمت إضافة الخطة بنجاح",
        S42: "تم تعديل الخطة بنجاح",
        S43: "تم حذف الخطة بنجاح",
        S44: "تم العثور على الخطة(ات) بنجاح",
        E51: "لم يتم العثور على فئات.",
        E52: "لم يتم العثور على ولاية/بلدية.",
        S51: "تم العثور على الفئات بنجاح.",
        S52: "تم العثور على الولاية/البلدية بنجاح.",
        E61: "خطأ: غير قادر على إنشاء مشروعك.",
        E62: "خطأ: لا يوجد عرض.",
        E63: "خطأ: خطأ في ملكية العرض (يمكنك فقط تحرير عروضك).",
        E64: "خطأ: خطأ أثناء تحرير تفاصيل العرض. يرجى المحاولة مرة أخرى لاحقًا.",
        E65: "خطأ: خطأ أثناء حذف العرض. يرجى المحاولة مرة أخرى لاحقًا.",
        E66: "خطأ: خطأ أثناء تقديم المشاركة. حاول مرة أخرى في وقت لاحق.",
        E67: "لا يمكنك المشاركة في هذا المشروع بعد الآن.",
        E68: "ليس لديك وصول إلى هذا المشروع.",
        S61: "نجاح: تم إنشاء العرض بنجاح.",
        S62: "نجاح: تم تحرير العرض بنجاح.",
        S63: "نجاح: تم حذف العرض بنجاح.",
        S64: "نجاح: تم العثور على العرض(ات) بنجاح.",
        S65: "نجاح: تم تقديم المشاركة بنجاح.",
        E71: "حدث خطأ أثناء إنشاء الفاتورة. يرجى المحاولة مرة أخرى لاحقًا.",
        E72: "لم يتم العثور على أي فاتورة.",
        E73: "حدث خطأ أثناء محاولة تحرير الفاتورة. يرجى المحاولة مرة أخرى لاحقًا.",
        E74: "حدث خطأ أثناء محاولة حذف الفاتورة. يرجى المحاولة مرة أخرى لاحقًا.",
        S71: "تم إنشاء الفاتورة بنجاح.",
        S72: "تم تحرير الفاتورة بنجاح.",
        S73: "تم حذف الفاتورة بنجاح.",
        S74: "تم العثور على الفواتير.",
        E101: "خطأ أثناء حفظ الصورة، يرجى المحاولة مرة أخرى لاحقًا",
        E102: "خطأ أثناء معالجة الصورة",
        E103: "صاحب المورد إلزامي",
        E104: "المورد المطلوب غير موجود",
        S101: "تم حفظ الصورة بنجاح",
        S102: "تم حذف الموارد بنجاح",
        formMissing: "حقل (أو أكثر) إلزامي(ة) فارغ(ة)",
        resErr: "خطأ أثناء استلام الاستجابة، يرجى المحاولة مرة أخرى لاحقًا",
    },
    en: {
        EO: "other error",
        ER: "failed to register try again later",
        ET: "invalid token",
        EN: "network communication with CDN error",
        E01: "email already exist",
        E02: "phone already exist",
        E03: "no account found",
        E04: "account detail edition error try again later",
        E05: "wrong password for this account",
        E06: "you must confirm your email before logging in",
        E07: "no token provided",
        S01: "registered successfully, please check your email for the validation link",
        S02: "login successful",
        // S03: "client registered successfully",
        // S04: "client login successful",
        S05: "authentication successful",
        E11: "wrong email confirmation link",
        E12: "error while verifying your code (wrong timing)",
        E13: "email confirmation link expired try again with another link",
        E14: "confirmation string mandatory for this route",
        E15: "link already used try using another valid link",
        E16: "error while sending the email",
        E17: "email already confirmed",
        S11: "email verified successfully",
        S12: "email sent successfully",
        S13: "password changed successfully",
        E21: "error while editing account try again later",
        E22: "error while deleting account try again later",
        S21: "account details edited successfully",
        S22: "account deleted successfully",
        E31: "error while uploading resource to server try again later",
        E32: "error while creating your resource try again later",
        E33: "no resource found with this id",
        E34: "error while saving changes try again later",
        E35: "you can’t delete a resource downloaded more that 1 time",
        E36: "error while deleting the resource try again later",
        E37: "the resource you requested is not public",
        S31: "resource uploaded successfully",
        S32: "resource edited successfully",
        S33: "resource deleted successfully",
        S34: "resource (s) found successfully",
        E41: "not authorized to add a plan",
        E42: "error while creating plan try again later",
        E43: "no plan found",
        E44: "error while saving plan changes try again later",
        E45: "error while deleting plan try again later",
        S41: "plan added successfully",
        S42: "plan edited successfully",
        S43: "plan deleted successfully",
        S44: "plan (s) found successfully",
        E51: "no categories found.",
        E52: "no wilaya/commune found.",
        S51: "categories found successfully.",
        S52: "wilaya/commune found successfully.",
        E61: "error: unable to create your project.",
        E62: "error: no offer found.",
        E63: "error: offer ownership error (you can only edit your offers).",
        E64: "error: error while editing the offer details. please try again later.",
        E65: "error: error while deleting offer. please try again later.",
        E66: "error: error while submitting participation. try again later.",
        E67: "you can no longer participate in this project.",
        E68: "you don’t have access to this project.",
        S61: "success: offer created successfully.",
        S62: "success: offer edited successfully.",
        S63: "success: offer deleted successfully.",
        S64: "success: offer(s) found successfully.",
        S65: "success: participation submitted successfully.",
        E71: "Error occurred while creating the invoice. Please try again later.",
        E72: "No invoice was found.",
        E73: "Error occurred while trying to edit the invoice. Please try again later.",
        E74: "Error occurred while trying to delete the invoice. Please try again later.",
        S71: "The invoice was created successfully.",
        S72: "The invoice was edited successfully.",
        S73: "The invoice was deleted successfully.",
        S74: "Invoice(s) found.",
        E101: "error while saving image try again later",
        E102: "error while processing image",
        E103: "resource owner mandatory",
        E104: "requested resource doesn’t exist",
        S101: "image saved successfully",
        S102: "resources deleted successfully",
        formMissing: "one or more mandatory field(s) is empty",
        resErr: "error while receiving response, please try again later",
    },
};

type generalLangType = {
    [key in langType]: {
        priceUnit: string;
    };
};

export const GeneralLang: generalLangType = {
    fr: {
        priceUnit: "DA",
    },
    en: {
        priceUnit: "DA",
    },
    ar: {
        priceUnit: "دج",
    },
};

export const projectStatusLang: any = {
    fr: {
        "0": "recrutement",
        "1": "en cours",
        "2": "terminé",
        "3": "annulé",
    },
    en: {
        "0": "recruting",
        "1": "in progress",
        "2": "completed",
        "3": "canceled",
    },
    ar: {
        "0": "مرحلة التوظيف",
        "1": "قيد التقدم",
        "2": "مكتمل",
        "3": "ألغيت",
    },
};

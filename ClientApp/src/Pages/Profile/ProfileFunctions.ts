import { clientType } from "../../../../Serveur/App/Models/Clients";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { formatForInput, mediaCompressionMono } from "../../MiddleWear/ClientFunctions";
import { InputType, OnChangeEventType } from "../../MiddleWear/ClientInterface";
import { ProfileLang } from "./ProfileLang";

export type ProfileInputsType = {
    state: Partial<freelanceType | clientType>;
    editedState: React.Dispatch<React.SetStateAction<Partial<freelanceType | clientType>>>;
    stateSetter: Function;
    wilayas: any[] | null;
    communes: any[] | null;
};

export const ProfileInputs = ({ editedState, state, stateSetter, wilayas, communes }: ProfileInputsType): Array<InputType | InputType[]> => {
    const lang: "fr" | "ar" | "en" = window.localStorage.lang;

    const onChange = (e: OnChangeEventType) => {
        const { target } = e;
        const { nonce, name, value } = target;
        const st: any = { ...state };
        if (nonce) {
            stateSetter({ ...st, [nonce]: { ...st[nonce], [name]: value } });
            return editedState((stt) => {
                //@ts-ignore
                return { ...stt, [nonce]: { ...stt[nonce], [name]: value } };
            });
        }
        stateSetter({ ...st, [name]: value });
        return editedState((stt) => {
            return { ...stt, [name]: value };
        });
    };
    const comboOnChange = (e: { name: string; value: any; nonce?: string }) => {
        const { value, name, nonce } = e;
        if (nonce) {
            editedState((stt) => {
                //@ts-ignore
                return { ...stt, [nonce]: { ...stt[nonce], [name]: value } };
            });
            //@ts-ignore
            return stateSetter({ ...state, [nonce]: { ...state[nonce], [name]: value } });
        }
        editedState((stt) => {
            return { ...stt, [name]: value };
        });
        return stateSetter({ ...state, [name]: value });
    };

    const dateChange = (e: OnChangeEventType) => {
        const { target } = e;
        const { nonce, name, value } = target;
        const st: any = { ...state };

        const date = new Date(value).getTime();
        if (nonce) {
            editedState((stt) => {
                //@ts-ignore
                return { ...stt, [nonce]: { ...stt[nonce], [name]: date } };
            });
            return stateSetter({ ...st, [nonce]: { ...st[nonce], [name]: date } });
        }
        stateSetter({ ...st, [name]: date });
        return editedState((stt) => {
            return { ...stt, [name]: date };
        });
    };

    const addToListe = (name: string, value: string | number, limite: number) => {
        const st: any = { ...state };
        if (st[name] && limite && st[name].length >= limite) {
            return;
        }
        st[name] ? st[name].push(value) : (st[name] = [value]);

        return stateSetter(st);
    };

    const fileInputchange = async (e: OnChangeEventType) => {
        try {
            const { target } = e;
            const { name, files } = target;

            const file = await mediaCompressionMono({ InputValues: files![0], width: 800, quality: 70, format: "webp" });
            editedState((stt) => {
                return { ...stt, [name]: file };
            });
            return stateSetter({ ...state, [name]: file });
        } catch (error) {
            console.log("🚀 ~ file: ProfileFunctions.ts:67 ~ fileInputchange ~ error:", error);
        }
    };

    const removeFromListe = (name: string, index: number) => {
        const st: any = { ...state };
        st[name].splice(index, 1);
        return stateSetter(st);
    };

    const { profilePicture, firstName, familyName, email, phone, dob, phoneConfirmation, emailConfirmation, billing, adress } = state;
    const { accountEndWith, accountNumber } = billing || {};
    const { wilaya, commune, street } = adress || {};

    const Inputs: Array<InputType[] | InputType> = [
        {
            inputType: "separation",
            title: ProfileLang[lang].userInfosTitle,
            className: "profileSepInp",
            line: true,
        },
        [
            {
                inputType: "fileInp",
                name: "profilePicture",
                onChange: fileInputchange,
                content: ProfileLang[lang].inputs.profilePic,
                icon: "fi fi-sr-inbox-out",
                accept: "image/*",
                value: profilePicture ? profilePicture : "",
                containerClass: "basicInfosCont",
            },
            {
                inputType: "regular",
                name: "firstName",
                type: "text",
                title: ProfileLang[lang].inputs.firstName,
                onChange: onChange,
                value: firstName ? firstName : "",
                required: firstName ? false : true,
                className: "InpStdclass",
                containerClass: "inputParentProfile",
                placeholder: "john",
            },
            {
                inputType: "regular",
                name: "familyName",
                type: "text",
                title: ProfileLang[lang].inputs.lastName,
                onChange: onChange,
                value: familyName ? familyName : "",
                required: familyName ? false : true,
                className: "InpStdclass",
                containerClass: "inputParentProfile",
                placeholder: "doe",
            },
        ],
        {
            inputType: "regular",
            name: "email",
            type: "email",
            title: ProfileLang[lang].inputs.email,
            onChange: onChange,
            value: email ? email : "",
            required: email ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
            placeholder: "johndoe@somemail.co",
        },
        {
            inputType: "regular",
            name: "phone",
            type: "text",
            title: ProfileLang[lang].inputs.phone,
            onChange: onChange,
            value: phone ? phone : "",
            required: phone ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
            placeholder: "0555468210",
        },
        {
            inputType: "regular",
            name: "dob",
            type: "date",
            title: ProfileLang[lang].inputs.dob,
            onChange: dateChange,
            value: dob ? formatForInput(dob) : "",
            required: dob ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },

        {
            inputType: "separation",
            title: ProfileLang[lang].adressInfosTitle,
            className: "profileSepInp",
            line: true,
        },
        [
            {
                inputType: "combo",
                name: "wilaya",
                nonce: "adress",
                type: "text",
                onComboChange: comboOnChange,
                required: true,
                options: formatForCombo(wilayas!, "wilaya"),
                comboContent: { value: wilaya ? wilaya : "", label: wilaya ? getHashMap(wilayas!, "wilaya")[wilaya] : "" },
                placeholder: ProfileLang[lang].inputs.wilaya,
                className: "InpStdclass ",
                containerClass: "inputParentProfile basicInfosCont",
            },
            {
                inputType: "combo",
                name: "commune",
                nonce: "adress",
                type: "text",
                onComboChange: comboOnChange,
                required: true,
                options: wilaya ? formatForCombo(communes!, "number") : [{ label: ProfileLang[lang].inputs.noWilaya, value: "" }],
                comboContent: { value: commune ? commune : "", label: commune ? getHashMap(communes!, "number")[commune] : "" },
                placeholder: ProfileLang[lang].inputs.commune,
                className: "InpStdclass ",
                containerClass: "inputParentProfile",
            },
        ],

        {
            inputType: "regular",
            name: "street",
            nonce: "adress",
            type: "text",
            // title: ProfileLang[lang].inputs.street,
            onChange: onChange,
            value: street ? street : "",
            required: street ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
            placeholder: ProfileLang[lang].inputs.street,
        },
        {
            inputType: "separation",
            title: ProfileLang[lang].billingInfosTitle,
            className: "profileSepInp",
            line: true,
        },

        {
            inputType: "regular",
            name: "accountNumber",
            nonce: "billing",
            type: "text",
            title: ProfileLang[lang].inputs.account,
            onChange: onChange,
            value: accountNumber ? accountNumber : accountEndWith ? `*******${accountEndWith}` : "",
            required: accountNumber || accountEndWith ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
            placeholder: "******1234",
        },
        {
            inputType: "button",
            content: ProfileLang[lang].inputs.subButton,
            icon: "fi fi-sr-comet",
            className: "pagesNavButton profButtonFullW",
        },
    ];

    return Inputs;
};

export const formatForCombo = (arr: any[], field: string) => {
    let lang = window.localStorage.lang;
    if (!lang) {
        return [{ label: "choose language", value: "" }];
    }
    if (lang == "en") {
        lang = "fr";
    }
    let finalArr: any = [];
    arr.forEach((elem) => {
        finalArr.push({ label: elem[lang], value: elem[field] });
    });

    return finalArr;
};

export const getHashMap = (arr: any[], field: string): any => {
    let lang = window.localStorage.lang;
    if (!lang) {
        return;
    }
    let obj = {};
    if (lang == "en") {
        lang = "fr";
    }

    arr.forEach((elem: any) => {
        obj = { ...obj, [elem[field]]: elem[lang] };
    });
    return obj;
};

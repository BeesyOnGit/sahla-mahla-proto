import { resourcesType } from "../../../../Serveur/App/Models/Resources";
import { GeneralLang } from "../../MiddleWear/ClientData";
import { fileToBase64Mono, mediaCompressionMono } from "../../MiddleWear/ClientFunctions";
import { OnChangeEventType, inputType, langType } from "../../MiddleWear/ClientInterface";
import { offerInputsType } from "../Projects/ProjectFunctions";
import { resourcesLang } from "./ResourcesLang";

export const createEditResourcesInputs = ({
    editedState,
    state,
    stateSetter,
    fields,
}: offerInputsType<resourcesType>): Array<inputType | inputType[]> => {
    const lang: langType = window.localStorage.lang;

    const onChange = (e: OnChangeEventType) => {
        const { target } = e;
        const { nonce, name, value } = target;
        const st: any = { ...state };
        if (nonce) {
            stateSetter({ ...st, [nonce]: { ...st[nonce], [name]: value } });
            return (
                editedState &&
                editedState((stt) => {
                    //@ts-ignore
                    return { ...stt, [nonce]: { ...stt[nonce], [name]: value } };
                })
            );
        }
        stateSetter({ ...st, [name]: value });
        return (
            editedState &&
            editedState((stt) => {
                return { ...stt, [name]: value };
            })
        );
    };

    const comboOnChangeMulti = (e: { name: string; value: any; nonce?: string }) => {
        const { value, name, nonce } = e;
        if (nonce) {
            editedState &&
                editedState((stt) => {
                    //@ts-ignore
                    return {
                        ...stt,
                        //@ts-ignore
                        [nonce]: { ...stt[nonce], [name]: Array.isArray(state[nonce][name]) ? [...state[nonce][name], value] : [value] },
                    };
                });
            //@ts-ignore
            return stateSetter({
                ...state,
                //@ts-ignore
                [nonce]: { ...state[nonce], [name]: Array.isArray(state[nonce][name]) ? [...state[nonce][name], value] : [value] },
            });
        }
        editedState &&
            editedState((stt) => {
                //@ts-ignore
                return { ...stt, [name]: Array.isArray(state[name]) ? [...state[name], value] : [value] };
            });
        //@ts-ignore
        return stateSetter({ ...state, [name]: Array.isArray(state[name]) ? [...state[name], value] : [value] });
    };

    const dateChange = (e: OnChangeEventType) => {
        const { target } = e;
        const { nonce, name, value } = target;
        const st: any = { ...state };

        const date = new Date(value).getTime();
        if (nonce) {
            editedState &&
                editedState((stt) => {
                    //@ts-ignore
                    return { ...stt, [nonce]: { ...stt[nonce], [name]: date } };
                });
            return stateSetter({ ...st, [nonce]: { ...st[nonce], [name]: date } });
        }
        stateSetter({ ...st, [name]: date });
        return (
            editedState &&
            editedState((stt) => {
                return { ...stt, [name]: date };
            })
        );
    };

    const addToListe = (name: string, value: string | number, limite: number) => {
        const st: any = { ...state };
        if (st[name] && limite && st[name].length >= limite) {
            return;
        }
        st[name] ? st[name].push(value) : (st[name] = [value]);

        return stateSetter(st);
    };

    const removeFromListe = (name: string, index: number) => {
        const st: any = { ...state };
        st[name].splice(index, 1);
        return stateSetter(st);
    };

    const fileInputchange = async (e: OnChangeEventType) => {
        try {
            const { target } = e;
            const { name, files } = target;

            const file = await fileToBase64Mono({ InputValues: files![0] });
            // editedState((stt) => {
            //     return { ...stt, [name]: file };
            // });
            return stateSetter({ ...state, [name]: file });
        } catch (error) {
            console.log("🚀 ~ file: ProfileFunctions.ts:67 ~ fileInputchange ~ error:", error);
        }
    };

    const { title, description, price, discount, resourceLink, categories } = state;

    const Inputs: Array<inputType[] | inputType> = [
        {
            inputType: "separation",
            title: resourcesLang[lang].addresTitle,
            className: "profileSepInp",
            line: true,
        },

        {
            inputType: "regular",
            name: "title",
            type: "text",
            title: resourcesLang[lang].addResInputs.title,
            onChange: onChange,
            value: title ? title : "",
            required: title ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },
        [
            {
                containerClass: "",
            },
            {
                inputType: "multi",
                name: "categories",
                type: "text",
                title: resourcesLang[lang].addResInputs.categories,
                placeholder: resourcesLang[lang].addResInputs.categories,
                // onChange: onChange,
                // value: categories ? categories : "",
                required: categories && categories.length > 0 ? false : true,
                className: "InpStdclass",
                containerClass: "inputParentProfile",
                addElemToListe: addToListe,
                removeElem: removeFromListe,
                multiValues: categories,
            },
        ],

        {
            inputType: "regular",
            name: "description",
            textArea: true,
            title: resourcesLang[lang].addResInputs.description,
            onChange: onChange,
            rows: 4,
            value: description ? description : "",
            required: description ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },

        {
            inputType: "separation",
            title: resourcesLang[lang].addResInputs.priceTitle,
            className: "profileSepInp",
            line: true,
        },
        [
            {
                containerClass: "basicInfosCont addOfferBasicInfos",
            },
            {
                inputType: "regular",
                name: "price",
                step: 1,
                type: "number",
                min: 1,
                innerUnit: GeneralLang[lang].priceUnit,
                title: resourcesLang[lang].addResInputs.price,
                onChange: onChange,
                value: price ? price : "",
                required: price ? false : true,
                className: "InpStdclass",
                containerClass: "inputParentProfile",
            },
            {
                inputType: "regular",
                name: "discount",
                step: 1,
                type: "number",
                innerUnit: "%",
                min: 0,
                max: 100,
                title: resourcesLang[lang].addResInputs.discount,
                onChange: (e) => {
                    e.target.value = (parseInt(e.target.value) / 100).toString();
                    onChange(e);
                },
                value: discount ? discount * 100 : "",
                required: discount ? false : true,
                className: "InpStdclass",
                containerClass: "inputParentProfile",
            },
        ],
        {
            inputType: "separation",
            title: resourcesLang[lang].addResInputs.resourcetitle,
            className: "profileSepInp",
            line: true,
        },
        {
            inputType: "imgInput",
            name: "resourceLink",
            onChange: fileInputchange,
            required: resourceLink ? false : true,
            value: resourceLink,
            className: "resourceImageOrIcon",
            icon: "fi fi-sr-images",
            containerClass: "resourceImageContainer",
            placeholder: "uploade resource",
            accept: "image/jpeg, image/jpg, image/png",
        },

        {
            inputType: "button",
            content: resourcesLang[lang].addResInputs.addResButton,
            icon: "fi fi-sr-money-bills ",
            className: "pagesNavButton profButtonFullW",
        },
    ];

    return Inputs;
};

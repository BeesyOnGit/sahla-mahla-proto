import { fileToBase64Mono, mediaCompressionMono } from "../../MiddleWear/ClientFunctions";
import { OnChangeEventType, inputType, langType } from "../../MiddleWear/ClientInterface";
import { offerInputsType } from "../Projects/ProjectFunctions";
import { OrdersLang } from "./OrdersLang";

export const submissionLinksInputs = ({ editedState, state, stateSetter }: offerInputsType): Array<inputType | inputType[]> => {
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

    const fileInputchange = async (e: OnChangeEventType) => {
        try {
            const { target } = e;
            const { name, files } = target;

            const file = await fileToBase64Mono({ InputValues: files![0] });
            console.log("🚀 ~ file: OrderFunctions.ts:89 ~ fileInputchange ~ file:", file);
            editedState &&
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

    const { temporaryLink, finalLink } = state;

    const Inputs: Array<inputType[] | inputType> = [
        [
            {
                containerClass: "orderFilesContainer",
            },
            {
                inputType: "fileInp",
                name: "temporaryLink",
                onChange: fileInputchange,
                content: OrdersLang[lang].ordDetail.tmpLink,
                icon: "fi fi-sr-file-upload",
                value: temporaryLink ? temporaryLink : "",
                // className: "InpStdclass",
                containerClass: "basicInfosCont",
            },
            {
                inputType: "fileInp",
                name: "finalLink",
                onChange: fileInputchange,
                content: OrdersLang[lang].ordDetail.finalLink,
                icon: "fi fi-sr-file-upload",
                value: finalLink ? finalLink : "",
                // className: "InpStdclass",
                containerClass: "basicInfosCont",
            },
        ],
        {
            inputType: "button",
            content: OrdersLang[lang].ordDetail.submitLink,
            icon: "fi fi-sr-comet",
            className: "pagesNavButton profButtonFullW",
        },
    ];

    return Inputs;
};

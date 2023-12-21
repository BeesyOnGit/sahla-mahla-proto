import { projectType, submittersListType } from "../../../../Serveur/App/Models/Project";
import { OnChangeEventType, inputType, langType } from "../../MiddleWear/ClientInterface";
import { formatForInput, mediaCompressionMono } from "../../MiddleWear/ClientFunctions";
import { ProjectLang } from "./ProjectsLang";
import { formatForCombo, getHashMap } from "../Profile/ProfileFunctions";
import { GeneralLang } from "../../MiddleWear/ClientData";

type offerInputsType = {
    state: Partial<projectType>;
    stateSetter: Function;
    editedState?: React.Dispatch<React.SetStateAction<Partial<projectType>>>;
    fields?: any[];
};

export const createEditOfferInputs = ({ editedState, state, stateSetter, fields }: offerInputsType): Array<inputType | inputType[]> => {
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

    const { title, description, amount, targetFields, buyerDeadline, submitDeadLine } = state;

    const Inputs: Array<inputType[] | inputType> = [
        {
            inputType: "separation",
            title: ProjectLang[lang].inputs.projectInfosTitle,
            className: "profileSepInp",
            line: true,
        },

        // {
        //     containerClass: "basicInfosCont addOfferBasicInfos",
        // },
        {
            inputType: "regular",
            name: "title",
            type: "text",
            title: ProjectLang[lang].inputs.offerTitle,
            onChange: onChange,
            // value: title ? title : "",
            multiple: true,
            multiValues: targetFields ? [] : [],
            required: title ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },
        {
            inputType: "combo",
            name: "targetFields",
            type: "text",
            title: ProjectLang[lang].inputs.offerTargetFields,
            onComboChange: comboOnChangeMulti,
            options: formatForCombo(fields!, "categoryCode"),
            multiple: true,
            removeElem: removeFromListe,
            multiValues: targetFields ? formatForComboMultiValues(targetFields, getHashMap(fields!, "categoryCode")) : [],
            // value: title ? title : "",
            required: Array.isArray(targetFields) && targetFields.length > 0 ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
            comboContainerClass: "",
            // placeholder: "fdf",
        },

        {
            inputType: "regular",
            name: "description",
            textArea: true,
            title: ProjectLang[lang].inputs.offerDesc,
            onChange: onChange,
            rows: 4,
            value: description ? description : "",
            required: description ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },

        {
            inputType: "separation",
            title: ProjectLang[lang].inputs.projectBudgetTimeTitle,
            className: "profileSepInp",
            line: true,
        },
        [
            {
                containerClass: "basicInfosCont addOfferBasicInfos",
            },
            {
                inputType: "regular",
                name: "amount",
                step: 1,
                type: "number",
                innerUnit: GeneralLang[lang].priceUnit,
                title: ProjectLang[lang].inputs.offerAmount,
                onChange: onChange,
                value: amount ? amount : "",
                required: amount ? false : true,
                className: "InpStdclass",
                containerClass: "inputParentProfile",
            },
            {
                inputType: "regular",
                name: "buyerDeadline",
                type: "date",
                title: ProjectLang[lang].inputs.offerDeadline,
                onChange: dateChange,
                min: formatForInput(new Date().getTime()),
                value: buyerDeadline ? formatForInput(buyerDeadline) : "",
                required: buyerDeadline ? false : true,
                className: "InpStdclass",
                containerClass: "inputParentProfile",
            },
        ],
        {
            inputType: "regular",
            name: "submitDeadLine",
            type: "datetime-local",
            title: ProjectLang[lang].inputs.submitableUntil,
            onChange: dateChange,
            step: "1",
            min: formatForInput(new Date().getTime(), "full"),
            max: formatForInput(dateWithMinutes(1440), "full"),
            value: submitDeadLine ? formatForInput(submitDeadLine, "full") : "",
            required: submitDeadLine ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },
        {
            inputType: "button",
            content: ProjectLang[lang].inputs.subButton,
            icon: "fi fi-sr-comet",
            className: "pagesNavButton profButtonFullW",
        },
    ];

    return Inputs;
};

export const projectSubmissionForm = ({
    editedState,
    state,
    stateSetter,
}: offerInputsType & { state: Partial<submittersListType> }): Array<inputType | inputType[]> => {
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

    const { submitterPrice, submitterDeadline, submitterQuestions } = state;

    const Inputs: Array<inputType[] | inputType> = [
        {
            inputType: "separation",
            title: ProjectLang[lang].inputs.submitOffer,
            className: "profileSepInp",
            line: true,
        },

        {
            inputType: "regular",
            name: "submitterPrice",
            step: 1,
            type: "number",
            innerUnit: GeneralLang[lang].priceUnit,
            title: ProjectLang[lang].inputs.proposedPrice,
            onChange: onChange,
            value: submitterPrice ? submitterPrice : "",
            required: submitterPrice ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },
        {
            inputType: "regular",
            name: "submitterDeadline",
            type: "date",
            title: ProjectLang[lang].inputs.proposedDeadline,
            onChange: dateChange,
            min: formatForInput(new Date().getTime()),
            value: submitterDeadline ? formatForInput(submitterDeadline) : "",
            required: submitterDeadline ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },
        {
            inputType: "regular",
            name: "submitterQuestions",
            textArea: true,
            title: ProjectLang[lang].inputs.anyQuestion,
            onChange: onChange,
            rows: 4,
            value: submitterQuestions ? submitterQuestions : "",
            // required: submitterQuestions ? false : true,
            className: "InpStdclass",
            containerClass: "inputParentProfile",
        },
        {
            inputType: "button",
            content: ProjectLang[lang].inputs.subButton,
            icon: "fi fi-sr-comet",
            className: "pagesNavButton profButtonFullW",
        },
    ];

    return Inputs;
};

export const formatForComboMultiValues = (values: any[], valuesHashMap: any) => {
    let finalArr: any[] = [];

    values.forEach((value, i) => {
        finalArr.push(valuesHashMap[value]);
    });
    return finalArr;
};

const dateWithMinutes = (minsToAdd: number) => {
    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + minsToAdd).getTime();
};

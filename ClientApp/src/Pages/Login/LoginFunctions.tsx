import { LoginInputs } from "./Login";
import { LoginLang } from "./LoginLang";
import { apiResponseLang } from "../../MiddleWear/ClientData";
import { clientLogin, freelanceLogin } from "../../MiddleWear/ApiMiddleWear";
import { InputType, OnChangeEventType } from "../../MiddleWear/ClientInterface";
// import { setNewAlert } from "../../MiddleWear/Signals";

// type InputEvent = React.ChangeEvent<HTMLInputElement>;
// type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const lang: "fr" | "ar" | "en" = window.localStorage.lang;

export const InputsContent = ({ state, setState, setNewAlert }: { state: LoginInputs; setState: Function; setNewAlert: Function }) => {
    if (!lang) {
        setNewAlert({ message: "", type: "error" });
        return [];
    }
    const onChange = (e: OnChangeEventType) => {
        if (e.target.name == "userName") {
            return setState({ ...state, [e.target.name]: e.target.value.toLocaleLowerCase() });
        }
        return setState({ ...state, [e.target.name]: e.target.value });
    };
    const Inputs: Array<InputType> = [
        {
            type: "text",
            name: "id",
            placeholder: LoginLang[lang].inputs.id,
            onChange,
            containerClass: "w-full logInputsClass",
            className: "regularInput",
            required: true,
            value: state.id,
        },
        {
            type: "password",
            name: "passWord",
            placeholder: LoginLang[lang].inputs.pass,
            onChange,
            containerClass: "w-full logInputsClass",
            className: "regularInput",
            required: true,
            value: state.passWord,
        },
    ];
    return Inputs;
};

export const loginFunction = async ({ form, userType, setNewAlert }: { form: LoginInputs; userType: 1 | 2; setNewAlert: Function }) => {
    const { id, passWord } = form;
    if (!lang) {
        setNewAlert({ message: "", type: "error" });
        return;
    }

    if (!userType) {
        setNewAlert({ message: "", type: "error" });
        return;
    }

    const logFunction: any = {
        1: freelanceLogin,
        2: clientLogin,
    };

    try {
        if (!id || !passWord) {
            setNewAlert({ type: "error", message: apiResponseLang[lang].formMissing });
            return;
        }

        const res = await logFunction[userType](form);

        if (!res) {
            setNewAlert({ type: "error", message: apiResponseLang[lang].resErr });
            return;
        }

        const { code, token } = res || {};
        if (code != "S04" && code != "S02") {
            setNewAlert({ type: "warning", message: apiResponseLang[lang][code] });
            return;
        }

        window.localStorage.setItem("user_token", token);

        setNewAlert({ type: "success", message: apiResponseLang[lang][code] });
        return setTimeout(() => {
            location.reload();
            return;
        }, 1000);
    } catch (error) {
        console.log("🚀 ~ file: LoginFunctions.tsx:62 ~ loginFunction ~ error:", error);
    }
};

export const logoutFunction = () => {
    window.localStorage.removeItem("token");
    location.reload();
};

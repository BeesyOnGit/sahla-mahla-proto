import { ChangeEvent } from "react";

export type InputType = {
    title?: string;
    inputType?: "separation" | "regular" | "multi" | "button" | "combo" | "fileInp";
    multiValues?: Array<string>;
    multipleLimit?: number | undefined;
    removeElem?: Function;
    addElemToListe?: Function;
    icon?: string;
    innerInputIcon?: string;
    innerUnit?: string;
    content?: string;
    containerClass?: string;
    options?: { label: string; value: any }[];
    comboContent?: any;
    onComboChange?: Function;
    ref?: any;
    // submit?: boolean;
} & Partial<React.InputHTMLAttributes<HTMLInputElement>>;

export type alertType = {
    type: "success" | "error" | "warning";
    message: string;
};

export type langType = "fr" | "ar" | "en";

export type OnChangeEventType = ChangeEvent<HTMLInputElement> & {};

import React, { ChangeEvent } from "react";

export type inputType = {
    title?: string;
    inputType?: "separation" | "regular" | "multi" | "button" | "combo" | "fileInp" | "imgInput";
    multiValues?: any[];
    textArea?: boolean;
    multipleLimit?: number | undefined;
    multiple?: boolean;
    removeElem?: Function;
    addElemToListe?: Function;
    icon?: string;
    innerUnit?: string;
    content?: string;
    comboContainerClass?: string;
    containerClass?: string;
    options?: { label: string; value: any }[];
    comboContent?: any;
    onComboChange?: Function;
    innerInputIcon?: any;
    cols?: number;
    rows?: number;
    ref?: any;
    line?: boolean;
    apiButton?: boolean;
    // submit?: boolean;
} & Partial<React.InputHTMLAttributes<HTMLInputElement>>;

export type alertType = {
    type: "success" | "error" | "warning";
    message: string;
};

export type langType = "fr" | "ar" | "en";

export type configColorType = {
    property: string;
    color: string;
};

export type OnChangeEventType = ChangeEvent<HTMLInputElement> & {};

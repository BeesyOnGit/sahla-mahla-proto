import React from "react";
import { Contexts } from "../../Contexts/Contexts";
import PageLoading from "../PageLoading/PageLoading";
import GeneralLoading from "../GeneralLoading/GeneralLoading";
import "./Button.scss";
export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    icon?: string;
    content?: any;
    type?: "button";
    apiButton?: boolean;
    // submit?: boolean;
};
function Button(props: ButtonProps) {
    const { apiWait } = Contexts();
    const { children, icon, content, apiButton, ...other } = props;
    return (
        <button {...other}>
            {(icon && !apiWait && apiButton) || (icon && !apiButton) ? <i className={icon + " generalIconClass"}></i> : null}
            {apiWait && apiButton && (
                <GeneralLoading customStyle={{ height: "fit-content" }} customLoadingStyle={{ width: "1rem", height: "1rem" }} />
            )}

            {(content && !apiWait && apiButton) || (content && !apiButton) ? <div> {content} </div> : null}
            {(children && !apiWait && apiButton) || (children && !apiButton) ? children : null}
        </button>
    );
}

export default Button;

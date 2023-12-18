import React from "react";
export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    icon?: string;
    content: string | number;
    type?: "button";
    // submit?: boolean;
};
function Button(props: ButtonProps) {
    const { children, icon, content, ...other } = props;
    return (
        <button {...other}>
            {icon && <i className={icon + " generalIconClass"}></i>}

            <div> {content} </div>
        </button>
    );
}

export default Button;

import React, { useState } from "react";
import "./Inputs.css";
import { InputType } from "../../MiddleWear/ClientInterface";

function Inputs(props: InputType) {
    const { type, title, className, innerUnit, containerClass, ...otherPpops } = props;
    const { required, value } = otherPpops;
    const [showPassWord, setShowPassWord] = useState<"password" | "text">("password");

    const changePasswordVisibility = () => {
        if (showPassWord == "password") {
            return setShowPassWord("text");
        }
        return setShowPassWord("password");
    };
    const reqCondition: "true" | "false" = required && !value ? "true" : "false";
    return (
        <div className={containerClass + " inputsContainer"}>
            {title ? <div> {title} :</div> : null}
            <input {...otherPpops} type={type == "password" ? showPassWord : type} className={className + " " + requiredMap[reqCondition]} />
            {type == "password" ? (
                <i
                    className="fi fi-sr-eye innerUnit"
                    onClick={() => {
                        changePasswordVisibility();
                    }}
                ></i>
            ) : innerUnit ? (
                <i className="innerUnit UnitsStyle"> {innerUnit} </i>
            ) : null}
        </div>
    );
}

export default Inputs;
export const requiredMap = {
    true: "inpreq",
    false: "",
};

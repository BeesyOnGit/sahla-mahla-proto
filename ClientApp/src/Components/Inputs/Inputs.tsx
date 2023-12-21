import React, { useState } from "react";
import "./Inputs.css";
import { inputType } from "../../MiddleWear/ClientInterface";

function Inputs(props: inputType) {
    const { type, title, className, innerUnit, innerInputIcon, containerClass, textArea, ...otherPpops } = props;
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
            {textArea ? (
                //@ts-ignore
                <textarea
                    {...otherPpops}
                    // type={type == "password" ? showPassWord : type}
                    className={className + " " + requiredMap[reqCondition]}
                ></textarea>
            ) : (
                <div className="inpsubContainer">
                    <input {...otherPpops} type={type == "password" ? showPassWord : type} className={className + " " + requiredMap[reqCondition]} />
                    {type == "password" ? (
                        <i
                            className="fi fi-sr-eye innerUnit"
                            onClick={() => {
                                changePasswordVisibility();
                            }}
                        ></i>
                    ) : innerUnit || innerInputIcon ? (
                        <i className={innerInputIcon + " innerUnit UnitsStyle"}> {innerUnit} </i>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default Inputs;
export const requiredMap = {
    true: "inpreq",
    false: "",
};

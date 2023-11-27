import React from "react";
import "./Separation.css";
export type separatinProps = {
    title: string;
};
function Separation({ title }: separatinProps) {
    return (
        <div className="separationGeneralContainer">
            <div className="separationLine"></div>
            <div className="separationTitle"> {title} </div>
            <div className="separationLine2"></div>
        </div>
    );
}

export default Separation;

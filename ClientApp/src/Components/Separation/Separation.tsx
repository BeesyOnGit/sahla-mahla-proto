import React from "react";
import "./Separation.css";
export type separatinProps = {
    title: string;
    className?: string;
    line?: boolean;
};
function Separation({ title, className, line }: separatinProps) {
    return (
        <div className={"separationGeneralContainer " + className}>
            {line && <span className="separationLine"></span>}
            <div className="separationTitle"> {title} </div>
            {line && <span className="separationLine2"></span>}
        </div>
    );
}

export default Separation;

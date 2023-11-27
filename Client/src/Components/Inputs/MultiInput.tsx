import { InputType } from "../../MiddleWear/ClientInterface";
import { requiredMap } from "./Inputs";
import "./Inputs.css";
import { useRef } from "react";

function MultiInput(props: InputType) {
    const { multiValues, removeElem, addElemToListe, multipleLimit, required, className, ...otherPpops } = props;
    const { name } = otherPpops;
    const ref = useRef<HTMLInputElement>(null);
    const execAddElem = () => {
        if (!ref || !ref.current) {
            return;
        }
        const val = ref.current.value;
        if (!val) {
            return;
        }

        addElemToListe!(name, val, multipleLimit);

        ref.current.value = "";
    };
    const reqCondition: "true" | "false" = required && (!multiValues || multiValues.length == 0) ? "true" : "false";

    return (
        <div className="multiInputGeneralContainer">
            <div className="inputsContainer multipleInputs">
                <input {...otherPpops} ref={ref} className={className + " " + requiredMap[reqCondition]} />

                <i
                    className="fi fi-sr-square-plus"
                    onClick={() => {
                        execAddElem();
                    }}
                ></i>
            </div>
            {multiValues ? (
                <div className="MultiInputSelectedShow">
                    {multiValues?.map((elem, i) => {
                        return (
                            <div key={i} className="multiInputSelectedElem">
                                <div> {elem} </div>
                                <i className="fi fi-sr-cross-circle" onClick={() => removeElem!(name, i)}></i>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default MultiInput;

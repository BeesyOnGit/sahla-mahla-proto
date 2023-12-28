import { inputType } from "../../MiddleWear/ClientInterface";
import { requiredMap } from "./Inputs";
import "./Inputs.css";
import { useEffect, useRef, useState } from "react";

function MultiInput(props: inputType) {
    const { multiValues, removeElem, addElemToListe, multipleLimit, required, className, ...otherPpops } = props;
    const { name } = otherPpops;
    const ref = useRef<HTMLInputElement>(null);
    const refIcon = useRef<HTMLDivElement>(null);
    const [keyPressTrigger, setKeyPressTrigger] = useState<boolean>(false);

    useEffect(() => {
        if (!keyPressTrigger) {
            return;
        }
        const eventListen: any = document.addEventListener("keypress", (ev) => {
            if (ev.key == "Enter") {
                ev.preventDefault();
                // console.log(ev.key);
            }
            if (ev.key == "Enter" && keyPressTrigger) {
                // ev.preventDefault();
                // console.log("entered");

                refIcon.current?.click();
                return removeEventListener("keypress", eventListen);
            }
        });
        () => {
            return removeEventListener("keypress", eventListen);
        };
    }, [keyPressTrigger]);

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
                <input
                    {...otherPpops}
                    ref={ref}
                    className={className + " " + requiredMap[reqCondition]}
                    onFocus={() => {
                        setKeyPressTrigger(true);
                    }}
                    onBlur={() => {
                        setKeyPressTrigger(false);
                    }}
                />

                <i
                    className="fi fi-sr-square-plus"
                    onClick={() => {
                        execAddElem();
                    }}
                    ref={refIcon}
                ></i>
            </div>
            {Array.isArray(multiValues) && multiValues.length > 0 && (
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
            )}
        </div>
    );
}

export default MultiInput;

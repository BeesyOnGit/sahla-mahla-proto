import { useEffect, useState } from "react";
import "./ComboBox.css";
import "../Inputs/Inputs.css";
import Inputs from "../Inputs/Inputs";
import { inputType } from "../../MiddleWear/ClientInterface";

export type ComboBoxType = inputType & {
    options: { label: string; value: any }[];
    comboContent?: { label: string; value: any };
};

function ComboBox(props: ComboBoxType) {
    const {
        options,
        onComboChange,
        name,
        nonce,
        className,
        containerClass,
        comboContent: content,
        multiple,
        multiValues,
        removeElem,
        comboContainerClass,
        ...rest
    } = props;
    const [inputRes, setInputRes] = useState<{ label: string; value: any }>({ label: content?.label || "", value: content?.value || "" });

    const [optionsDisp, setOptionsDisps] = useState<boolean>(false);

    // const principalRef = useRef<HTMLInputElement>(null);
    // const secRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputRes({ label: content?.label || "", value: content?.value || "" });
    }, [content]);

    const setInputs = (label: string, value: any) => {
        setInputRes({ label, value });
        if (nonce) {
            multiple && setInputRes({ label: "", value: "" });
            return onComboChange!({ name, nonce, value, label });
        }
        multiple && setInputRes({ label: "", value: "" });
        return onComboChange!({ name, value, label });
    };

    const filteredChoices = () => {
        if (!inputRes.label) {
            return options;
        }
        return options.filter((opt) => opt.label.includes(inputRes.label));
    };

    const changeOptVisibility = () => {
        return setTimeout(() => {
            return setOptionsDisps((st) => !st);
        }, 300);
    };
    // !inputRes.label;
    const filterCombo = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setInputRes({ ...inputRes, label: e.target.value.toLowerCase() });
    };

    return (
        <div className={comboContainerClass + " comboGeneralContainer"}>
            <Inputs
                {...rest}
                containerClass={"selectInp " + containerClass}
                className={className + " selectInp"}
                type="texte"
                value={inputRes.label ? inputRes.label : ""}
                // ref={principalRef}
                onChange={filterCombo}
                onBlur={() => {
                    changeOptVisibility();
                }}
                onFocus={() => {
                    changeOptVisibility();
                }}
            />
            {multiple && multiValues!.length > 0 ? (
                <div className="MultiInputSelectedShow">
                    {multiValues?.map((elem: any, i) => {
                        return (
                            <div key={i} className="multiInputSelectedElem">
                                <div> {elem} </div>
                                <i className="fi fi-sr-cross-circle" onClick={() => removeElem!(name, i)}></i>
                            </div>
                        );
                    })}
                </div>
            ) : null}

            {optionsDisp ? (
                <section className="optSection customScroll">
                    {filteredChoices().map((opt, i) => {
                        const { label: lab, value } = opt;
                        return (
                            <div className="opts" key={i} onClick={() => setInputs(lab, value)}>
                                {lab}
                            </div>
                        );
                    })}
                    {/* <div className="opts" key={250}></div> */}
                </section>
            ) : null}
        </div>
    );
}

export default ComboBox;

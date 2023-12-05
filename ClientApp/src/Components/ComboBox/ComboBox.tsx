import { useEffect, useState } from "react";
import "./ComboBox.css";
import Inputs from "../Inputs/Inputs";
import { InputType } from "../../MiddleWear/ClientInterface";

export type ComboBoxType = InputType & {
    options: { label: string; value: any }[];
    comboContent?: { label: string; value: any };
};

function ComboBox(props: ComboBoxType) {
    const { options, onComboChange, name, nonce, className, containerClass, comboContent: content, ...rest } = props;
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
            return onComboChange!({ name, nonce, value, label });
        }
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
        return setInputRes({ ...inputRes, label: e.target.value });
    };

    return (
        <div className={containerClass + " comboGeneralContainer"}>
            <Inputs
                {...rest}
                containerClass="selectInp"
                className={className + "selectInp"}
                type="text"
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

            {optionsDisp ? (
                <section className="optSection noscroll">
                    {filteredChoices().map((opt, i) => {
                        const { label: lab, value } = opt;
                        return (
                            <>
                                <div className="opts" key={i} onClick={() => setInputs(lab, value)}>
                                    {lab}
                                </div>
                            </>
                        );
                    })}
                    <div className="opts" key={250}></div>
                </section>
            ) : null}
        </div>
    );
}

export default ComboBox;

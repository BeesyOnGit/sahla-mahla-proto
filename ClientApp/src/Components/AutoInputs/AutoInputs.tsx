import { FormEventHandler } from "react";
import MultiInput from "../Inputs/MultiInput";
import Inputs from "../Inputs/Inputs";
import Separation from "../Separation/Separation";
import { InputType } from "../../MiddleWear/ClientInterface";
import "./AutoInputs.css";
import Button from "../Button/Button";
import ComboBox from "../ComboBox/ComboBox";
import FileInput from "../FileInput/FileInput";

function AutoInputs({
    inputsArr,
    onSubmit,
    children,
}: {
    inputsArr: Array<InputType> | Array<InputType[]>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children?: any;
}) {
    return (
        <form className="inputsShowDiv" onSubmit={onSubmit}>
            {inputsArr.map((e, i) => {
                if (Array.isArray(e)) {
                    return (
                        <div>
                            {e.map((elem, i) => {
                                const { inputType, onChange, ...rest } = elem;

                                return componentsMap[inputType!]({ ...rest, onChange: onChange, key: i });
                            })}
                        </div>
                    );
                }
                const { inputType, onChange, ...rest } = e;

                return componentsMap[inputType!]({ ...rest, onChange: onChange, key: i });
            })}
            {children ? children : null}
        </form>
    );
}

const componentsMap: any = {
    separation: Separation,
    multi: MultiInput,
    regular: Inputs,
    button: Button,
    combo: ComboBox,
    fileInp: FileInput,
};

export default AutoInputs;

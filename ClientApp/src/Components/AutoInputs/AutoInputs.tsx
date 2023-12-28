import { FormEventHandler } from "react";
import MultiInput from "../Inputs/MultiInput";
import Inputs from "../Inputs/Inputs";
import Separation from "../Separation/Separation";
import { inputType } from "../../MiddleWear/ClientInterface";
import "./AutoInputs.css";
import Button from "../Button/Button";
import ComboBox from "../ComboBox/ComboBox";
import FileInput from "../FileInput/FileInput";
import UploadImage from "../ImageUploadComp/UploadImage";

function AutoInputs({
    inputsArr,
    onSubmit,
    children,
    className,
}: {
    inputsArr: Array<inputType | inputType[]>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children?: any;
    className?: string;
}) {
    return (
        <form className={"inputsShowDiv " + className} onSubmit={onSubmit}>
            {inputsArr.map((e, i) => {
                if (Array.isArray(e)) {
                    return (
                        <div className={e[0].containerClass}>
                            {e.map((elem, i) => {
                                const { inputType, onChange, ...rest } = elem;

                                return componentsMap[inputType!] ? componentsMap[inputType!]({ ...rest, onChange: onChange, key: i }) : null;
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
    imgInput: UploadImage,
};

export default AutoInputs;

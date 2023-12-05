import { InputType } from "../../MiddleWear/ClientInterface";
import Button from "../Button/Button";
import "./FileInput.css";
import { useRef } from "react";

function FileInput(props: InputType) {
    const { content, icon, className, value, ...rest } = props;
    const ref: React.LegacyRef<HTMLInputElement> = useRef(null);
    const val: any = value ? value : "";

    const click = () => {
        ref.current!.click();
    };
    return (
        <div className={"fileInputGeneralContainer " + className}>
            <Button
                content={content!}
                icon={icon}
                className="button"
                type="button"
                onClick={() => {
                    click();
                }}
            />
            <input className="inputFileCl" ref={ref} {...rest} type="file" />
            {value ? <img src={val} className="previewImgInp" /> : null}
        </div>
    );
}

export default FileInput;

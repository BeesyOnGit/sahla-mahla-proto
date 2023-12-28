import { inputType } from "../../MiddleWear/ClientInterface";
import Button from "../Button/Button";
import "./FileInput.css";
import { useEffect, useRef } from "react";

function FileInput(props: inputType) {
    const { content, icon, className, value, ...rest } = props;
    const ref: React.LegacyRef<HTMLInputElement> = useRef(null);
    const val: any = value ? value : "";

    const click = () => {
        ref.current!.click();
    };

    useEffect(() => {}, [ref.current]);

    return (
        <div className={"fileInputGeneralContainer " + className}>
            <Button
                content={content!}
                icon={icon}
                className="pagesNavButton"
                type="button"
                onClick={() => {
                    click();
                }}
            />
            <input className="inputFileCl" ref={ref} {...rest} type="file" />
            {val && (
                <div className="inputFileIconsCont">
                    <i className="fi fi-sr-memo-circle-check inpIcon"></i>
                    <span> {ref.current?.value.split("fakepath")[ref.current?.value.split("fakepath").length - 1]} </span>
                </div>
            )}
        </div>
    );
}

export default FileInput;

import React, { useState } from "react";
import { randomIdGenerator } from "../../MiddleWear/ClientFunctions";
import LazyImage from "../LazyImage/LazyImage";
import "./UploadImage.css";
import { inputType } from "../../MiddleWear/ClientInterface";

function UploadImage(props: inputType) {
    const { className, containerClass, icon, onChange, value, placeholder, ...restProps } = props;

    // const [mediaArr, setMediaArr] = useState([]);
    const [uploadWait, setUploadWait] = useState<boolean>(false);

    const id = randomIdGenerator(6);

    const uploadClick = () => {
        const button = document.getElementById(id);
        button?.click();
    };

    return (
        <div className={containerClass} onClick={() => uploadClick()}>
            <input style={{ display: "none" }} type="file" id={id} onChange={onChange} {...restProps} />
            {value ? (
                <img className={"imageUploadeImageDisp " + className} src={value.toString()} />
            ) : (
                <div className={"placehoderImageUpload " + className}>
                    <i className={(icon ? icon : "fi fi-sr-images") + " uploadIconUploadImage"}></i>
                    <span className="labelSpanUploadImage"> {placeholder} </span>
                </div>
            )}
        </div>
    );
}

export default UploadImage;

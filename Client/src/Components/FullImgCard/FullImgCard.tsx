import React from "react";
import "./FullImgCard.css";
import LazyImage from "../LazyImage/LazyImage";

export type fullImgCard = React.HTMLAttributes<HTMLDivElement> & {
    src: string;
    title?: string;
};

function FullImgCard({ src, title, className, onClick }: fullImgCard) {
    return (
        <LazyImage className={"fullImgCardDivContainer " + className} src={src} onClick={onClick}>
            {title && <div className="fullImgCardDivTitle"> {title} </div>}
        </LazyImage>
        // <div className={"fullImgCardDivContainer " + className} onClick={onClick ? onClick : () => {}}>

        //     <img src={src} className="fullImgCardFullImage" loading="lazy" />
        // </div>
    );
}

export default FullImgCard;

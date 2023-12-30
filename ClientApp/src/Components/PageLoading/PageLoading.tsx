import React from "react";
import "./PageLoading.css";

function PageLoading({ style }: { style?: React.CSSProperties }) {
    return (
        <div className="wrapperLoading" style={style ? style : {}}>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>
    );
}

export default PageLoading;

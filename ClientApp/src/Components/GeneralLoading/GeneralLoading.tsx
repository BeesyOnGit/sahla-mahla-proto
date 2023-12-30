import React, { CSSProperties } from "react";
import "./GeneralLoading.css";

interface LoadingType {
    customStyle?: CSSProperties;
    customLoadingStyle?: CSSProperties;
}

function GeneralLoading(props: LoadingType) {
    const { customStyle, customLoadingStyle } = props;
    // const App = document.getElementsByClassName("App")[0];
    // App ? App.scrollTo(0, 0) : null;
    return (
        <div className="LoaderContainer" style={customStyle ? customStyle : undefined}>
            <div className="GenraLloader" style={customLoadingStyle ? customLoadingStyle : undefined}></div>
        </div>
    );
}

export default GeneralLoading;

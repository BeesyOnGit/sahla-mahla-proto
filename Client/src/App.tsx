import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { setTheme, useWindowDimensions } from "./MiddleWear/ClientFunctions";
import { Contexts } from "./Contexts/Contexts";

function App() {
    const { initialLanguage, initialDkMode, setAlertHandler, darkMode } = Contexts();

    const [navOpDisplay, setNavOpDisplay] = useState(false);

    const dimentions = useWindowDimensions();

    setTheme(JSON.parse(darkMode));
    const style: React.CSSProperties = {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div className="AppContainer" style={style}>
            {" "}
            <h1>New App</h1>
        </div>
    );
}

export default App;

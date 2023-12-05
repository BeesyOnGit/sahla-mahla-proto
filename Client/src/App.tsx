import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { setTheme, useWindowDimensions } from "./MiddleWear/ClientFunctions";
import { Contexts } from "./Contexts/Contexts";
import Navbar from "./Components/Navbar/NavbarDesktop";
import NavbarMobil from "./Components/Navbar/NavbarMobil";
import Home from "./Pages/Home/Home";

function App() {
    const { initialLanguage, initialDkMode, setAlertHandler, darkMode } = Contexts();

    const [navOpDisplay, setNavOpDisplay] = useState(false);

    const dimentions = useWindowDimensions();
    const { width } = dimentions;

    setTheme(JSON.parse(darkMode));

    return (
        <div className="AppContainer noscroll">
            {width! >= 481 ? <Navbar /> : <NavbarMobil />}
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;

import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { setTheme, useWindowDimensions } from "./MiddleWear/ClientFunctions";
import { Contexts } from "./Contexts/Contexts";
import Navbar from "./Components/Navbar/NavbarDesktop";
import NavbarMobil from "./Components/Navbar/NavbarMobil";
import Home from "./Pages/Home/Home";
import { isScroll } from "./MiddleWear/Signals";
import Footer from "./Components/Footer/Footer";

function App() {
    const { initialLanguage, initialDkMode, setAlertHandler, darkMode } = Contexts();

    const [navOpDisplay, setNavOpDisplay] = useState(false);

    const dimentions = useWindowDimensions();
    const { width } = dimentions;

    setTheme(JSON.parse(darkMode));

    const updateScroll = () => {
        const Page = document.getElementsByClassName("AppContainer")[0];
        const { scrollTop } = Page;
        if (scrollTop > 0) {
            return (isScroll.value = true);
        }
        return (isScroll.value = false);
    };

    return (
        <div
            className="AppContainer noscroll"
            onScroll={() => {
                updateScroll();
            }}
        >
            {width! >= 481 ? <Navbar /> : <NavbarMobil />}
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

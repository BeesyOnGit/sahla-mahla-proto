import React from "react";
import "./Home.css";
import { HomeLang } from "./HomeLang";
import { Contexts } from "../../Contexts/Contexts";
import Inputs from "../../Components/Inputs/Inputs";
function Home() {
    const { userLang } = Contexts();
    return (
        <div className="homePageDivGeneralContainer">
            <img className="homePageImgLeft" src="/proWomanHome.webp" loading="lazy" alt="" />
            <section className="homePageSectionContainer">
                <div className="homePageDivTextContainer">
                    <span> {HomeLang[userLang].intro} </span> <span className="spanColor"> {HomeLang[userLang].keywordFreelance} </span>
                    <span> {HomeLang[userLang].phrase} </span> <span className="spanColor"> {HomeLang[userLang].keywordHighlight} </span>
                    <span> {HomeLang[userLang].ending} </span>
                </div>
                <Inputs
                    className="homePageInputs"
                    containerClass="inpCont"
                    placeholder={HomeLang[userLang].inputPlaceHolder}
                    innerInputIcon="fi fi-br-search largIcon"
                />
            </section>
        </div>
    );
}

export default Home;

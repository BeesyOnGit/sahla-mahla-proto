import React from "react";
import { Contexts } from "../../Contexts/Contexts";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { FooterLang } from "./FooterLang";

function Footer() {
    const { userLang } = Contexts();
    const currentYear = new Date().getFullYear();
    const nextYear = new Date().getFullYear() + 1;
    const navigate = useNavigate();
    return (
        <div className="FooterGeneralContainer">
            <svg>
                <clipPath id="footerClip">
                    {/* <g  id="N9aqCeIEaL9j1nNn6lN4u"> */}
                    <path
                        style={{ minWidth: "500px" }}
                        transform="matrix(1 0 0 1 600 350) scale(3)"
                        fill="#000000"
                        d="M -319.78036 -46.33438 C -319.78036 -46.33438 -214.67240999999996 -103.90559 -105.28710999999998 -98.14847 C 4.09820000000002 -92.39135 58.790850000000006 -51.131980000000006 170.09520000000003 -46.33438 C 281.39955000000003 -41.53678 319.78036000000003 -58.80814 319.78036000000003 -58.80814 L 319.78036000000003 98.55318 L -319.7803599999999 98.55318 z"
                    />
                    {/* </g> */}
                </clipPath>
            </svg>
            <div className="FooterCOntainer">
                <section
                    className="logoSection"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <div></div>
                    <img className="logoFooter" src="/logo.webp" loading="lazy" />
                </section>

                <section className="FooterInformationSection">
                    <div className="FotterLinks" onClick={() => navigate("/freelance")}>
                        {FooterLang[userLang].becomFreelance}
                    </div>
                    <div className="FotterLinks" onClick={() => navigate("/")}>
                        {FooterLang[userLang].clientPage}
                    </div>
                    <div className="FotterLinks" onClick={() => navigate("/resources")}>
                        {FooterLang[userLang].resourcesPage}
                    </div>
                    <div className="FotterLinks" onClick={() => navigate("/sahla-Pro")}>
                        {FooterLang[userLang].sahlaBusiness}
                    </div>
                    <div className="FotterLinks" onClick={() => navigate("/privacy-policy")}>
                        {FooterLang[userLang].pc}
                    </div>
                    <div className="FotterLinks" onClick={() => navigate("/general-user-agreement")}>
                        {FooterLang[userLang].gua}
                    </div>
                </section>

                <section className="FooterSocialsSection">
                    <a className="socialelem">
                        <i className="FooterIcons fi fi-brands-facebook" id="fbIc"></i>
                        <div className="SocialName">Sahla&Mahla</div>
                    </a>
                    <a className="socialelem">
                        <i className="FooterIcons fi fi-brands-instagram" id="instaIc"></i>
                        <div className="SocialName">Sahla&Mahla</div>
                    </a>
                    <a className="socialelem">
                        <i className="FooterIcons fi fi-brands-linkedin" id="LinkedIc"></i>
                        <div className="SocialName">Sahla&Mahla</div>
                    </a>
                    <a className="socialelem">
                        <i className="FooterIcons fi fi-brands-twitter-alt-circle" id="LinkedIc"></i>
                        <div className="SocialName">Sahla&Mahla</div>
                    </a>
                </section>
            </div>
            <div className="copyWriteDiv ">
                <span>{FooterLang[userLang].copywrite}</span>
                <div className="footerYearDiv ">
                    <span>{currentYear}</span>-<span>{nextYear}</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;

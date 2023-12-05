import React, { useState } from "react";
import "./NavbarMobil.css";
import { useNavigate } from "react-router-dom";
import { navElementsType } from "./NavFunctions";
import { Contexts } from "../../Contexts/Contexts";
import { DarkmodeActiv, DarkmodeInActiv, langar, langfr } from "./NavbarDesktop";

function NavbarMobil(props: any) {
    const { userLang, darkMode, switchDkMode, switchLanguage } = Contexts();

    const [navVisibility, setNavVisibility] = useState(false);

    const navigate = useNavigate();

    const changeNavVisibility = () => {
        setNavVisibility(!navVisibility);
    };

    const displayNav = { true: " navVisible", false: " navInvisible" };

    return (
        <div className="mobilNavGeneralContainer">
            <nav className="headerLogoMobil">
                <div className="logoMobil" onClick={() => navigate("/")}>
                    <svg className="logoMobil">
                        <use xlinkHref={"/lebonchoix_Logo.svg#siteLogo"} />
                    </svg>
                </div>
                <div className="menuIconMobil" onClick={() => changeNavVisibility()}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </nav>

            <section className={"mobilNavOptions " + displayNav[`${navVisibility}`]}>
                <nav className="headerLogoMobil">
                    <div
                        className="logoMobil"
                        onClick={() => {
                            navigate("/"), setNavVisibility(false);
                        }}
                    >
                        <svg className="logoMobil">
                            <use xlinkHref={"/lebonchoix_Logo.svg#siteLogo"} />
                        </svg>
                    </div>
                    <div className="menuIconMobil" onClick={() => changeNavVisibility()}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </nav>
                <div className="NavoptionsElemsDKMobil">
                    <i className={"iconsDkMode fa-solid fa-moon " + DarkmodeActiv[`${darkMode}`]} onClick={() => switchDkMode("true")}></i>
                    <i className={"iconsDkMode fa-solid fa-sun " + DarkmodeInActiv[`${darkMode}`]} onClick={() => switchDkMode("false")}></i>
                </div>
                <div className="NavoptionsElemsDKMobil">
                    <div className={"iconsDkMode " + langfr[`${userLang}`]} onClick={() => switchLanguage("fr")}>
                        Français
                    </div>
                    <div className={"iconsDkMode " + langar[`${userLang}`]} onClick={() => switchLanguage("ar")}>
                        العربية
                    </div>
                </div>
                {/* {navElems
                    ? navElems.map((elem: navElementsType) => {
                          const { type, name, icon, navigation, classN, onClick } = elem;

                          if (type == "button") {
                              return (
                                  <div
                                      className={"NavElemsButtonComp " + userLang}
                                      onClick={() => {
                                          navigate(navigation!), setNavVisibility(false), onClick(1);
                                      }}
                                  >
                                      <i className={icon + " " + (classN ? classN : "")}></i>
                                      <span className={classN ? classN : ""}> {name} </span>
                                  </div>
                              );
                          }
                          if (type == "separation") {
                              return (
                                  <Sectioncomponent icon={icon!} title={name!}>
                                      {null}
                                  </Sectioncomponent>
                              );
                          }

                          if (["autres", "categories"].includes(type)) {
                              return (
                                  <div
                                      className={"NavElemsRegularComp " + userLang}
                                      onClick={() => {
                                          navigate(navigation!), setNavVisibility(false);
                                      }}
                                  >
                                      {name}
                                  </div>
                              );
                          }
                          return <div></div>;
                      })
                    : null} */}
            </section>
            {navVisibility ? <div className="mobilNavOverlay"></div> : null}
        </div>
    );
}

export default NavbarMobil;

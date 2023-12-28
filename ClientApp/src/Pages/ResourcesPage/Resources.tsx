import React, { useEffect, useState } from "react";
import "./Resources.scss";
import { Contexts } from "../../Contexts/Contexts";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { resourcesLang } from "./ResourcesLang";
import {
    URLSearchAdd,
    URLSearchParse,
    URLSearchremove,
    generalGetFunction,
    pathWithoutParam,
    randomArrLength,
} from "../../MiddleWear/ClientFunctions";
import Inputs from "../../Components/Inputs/Inputs";
import CategoriesSelect from "../../Components/CategoriesSelect/CategoriesSelect";
import Skuleton from "../../Components/Skuleton/Skeleton";
import { getCategoriesApi } from "../../MiddleWear/ApiMiddleWear";
import { LibraryLang } from "../Library/LibraryLang";
import { OnChangeEventType } from "../../MiddleWear/ClientInterface";

function Resources() {
    const { userLang, setNewAlert, refreshApp } = Contexts();
    const navigate = useNavigate();

    const [categeories, setCategories] = useState<number[] | null>(null);

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname.split("/").length == 2) {
            navigate("owned");
        }
    }, [pathname]);

    useEffect(() => {
        getResCategories();
    }, []);

    const getResCategories = () => {
        generalGetFunction({
            endPoint: getCategoriesApi(),
            successCode: "S51",
            setNewAlert,
            setState: setCategories,
            refresh: refreshApp,
        });
    };

    const selectedNav = (name: string) => {
        const path = pathWithoutParam(3);
        if (name == path) {
            return "pagesNavSelected";
        }
        return "";
    };

    const ImSelected = (category: number) => {
        const { resourceType } = URLSearchParse() || {};
        return resourceType == category ? "selectedCateg" : "";
    };

    const toggleCategory = (categeory: number) => {
        const { resourceType } = URLSearchParse() || {};
        if (resourceType == categeory) {
            return URLSearchremove(navigate, "resourceType");
        }
        URLSearchremove(navigate, "resourceType");
        URLSearchAdd(navigate, { resourceType: categeory });
    };

    const beginSearch = (event: OnChangeEventType) => {
        const currSearch = URLSearchParse();

        const { search } = currSearch || {};

        const timeOut = setTimeout(() => {
            const val = event.target.value;
            if (!val) {
                URLSearchremove(navigate, "search");
                return;
            }
            if (search) {
                URLSearchremove(navigate, "search");
            }
            URLSearchAdd(navigate, { search: val });
            clearTimeout(timeOut);
        }, 500);
    };
    return (
        <section className="resourcesPageGeneralContainer">
            <div className="overLcontainer resourceOverL">
                <Button
                    className={"pagesNavButton " + selectedNav("/resources/owned")}
                    icon="fi fi-sr-copy-image"
                    content={resourcesLang[userLang].myResources}
                    onClick={() => {
                        navigate("owned");
                    }}
                />
                <Button
                    className={"pagesNavButton " + selectedNav("/resources/selling")}
                    icon="fi fi-sr-money-bills"
                    content={resourcesLang[userLang].sellingResources}
                    onClick={() => {
                        navigate("selling");
                    }}
                />
                <Button
                    className={"pagesNavButton " + selectedNav("/resources/add")}
                    icon="fi fi-sr-square-plus"
                    content={resourcesLang[userLang].addResourceNav}
                    onClick={() => {
                        navigate("add");
                    }}
                />
            </div>
            {pathname != "/resources/add" && (
                <>
                    <div className="searchContainer">
                        <Inputs
                            containerClass="searchInpParent"
                            className="searchInpLib"
                            innerInputIcon="fi fi-br-search"
                            placeholder={LibraryLang[userLang].search}
                            onChange={beginSearch}
                        />
                    </div>
                    <div className="libCategoriesContainer">
                        <div> {LibraryLang[userLang].categories[0]} </div>
                        {categeories
                            ? categeories.map((category, i) => {
                                  return (
                                      <CategoriesSelect
                                          key={i}
                                          className={"categoriesElemsStyle " + ImSelected(category)}
                                          category={LibraryLang[userLang].categories[category]}
                                          onClick={() => toggleCategory(category)}
                                      />
                                  );
                              })
                            : randomArrLength(5, 10).map((e, i) => {
                                  return <Skuleton key={i} style={{ width: "6%", height: "1.7rem", borderRadius: "var(--roundRadius)" }} />;
                              })}
                    </div>
                </>
            )}
            <Outlet />
        </section>
    );
}

export default Resources;

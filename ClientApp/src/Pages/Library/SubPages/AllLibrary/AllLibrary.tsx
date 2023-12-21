import { useEffect, useState } from "react";
import "./AllLibrary.scss";
import {
    URLSearchAdd,
    URLSearchParse,
    URLSearchremove,
    generalGetFunction,
    randomArrLength,
    useWindowDimensions,
} from "../../../../MiddleWear/ClientFunctions";
import { getCategoriesApi, getResourcesApi, likeBookResourceApi } from "../../../../MiddleWear/ApiMiddleWear";
import { Contexts } from "../../../../Contexts/Contexts";
import { OnChangeEventType } from "../../../../MiddleWear/ClientInterface";
import { useLocation, useNavigate } from "react-router-dom";
import Inputs from "../../../../Components/Inputs/Inputs";
import CategoriesSelect from "../../../../Components/CategoriesSelect/CategoriesSelect";
import { LibraryLang } from "../../LibraryLang";
import Skuleton from "../../../../Components/Skuleton/Skeleton";
import { resourcesType } from "../../../../../../Serveur/App/Models/Resources";
import FullpageIcon from "../../../../Components/FullPageIcon/FullpageIcon";
import ResourcesCard from "../../../../Components/ResourcesCard/ResourcesCard";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";

function AllLibrary() {
    const { userLang, refreshApp, setNewAlert, refresh } = Contexts();

    const navigate = useNavigate();

    const { search } = useLocation();
    const { width } = useWindowDimensions();

    const [categeories, setCategories] = useState<number[] | null>(null);
    const [resources, setResources] = useState<resourcesType[] | null | "empty">(null);

    const containerWidth = document.getElementsByClassName("resourcesContainer")[0];
    let elemsN = Math.floor(containerWidth?.clientWidth / 310);

    useEffect(() => {
        getResCategories();
    }, []);

    useEffect(() => {
        getResources();
    }, [search, refresh]);

    const getResources = () => {
        generalGetFunction({
            endPoint: getResourcesApi(search),
            setState: setResources,
            successCode: "S34",
            emptyCode: "E33",
            setNewAlert,
            silent: true,
        });
    };
    const likeBookResource = (id: string, type: string) => {
        generalGetFunction({
            endPoint: likeBookResourceApi(id, type),
            // setState: setResources,
            successCode: "S32",
            refresh: refreshApp,
            setNewAlert,
            silent: true,
        });
    };

    const getResCategories = () => {
        generalGetFunction({
            endPoint: getCategoriesApi(),
            successCode: "S51",
            setNewAlert,
            setState: setCategories,
            refresh: refreshApp,
        });
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

    return (
        <section className="allLibContainer">
            <div className="resourcesContainer">
                <GridMapper
                    toMap={resources}
                    Component={ResourcesCard}
                    emptyString={LibraryLang[userLang].noResources}
                    emptyIcon="fi fi-br-image-slash"
                    otherProps={{ likeFunc: likeBookResource }}
                />
            </div>
            <div>
                <div className="searchContainer">
                    <Inputs
                        containerClass="searchInpParent"
                        className="searchInpLib"
                        // innerInputIcon="fi fi-br-search"
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
            </div>

            {/* <div
                className="resourcesContainer customScroll"
                style={resources != "empty" ? { display: "grid", gridTemplateColumns: `repeat(${elemsN},1fr)` } : {}}
            >
                {Array.isArray(resources) ? (
                    resources.map((resource, i) => {
                        return <ResourcesCard likeFunc={likeBookResource} {...resource} key={i} />;
                    })
                ) : resources == "empty" ? (
                    <FullpageIcon icon="fi fi-br-image-slash" texte={LibraryLang[userLang].noResources} />
                ) : (
                    randomArrLength(10, 17).map((e, i) => {
                        return <ResourcesCard key={i} skull={true} />;
                    })
                )}
            </div> */}
        </section>
    );
}

export default AllLibrary;

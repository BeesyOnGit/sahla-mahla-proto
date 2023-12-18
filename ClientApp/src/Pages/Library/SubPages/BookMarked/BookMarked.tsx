import React, { useEffect, useRef, useState } from "react";
import "./BookMarked.scss";
import "../AllLibrary/AllLibrary.scss";
import Button from "../../../../Components/Button/Button";
import { LibraryLang } from "../../LibraryLang";
import { Contexts } from "../../../../Contexts/Contexts";
import {
    URLSearchAdd,
    URLSearchParse,
    URLSearchremove,
    generalGetFunction,
    randomArrLength,
    useWindowDimensions,
} from "../../../../MiddleWear/ClientFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { getResourcesApi, likeBookResourceApi } from "../../../../MiddleWear/ApiMiddleWear";
import { resourcesType } from "../../../../../../Serveur/App/Models/Resources";
import ResourcesCard from "../../../../Components/ResourcesCard/ResourcesCard";
import FullpageIcon from "../../../../Components/FullPageIcon/FullpageIcon";
import Skuleton from "../../../../Components/Skuleton/Skeleton";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";

function BookMarked() {
    const { userLang, setNewAlert, refreshApp, refresh } = Contexts();

    const { type } = URLSearchParse() || {};
    const { search } = useLocation();

    const [resources, setResources] = useState<resourcesType[] | null | "empty">(null);

    const navigate = useNavigate();

    const { width } = useWindowDimensions();

    const ref = useRef<HTMLDivElement>(null);
    const containerWidth = document.getElementsByClassName("resourcesContainer")[0];

    let elemsN = Math.floor(containerWidth?.clientWidth / 310);

    useEffect(() => {
        if (!type) {
            URLSearchAdd(navigate, { type: "bookmarks" });
            refreshApp();
        }
    });
    useEffect(() => {
        if (type) {
            getResources();
        }
    }, [refresh, type]);

    const getResources = () => {
        generalGetFunction({
            endPoint: getResourcesApi(search),
            setState: setResources,
            successCode: "S34",
            emptyCode: "E33",
            refresh: refreshApp,
            setNewAlert,
            silent: true,
        });
    };
    const likeBookResource = (id: string, type: string) => {
        generalGetFunction({
            endPoint: likeBookResourceApi(id, type),
            successCode: "S32",
            refresh: refreshApp,
            setNewAlert,
            silent: true,
        });
    };

    const ImSelected = (category: string) => {
        return type == category ? "pagesNavSelected" : "";
    };
    const togglebooked = (categeory: string) => {
        setResources(null);
        if (type == categeory) {
            return URLSearchremove(navigate, "type");
        }
        URLSearchremove(navigate, "type");
        URLSearchAdd(navigate, { type: categeory });
    };

    const emptyIconMap: any = {
        bookmarks: LibraryLang[userLang].noFavorit,
        likes: LibraryLang[userLang].noLiked,
    };
    return (
        <section className="bookMarkGeneralContainer">
            <div>
                <Button
                    className={"pagesNavButton " + ImSelected("bookmarks")}
                    icon="fi fi-sr-bookmark"
                    content={LibraryLang[userLang].resourceCard.bookMark}
                    onClick={() => togglebooked("bookmarks")}
                />

                <Button
                    className={"pagesNavButton " + ImSelected("likes")}
                    icon="fi fi-sr-heart"
                    content={LibraryLang[userLang].resourceCard.likes}
                    onClick={() => togglebooked("likes")}
                />
            </div>
            {/* <div
                ref={ref}
                className="resourcesContainer customScroll bookeMarkedResources"
                style={resources != "empty" ? { display: "grid", gridTemplateColumns: `repeat(${elemsN},1fr)` } : {}}
            >
                {Array.isArray(resources) ? (
                    resources.map((resource, i) => {
                        return <ResourcesCard likeFunc={likeBookResource} {...resource} key={i} />;
                    })
                ) : resources == "empty" ? (
                    <FullpageIcon icon="fi fi-br-image-slash" texte={emptyIconMap[`${type}`]} />
                ) : (
                    randomArrLength(10, 17).map((e, i) => {
                        return <ResourcesCard key={i} skull={true} />;
                    })
                )}
            </div> */}
            <div className="bookmarkGrodContainer">
                <GridMapper
                    toMap={resources}
                    Component={ResourcesCard}
                    emptyString={emptyIconMap[`${type}`]}
                    emptyIcon="fi fi-br-image-slash"
                    otherProps={{ likeFunc: likeBookResource }}
                />
            </div>
        </section>
    );
}

export default BookMarked;

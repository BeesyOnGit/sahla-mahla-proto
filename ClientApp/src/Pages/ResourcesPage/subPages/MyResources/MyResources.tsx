import React, { useEffect, useState } from "react";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";
import { Contexts } from "../../../../Contexts/Contexts";
import { resourcesType } from "../../../../../../Serveur/App/Models/Resources";
import ResourcesCard from "../../../../Components/ResourcesCard/ResourcesCard";
import { resourcesLang } from "../../ResourcesLang";
import { URLSearchParse, generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
import { getMyResourcesApi, likeBookResourceApi } from "../../../../MiddleWear/ApiMiddleWear";
import { useLocation } from "react-router-dom";

function MyResources() {
    const { userLang, setNewAlert, refreshApp, refresh } = Contexts();

    const [resources, setResources] = useState<resourcesType[] | null | "empty">(null);

    const { search } = useLocation();
    const { page } = URLSearchParse();

    useEffect(() => {
        if (!search.includes("page")) {
            getResources();
        }
    }, [refresh, search]);

    useEffect(() => {
        if (page && parseInt(page) > 1) {
            getResourcesPage();
        }
    }, [page]);

    const getResources = () => {
        generalGetFunction({
            endPoint: getMyResourcesApi(search, "owned"),
            setState: setResources,
            successCode: "S34",
            emptyCode: "E33",
            setNewAlert,
            silent: true,
        });
    };
    const getResourcesPage = () => {
        generalGetFunction({
            endPoint: getMyResourcesApi(search, "owned"),
            setState: addToState,
            successCode: "S34",
            emptyCode: "",
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

    const addToState = (data: any[]) => {
        if (Array.isArray(resources)) {
            setResources([...resources, ...data]);
        }
    };
    return (
        <div className="ownedResGenContainer">
            {
                <GridMapper toMap={resources} emptyString={resourcesLang[userLang].noResourcesOwned} emptyIcon="fi fi-br-image-slash">
                    <ResourcesCard likeFunc={likeBookResource} />
                </GridMapper>
            }
        </div>
    );
}

export default MyResources;

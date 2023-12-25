import React, { useEffect, useState } from "react";
import "../MyResources/MyResources.scss";
import { Contexts } from "../../../../Contexts/Contexts";
import { resourcesType } from "../../../../../../Serveur/App/Models/Resources";
import { useLocation } from "react-router-dom";
import { generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
import { getMyResourcesApi, likeBookResourceApi } from "../../../../MiddleWear/ApiMiddleWear";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";
import ResourcesCard from "../../../../Components/ResourcesCard/ResourcesCard";
import { resourcesLang } from "../../ResourcesLang";

function SellingResources() {
    const { userLang, setNewAlert, refreshApp, refresh } = Contexts();

    const [resources, setResources] = useState<resourcesType[] | null | "empty">(null);

    const { search } = useLocation();

    useEffect(() => {
        getResources();
    }, [refresh, search]);

    const getResources = () => {
        generalGetFunction({
            endPoint: getMyResourcesApi(search, "selling"),
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
    return (
        <div className="ownedResGenContainer">
            <GridMapper toMap={resources} emptyString={resourcesLang[userLang].noResourcesToSell} emptyIcon="fi fi-br-image-slash">
                <ResourcesCard likeFunc={likeBookResource} />
            </GridMapper>
        </div>
    );
}

export default SellingResources;

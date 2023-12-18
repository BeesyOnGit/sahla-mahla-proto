import React, { useEffect, useState } from "react";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";
import { Contexts } from "../../../../Contexts/Contexts";
import { resourcesType } from "../../../../../../Serveur/App/Models/Resources";
import ResourcesCard from "../../../../Components/ResourcesCard/ResourcesCard";
import { resourcesLang } from "../../ResourcesLang";
import { generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
import { getMyResourcesApi, likeBookResourceApi } from "../../../../MiddleWear/ApiMiddleWear";
import { useLocation } from "react-router-dom";

function MyResources() {
    const { userLang, setNewAlert, refreshApp, refresh } = Contexts();

    const [resources, setResources] = useState<resourcesType[] | null | "empty">(null);

    const { search } = useLocation();

    useEffect(() => {
        getResources();
    }, [refresh, search]);

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
            {
                <GridMapper
                    toMap={resources}
                    Component={ResourcesCard}
                    emptyString={resourcesLang[userLang].noResourcesOwned}
                    emptyIcon="fi fi-br-image-slash"
                    otherProps={{ likeFunc: likeBookResource }}
                />
            }
        </div>
    );
}

export default MyResources;

import React, { useEffect, useState } from "react";
import "../MyResources/MyResources.scss";
import { Contexts } from "../../../../Contexts/Contexts";
import { resourcesType } from "../../../../../../Serveur/App/Models/Resources";
import { useLocation, useNavigate } from "react-router-dom";
import { URLSearchAdd, URLSearchParse, URLSearchremove, generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
import { deleteResourceApi, getMyResourcesApi, likeBookResourceApi } from "../../../../MiddleWear/ApiMiddleWear";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";
import ResourcesCard from "../../../../Components/ResourcesCard/ResourcesCard";
import { resourcesLang } from "../../ResourcesLang";
import Modal from "../../../../Components/Modal/Modal";
import { OrdersLang } from "../../../Orders/OrdersLang";
import Button from "../../../../Components/Button/Button";
import { title } from "process";

function SellingResources() {
    const { userLang, setNewAlert, refreshApp, refresh, apiWait, setApiWait } = Contexts();

    const [resources, setResources] = useState<resourcesType[] | null | "empty">(null);
    const [modalDisp, setModalDisp] = useState<boolean>(false);
    const navigate = useNavigate();

    const { search } = useLocation();

    const { resource, title } = URLSearchParse();

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

    const cancelModal = () => {
        setModalDisp(false);
        navigate("");
    };

    const confirmResourceDelete = () => {
        if (!resource) {
            return;
        }
        if (apiWait) {
            return;
        }
        setApiWait(true);

        generalGetFunction({
            endPoint: deleteResourceApi(resource),
            successCode: "S33",
            setNewAlert,
            refresh: refreshApp,
            cb: () => {
                URLSearchremove(navigate, resource);
                setApiWait(false);
                setModalDisp(false);
            },
        });
    };

    const deleteResource = (id: string, title: string) => {
        URLSearchAdd(navigate, { resource: id, title });
        setModalDisp(true);
    };
    return (
        <div className="ownedResGenContainer">
            <Modal modalDisp={modalDisp} setModalDisp={setModalDisp}>
                <div className="orderConfirmationContainer">
                    <span> {OrdersLang[userLang].deleteResourceTitle} </span>
                    <span> {title && title} </span>
                    <div>
                        <Button
                            content={OrdersLang[userLang].ordDetail.cancelBut}
                            icon="fi fi-br-cross"
                            className="pagesNavButton pagesNavButtonRed"
                            onClick={() => {
                                cancelModal();
                            }}
                        />
                        <Button
                            content={OrdersLang[userLang].ordDetail.confirmButt}
                            icon="fi fi-br-check"
                            className="pagesNavButton pagesNavSelected"
                            apiButton={true}
                            onClick={() => {
                                confirmResourceDelete();
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <GridMapper toMap={resources} emptyString={resourcesLang[userLang].noResourcesToSell} emptyIcon="fi fi-br-image-slash">
                <ResourcesCard likeFunc={likeBookResource} deleteFunc={deleteResource} />
            </GridMapper>
        </div>
    );
}

export default SellingResources;

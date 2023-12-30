import React, { useEffect, useState } from "react";
import "../../../Projects/subPages/AddOffer/AddOffer.scss";
import "./AddResource.scss";
import { Contexts } from "../../../../Contexts/Contexts";
import { generalAddEditFunction, generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
import { addResourceApi, createProjectApi, getUtilsApi } from "../../../../MiddleWear/ApiMiddleWear";
import AutoInputs from "../../../../Components/AutoInputs/AutoInputs";
import { createEditResourcesInputs } from "../../ResourcesFunctions";
import { resourcesType } from "../../../../../../Serveur/App/Models/Resources";

function AddResource() {
    const { userLang, setNewAlert, refreshApp, apiWait, setApiWait } = Contexts();

    const [resourceForm, setResourceForm] = useState<Partial<resourcesType>>({ resourceType: 2 });
    const [fields, setFields] = useState<any[] | null>(null);

    useEffect(() => {
        getFields();
    }, []);

    const getFields = () => {
        generalGetFunction({
            endPoint: getUtilsApi("freelance-categories"),
            setNewAlert,
            setState: setFields,
            refresh: refreshApp,
            successCode: "S52",
        });
    };

    const submitOffer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (apiWait) {
            return;
        }
        generalAddEditFunction(null, {
            endPoint: addResourceApi(resourceForm),
            successCode: "S31",
            refresh: refreshApp,
            setNewAlert,
            setApiWait,
            apiWait,
            optFunc: () => {
                setResourceForm({});
            },
        });
    };

    const inputs = fields && createEditResourcesInputs({ state: resourceForm, stateSetter: setResourceForm, fields });
    return (
        <section className="addOfferGeenralcontainer customScroll addResformContainer">
            {inputs ? <AutoInputs inputsArr={inputs} onSubmit={submitOffer} className="AddOfferInputsContainer" /> : null}
        </section>
    );
}

export default AddResource;

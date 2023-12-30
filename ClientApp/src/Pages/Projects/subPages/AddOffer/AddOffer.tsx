import React, { useEffect, useState } from "react";
import "./AddOffer.scss";
import { Contexts } from "../../../../Contexts/Contexts";
import { projectType } from "../../../../../../Serveur/App/Models/Project";
import { generalAddEditFunction, generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
import { createProjectApi, getUtilsApi } from "../../../../MiddleWear/ApiMiddleWear";
import { createEditOfferInputs } from "../../ProjectFunctions";
import AutoInputs from "../../../../Components/AutoInputs/AutoInputs";

function AddOffer() {
    const { userLang, setNewAlert, refreshApp, apiWait, setApiWait } = Contexts();

    const [offerForm, setOfferForm] = useState<Partial<projectType>>({});
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
            endPoint: createProjectApi(offerForm),
            successCode: "S61",
            refresh: refreshApp,
            setNewAlert,
            setApiWait,
            apiWait,
            optFunc: () => {
                setOfferForm({});
            },
        });
    };

    const inputs = fields && createEditOfferInputs({ state: offerForm, stateSetter: setOfferForm, fields });
    return (
        <section className="addOfferGeenralcontainer customScroll">
            {inputs ? <AutoInputs inputsArr={inputs} onSubmit={submitOffer} className="AddOfferInputsContainer" /> : null}
        </section>
    );
}

export default AddOffer;

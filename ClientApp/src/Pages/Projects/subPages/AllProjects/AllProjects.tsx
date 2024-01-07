import React, { useEffect, useState } from "react";
import "./AllProjects.scss";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";
import { Contexts } from "../../../../Contexts/Contexts";
import { projectType, submittersListType } from "../../../../../../Serveur/App/Models/Project";
import {
    URLSearchAdd,
    URLSearchParse,
    dateFormater,
    formatAsCurrency,
    generalAddEditFunction,
    generalGetFunction,
} from "../../../../MiddleWear/ClientFunctions";
import { getProjectsApi, getUtilsApi, submitOfferToProjectApi } from "../../../../MiddleWear/ApiMiddleWear";
import { ProjectLang } from "../../ProjectsLang";
import ProjectCard from "../../../../Components/ProjetCard/ProjectCard";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../../Components/Modal/Modal";
import { getHashMap } from "../../../Profile/ProfileFunctions";
import { projectSubmissionForm } from "../../ProjectFunctions";
import AutoInputs from "../../../../Components/AutoInputs/AutoInputs";

function AllProjects() {
    const { userLang, setNewAlert, refresh, refreshApp, setApiWait, apiWait } = Contexts();
    const [projects, setProjects] = useState<Partial<projectType>[] | null | "empty">(null);
    const [submissionForm, setSubmissionForm] = useState<Partial<submittersListType>>({});

    const [modalDisp, setModalDisp] = useState<boolean>(false);
    const [fields, setFields] = useState<any[] | null>(null);

    const { search } = useLocation();
    const { page, price, deadline } = URLSearchParse();
    const navigate = useNavigate();

    useEffect(() => {
        getFields();
    }, []);

    useEffect(() => {
        if (!search.includes("page")) {
            getProjects();
        }
    }, [refresh]);

    useEffect(() => {
        if (page && parseInt(page) > 1) {
            getProjectsPage();
        }
    }, [page]);

    const getFields = () => {
        generalGetFunction({
            endPoint: getUtilsApi("freelance-categories"),
            setNewAlert,
            setState: setFields,
            refresh: refreshApp,
            successCode: "S52",
            silent: true,
        });
    };

    const getProjects = () => {
        generalGetFunction({
            endPoint: getProjectsApi(search),
            setState: setProjects,
            successCode: "S64",
            emptyCode: "E62",
            setNewAlert,
            silent: true,
            // refresh: refreshApp,
        });
    };
    const getProjectsPage = () => {
        generalGetFunction({
            endPoint: getProjectsApi(search),
            setState: addToState,
            successCode: "S64",
            emptyCode: "",
            setNewAlert,
            silent: true,
            // refresh: refreshApp,
        });
    };

    const submitFunc = (id: string, price: number, deadline: number) => {
        URLSearchAdd(navigate, { targetProject: id, price, deadline });
        setSubmissionForm({});
        setModalDisp(true);
    };

    const addToState = (data: any[]) => {
        if (Array.isArray(projects)) {
            setProjects([...projects, ...data]);
        }
    };

    const submitParticipation = (e: React.FormEvent<HTMLFormElement>) => {
        const { targetProject } = URLSearchParse();
        try {
            generalAddEditFunction(e, {
                endPoint: submitOfferToProjectApi(submissionForm, targetProject),
                successCode: "S65",
                setNewAlert,
                apiWait,
                setApiWait,
                refresh: refreshApp,
                optFunc: () => {
                    setSubmissionForm({});
                    setModalDisp(false);
                },
            });
        } catch (error) {
            console.log("🚀 ~ file: AllProjects.tsx:67 ~ submitParticipation ~ error:", error);
        }
    };

    const inputs = projectSubmissionForm({ state: submissionForm, stateSetter: setSubmissionForm });
    return (
        <section className="allOffersGenContainer customScroll">
            <Modal modalDisp={modalDisp} setModalDisp={setModalDisp}>
                <div className="recapProjectContainer">
                    <h1> {ProjectLang[userLang].offerRecap} </h1>
                    <div>
                        <div>
                            <span> {ProjectLang[userLang].card.proposedDeadline} </span> <span>:</span>{" "}
                            <span> {dateFormater(parseInt(deadline))} </span>
                        </div>
                        <div>
                            <span> {ProjectLang[userLang].card.amount} </span> <span>:</span> <span> {formatAsCurrency(price)} </span>
                        </div>
                    </div>
                </div>
                <AutoInputs inputsArr={inputs} onSubmit={submitParticipation} />
            </Modal>

            <GridMapper toMap={projects} emptyString={ProjectLang[userLang].noProjects} emptyIcon="fi fi-br-edit-alt">
                <ProjectCard fieldsMap={getHashMap(fields!, "categoryCode")} submitFunc={submitFunc} />
            </GridMapper>
        </section>
    );
}

export default AllProjects;

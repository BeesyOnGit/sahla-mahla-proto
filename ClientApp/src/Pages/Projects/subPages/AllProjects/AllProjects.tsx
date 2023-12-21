import React, { useEffect, useState } from "react";
import "./AllProjects.scss";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";
import { Contexts } from "../../../../Contexts/Contexts";
import { projectType, submittersListType } from "../../../../../../Serveur/App/Models/Project";
import { URLSearchAdd, URLSearchParse, generalAddEditFunction, generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
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
    const navigate = useNavigate();

    useEffect(() => {
        getFields();
    }, []);

    useEffect(() => {
        getProjects();
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

    const getProjects = () => {
        generalGetFunction({
            endPoint: getProjectsApi(search),
            setState: setProjects,
            successCode: "S64",
            emptyCode: "E62",
            setNewAlert,
            silent: true,
            refresh: refreshApp,
        });
    };

    const submitFunc = (id: string) => {
        URLSearchAdd(navigate, { targetProject: id });
        setSubmissionForm({});
        setModalDisp(true);
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
                <AutoInputs inputsArr={inputs} onSubmit={submitParticipation} />
            </Modal>
            {projects && (
                <GridMapper
                    toMap={projects}
                    Component={ProjectCard}
                    emptyString={ProjectLang[userLang].noProjects}
                    otherProps={{ fieldsMap: getHashMap(fields!, "categoryCode"), submitFunc }}
                    emptyIcon="fi fi-br-edit-alt"
                />
            )}
        </section>
    );
}

export default AllProjects;

import React, { useEffect, useState } from "react";
import "./AllProjects.scss";
import GridMapper from "../../../../Components/GripdMapper/GridMapper";
import { Contexts } from "../../../../Contexts/Contexts";
import { projectType } from "../../../../../../Serveur/App/Models/Project";
import { generalGetFunction } from "../../../../MiddleWear/ClientFunctions";
import { getProjectsApi } from "../../../../MiddleWear/ApiMiddleWear";
import { ProjectLang } from "../../ProjectsLang";
import ProjectCard from "../../../../Components/ProjetCard/ProjectCard";

function AllProjects() {
    const { userLang, setNewAlert, refresh, refreshApp } = Contexts();
    const [projects, setProjects] = useState<Partial<projectType>[] | null | "empty">(null);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        generalGetFunction({
            endPoint: getProjectsApi(),
            setState: setProjects,
            successCode: "S64",
            emptyCode: "E62",
            setNewAlert,
            silent: true,
            refresh: refreshApp,
        });
    };
    return (
        <section className="allOffersGenContainer customScroll">
            {projects && (
                <GridMapper toMap={projects} Component={ProjectCard} emptyString={ProjectLang[userLang].noProjects} emptyIcon="fi fi-br-edit-alt" />
            )}
        </section>
    );
}

export default AllProjects;

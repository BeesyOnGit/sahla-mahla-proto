import React, { useEffect, useState } from "react";
import { projectType } from "../../../../Serveur/App/Models/Project";
import "./Projects.scss";
import GridMapper from "../../Components/GripdMapper/GridMapper";
import { Contexts } from "../../Contexts/Contexts";
import { generalGetFunction, pathWithoutParam } from "../../MiddleWear/ClientFunctions";
import { getProjectsApi } from "../../MiddleWear/ApiMiddleWear";
import { ProjectLang } from "./ProjectsLang";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

function Projects() {
    const { userLang } = Contexts();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname != "/offers/all") {
            navigate("all");
        }
    }, []);

    const navigationMap: any = {
        "/offers/all": () => {
            navigate("new");
        },
        "/offers/new": () => {
            navigate("all");
        },
    };
    const contentMap: any = {
        "/offers/all": ProjectLang[userLang].createOffer,
        "/offers/new": ProjectLang[userLang].allOffers,
    };
    const iconMap: any = {
        "/offers/all": "fi fi-sr-add-document",
        "/offers/new": "fi fi-sr-apps-sort",
    };

    return (
        <section className="projectsGeneralContainer">
            <div className="overLcontainer">
                <Button
                    className="pagesNavButton"
                    icon={iconMap[pathWithoutParam(3)]}
                    content={contentMap[pathWithoutParam(3)]}
                    onClick={navigationMap[pathWithoutParam(3)]}
                />
            </div>
            <Outlet />
        </section>
    );
}

export default Projects;

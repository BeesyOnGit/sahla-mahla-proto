import React, { useEffect, useState } from "react";
import "./Orders.scss";
import Button from "../../Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Contexts } from "../../Contexts/Contexts";
import {
    URLSearchAdd,
    URLSearchParse,
    URLSearchremove,
    generalAddEditFunction,
    generalGetFunction,
    pathWithoutParam,
} from "../../MiddleWear/ClientFunctions";
import { OrdersLang } from "./OrdersLang";
import { editProjectApi, getProjectsApi, getUtilsApi } from "../../MiddleWear/ApiMiddleWear";
import { projectType } from "../../../../Serveur/App/Models/Project";
import GridMapper from "../../Components/GripdMapper/GridMapper";
import { getHashMap } from "../Profile/ProfileFunctions";
import ProjectCard from "../../Components/ProjetCard/ProjectCard";
import ProjectCardListe from "../../Components/ProjetCard/ProjectCardListe";
import { ProjectLang } from "../Projects/ProjectsLang";

function Orders() {
    const { userLang, setNewAlert, refreshApp, apiWait, setApiWait } = Contexts();

    const [projects, setprojects] = useState<Partial<projectType>[] | null | "empty">(null);
    const [fields, setFields] = useState<any[] | null>(null);

    const navigate = useNavigate();

    const { pathname, search } = useLocation();
    const { order } = URLSearchParse();

    useEffect(() => {
        if (!order && pathname == "/orders") {
            URLSearchAdd(navigate, { order: "my" });
        }
    }, [pathname, search]);
    useEffect(() => {
        getFields();
    }, []);

    useEffect(() => {
        if (!order) {
            return;
        }
        getProjects();
    }, [search]);

    const getProjects = () => {
        generalGetFunction({
            endPoint: getProjectsApi(search),
            setState: setprojects,
            successCode: "S64",
            emptyCode: "E62",
            setNewAlert,
            silent: true,
            refresh: refreshApp,
        });
    };

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

    const selectedNav = (name: string) => {
        if (order == name) {
            return "pagesNavSelected";
        }
        return "";
    };

    const seeDetail = (id: string) => {
        navigate(`${id}`);
    };

    const emptyStrHashMap: any = {
        my: OrdersLang[userLang].emptyOrderStr,
        involved: OrdersLang[userLang].emptyInvolvStr,
        recap: OrdersLang[userLang].emptyRecapStr,
    };
    const emptyIconHashMap: any = {
        my: "fi fi-sr-file-invoice-dollar",
        involved: "fi fi-sr-square-poll-horizontal",
        recap: "fi fi-br-list",
    };
    const detailsHashMap: any = {
        my: seeDetail,
        involved: seeDetail,
        recap: null,
    };

    const navigateInOrders = (to: string) => {
        URLSearchremove(navigate, "page");
        URLSearchAdd(navigate, { order: to });
    };

    const headerTitle: any = {
        title: ProjectLang[userLang].card.title,

        amount: ProjectLang[userLang].card.amount,
        submitDeadLine: ProjectLang[userLang].card.submitableUntil,
        buyerDeadline: ProjectLang[userLang].card.proposedDeadline,
        projectStatus: ProjectLang[userLang].card.projectStat,
        buyer: ProjectLang[userLang].card.buyer,
    };

    return (
        <div className="ordersGeneralContainer">
            <div className="ordersNavContainer">
                <Button
                    className={"pagesNavButton " + selectedNav("my")}
                    icon="fi fi-sr-file-invoice-dollar"
                    content={OrdersLang[userLang].myOrders}
                    onClick={() => {
                        navigateInOrders("my");
                    }}
                />
                <Button
                    className={"pagesNavButton " + selectedNav("involved")}
                    icon="fi fi-sr-square-poll-horizontal"
                    content={OrdersLang[userLang].involvedIn}
                    onClick={() => {
                        navigateInOrders("involved");
                    }}
                />
                {/* <Button
                    className={"pagesNavButton " + selectedNav("recap")}
                    icon="fi fi-br-list"
                    content={OrdersLang[userLang].recap}
                    onClick={() => {
                        navigateInOrders("recap");
                    }}
                /> */}
            </div>
            <div className="ordersListeContainer">
                <ProjectCardListe header {...headerTitle} />
                <GridMapper liste toMap={projects} emptyString={emptyStrHashMap[order]} emptyIcon={emptyIconHashMap[order]}>
                    <ProjectCardListe detail={detailsHashMap[order]} />
                </GridMapper>
            </div>
        </div>
    );
}

export default Orders;

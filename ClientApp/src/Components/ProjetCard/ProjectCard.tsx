import React, { useEffect, useState } from "react";
import "./ProjectCard.scss";
import "../ResourcesCard/ResourcesCard.scss";
import { projectType } from "../../../../Serveur/App/Models/Project";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../../Serveur/App/Models/Clients";
import { Contexts } from "../../Contexts/Contexts";
import { ProjectLang } from "../../Pages/Projects/ProjectsLang";
import { dateFormater, formatAsCurrency } from "../../MiddleWear/ClientFunctions";
import LazyImage from "../LazyImage/LazyImage";
import Button from "../Button/Button";
import { projectStatusLang } from "../../MiddleWear/ClientData";

function ProjectCard(props: Partial<projectType> & { buyer: Partial<freelanceType | clientType> }) {
    const { userLang } = Contexts();

    const [showDesc, setShowDesc] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<boolean>(false);
    const { title, targetFields, amount, submitDeadLine, buyerDeadline, description, projectStatus, buyer } = props;
    const { firstName, familyName, profilePicture, aprouved } = buyer || {};

    useEffect(() => {
        const interv = setInterval(() => {
            setTimeLeft(!timeLeft);
        }, 1000);

        return () => {
            clearInterval(interv);
        };
    });

    const textArray = description?.split("\n").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
    return (
        <div className="projectCardGenContainer">
            <h1>
                <div>
                    <span className={statusClassed[projectStatus!]}> {projectStatusLang[userLang][projectStatus!]} </span>
                </div>
                {title}
            </h1>
            <section>
                <div>
                    <span> {ProjectLang[userLang].card.proposedDeadline} </span> <span>:</span> <span> {dateFormater(buyerDeadline!, true)} </span>
                </div>
                <div>
                    <span> {ProjectLang[userLang].card.amount} </span> <span>:</span> <span> {formatAsCurrency(amount!)} </span>
                </div>

                <div>
                    <span
                        onClick={() => {
                            setShowDesc(!showDesc);
                        }}
                    >
                        {ProjectLang[userLang].card.seeMoreDetails}
                    </span>
                    {showDesc && description && <p> {textArray} </p>}
                </div>
                <div>
                    <span> {ProjectLang[userLang].card.submitableUntil} </span> <span className="timerProject"> {getTimeLeft(submitDeadLine!)} </span>
                </div>
                <div className="userIngfosContainer">
                    {profilePicture ? <LazyImage src={profilePicture} className="cardprofileImg" /> : <i className="fi fi-sr-circle-user"></i>}
                    <div>
                        {firstName} {familyName}
                    </div>
                    {aprouved && <i className="fi fi-ss-badge-check checkUser"></i>}
                </div>
                <Button content={ProjectLang[userLang].card.submitOffer} icon="" onClick={() => {}} className="pagesNavButton projectsubButton" />
            </section>
        </div>
    );
}

export default ProjectCard;

const statusClassed: any = {
    0: "positiveResponse",
    1: "iddleResponse",
    2: "positiveResponse",
    3: "negativeResponse",
};

const getTimeLeft = (timestamp: number) => {
    const now = new Date().getTime();
    const difference = timestamp - now;

    const lang = window.localStorage.lang;

    if (difference <= 0) {
        return "0";
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    return lang == "ar"
        ? `${seconds ? `${seconds}` : "00"} ${minutes ? `: ${minutes}` : ": 00"} ${hours ? `: ${hours}` : ": 00"}`
        : `${hours ? `${hours} :` : "00 :"} ${minutes ? `${minutes} :` : "00 :"} ${seconds ? `${seconds}` : "00"}`;
};

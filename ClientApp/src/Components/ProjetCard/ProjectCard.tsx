import React, { useEffect, useState } from "react";
import "./ProjectCard.scss";
import "../Inputs/Inputs.css";
import "../ResourcesCard/ResourcesCard.scss";
import { projectType } from "../../../../Serveur/App/Models/Project";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../../Serveur/App/Models/Clients";
// import { Contexts } from "../../Contexts/Contexts";
import { ProjectLang } from "../../Pages/Projects/ProjectsLang";
import { dateFormater, formatAsCurrency } from "../../MiddleWear/ClientFunctions";
import LazyImage from "../LazyImage/LazyImage";
import Button from "../Button/Button";
import { projectStatusLang } from "../../MiddleWear/ClientData";
import { langType } from "../../MiddleWear/ClientInterface";
import Skuleton from "../Skuleton/Skeleton";
import { OrdersLang } from "../../Pages/Orders/OrdersLang";
import ProfileComp from "../ProfileComp/ProfileComp";

function ProjectCard(
    props: Partial<projectType> & {
        buyer?: Partial<freelanceType | clientType>;
        submitFunc?: Function;
        fieldsMap: any;
        skull?: boolean;
        detail?: any;
    }
) {
    // const { userLang } = Contexts();
    const userLang: langType = window.localStorage.lang;

    const [showDesc, setShowDesc] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const {
        title,
        targetFields,
        amount,
        submitDeadLine,
        buyerDeadline,
        description,
        projectStatus,
        buyer,
        submitFunc,
        _id,
        fieldsMap,
        skull,
        detail,
    } = props;
    const { firstName, familyName, profilePicture, aprouved } = buyer || {};
    const expired = restTime(submitDeadLine!) <= 0;

    useEffect(() => {
        let interv: any;
        if (expired) {
            clearInterval(interv);
            setTimeLeft(0);
            return;
        }
        interv = setInterval(() => {
            setTimeLeft(restTime(submitDeadLine!));
        }, 1000);

        return () => {
            clearInterval(interv);
        };
    }, [_id]);

    const textArray = description?.split("\n").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <div className="projectCardGenContainer">
            {!skull ? (
                <>
                    <h1>
                        <div>
                            <span className={statusClassed[projectStatus!]}> {projectStatusLang[userLang][projectStatus!]} </span>
                        </div>
                        {title}
                    </h1>
                    <section>
                        <div>
                            <span> {ProjectLang[userLang].card.proposedDeadline} </span> <span>:</span> <span> {dateFormater(buyerDeadline!)} </span>
                        </div>
                        <div>
                            <span> {ProjectLang[userLang].card.amount} </span> <span>:</span> <span> {formatAsCurrency(amount!)} </span>
                        </div>

                        <section>
                            <span
                                onClick={() => {
                                    setShowDesc(!showDesc);
                                }}
                            >
                                {ProjectLang[userLang].card.seeMoreDetails}
                            </span>
                            {showDesc && description && <p> {textArray} </p>}
                        </section>

                        <section>
                            <span>{ProjectLang[userLang].card.fieldsWanted}</span>
                            <div className="customScroll">
                                {targetFields?.map((elem: any, i) => {
                                    return (
                                        <div key={i} className="multiInputSelectedElem">
                                            <div> {fieldsMap ? fieldsMap[elem] : null} </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                        <div>
                            <span> {ProjectLang[userLang].card.submitableUntil} </span>
                            <span className={"timerProject " + expirationclassMap[`${expired}`]}>{getTimeLeft(timeLeft)} </span>
                        </div>
                        <ProfileComp aprouved={aprouved} firstName={firstName} familyName={familyName} profilePicture={profilePicture} />
                        {detail && (
                            <Button
                                content={OrdersLang[userLang].buttDetail}
                                icon=""
                                onClick={() => {
                                    detail(_id);
                                }}
                                className={"pagesNavButton projectsubButton "}
                            />
                        )}
                        {submitFunc && (
                            <Button
                                content={ProjectLang[userLang].card.submitOffer}
                                icon=""
                                disabled={expired}
                                onClick={() => {
                                    submitFunc(_id);
                                }}
                                className={"pagesNavButton projectsubButton " + expirationButtonclassMap[`${expired}`]}
                            />
                        )}
                    </section>
                </>
            ) : (
                <section className="skullContainer">
                    <Skuleton style={{ width: "70%", height: "2.5rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "50%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "25%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "45%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "100%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "40%", height: "1rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "50%", height: "1rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "100%", height: "2rem", borderRadius: "var(--roundRadius)" }} />
                </section>
            )}
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

const expirationclassMap: any = {
    true: "negativeResponse resWhilteCol",
    false: "",
};
const expirationButtonclassMap: any = {
    true: "buttonDesabled",
    false: "",
};

const restTime = (timestamp: number): number => {
    const now = new Date().getTime();
    return timestamp - now;
};

const getTimeLeft = (timestamp: number) => {
    const difference = timestamp;

    const lang: langType = window.localStorage.lang;

    if (difference <= 0) {
        return ProjectLang[lang].card.expired;
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    return lang == "ar"
        ? `${seconds ? `${seconds}` : "00"} ${minutes ? `: ${minutes}` : ": 00"} ${hours ? `: ${hours}` : ": 00"}`
        : `${hours ? `${hours} :` : "00 :"} ${minutes ? `${minutes} :` : "00 :"} ${seconds ? `${seconds}` : "00"}`;
};

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

function ProjectCardListe(
    props: Partial<projectType> & {
        buyer?: Partial<freelanceType | clientType>;
        submitFunc?: Function;
        fieldsMap?: any;
        skull?: boolean;
        detail?: any;
        id?: string;
        header?: boolean;
    }
) {
    // const { userLang } = Contexts();
    const userLang: langType = window.localStorage.lang;

    const [timeLeft, setTimeLeft] = useState<number>(0);
    const {
        title,

        amount,
        submitDeadLine,
        buyerDeadline,
        description,
        projectStatus,
        buyer,
        _id,
        skull,
        detail,
        id,
        header,
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
        <div
            className="projectCardGenContainerListe"
            id={id && id}
            onClick={() => {
                detail && detail(_id);
            }}
            style={detail ? { cursor: "pointer" } : {}}
        >
            {!skull ? (
                <>
                    <div>{title}</div>
                    {header ? (
                        //@ts-ignore
                        <div> {buyer} </div>
                    ) : (
                        <ProfileComp aprouved={aprouved} firstName={firstName} familyName={familyName} profilePicture={profilePicture} short />
                    )}

                    <div>{header ? buyerDeadline : <span> {dateFormater(buyerDeadline!)} </span>}</div>
                    <div>{header ? amount : <span> {formatAsCurrency(amount!)} </span>}</div>

                    <div>
                        {header ? (
                            submitDeadLine
                        ) : (
                            <span className={"timerProject " + expirationclassMap[`${expired}`]}>{getTimeLeft(timeLeft)} </span>
                        )}
                    </div>
                    <div>
                        {header ? (
                            projectStatus
                        ) : (
                            <span className={statusClassed[projectStatus!]}> {projectStatusLang[userLang][projectStatus!]} </span>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <Skuleton style={{ width: "50%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "90%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "90%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "90%", height: "1.25rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "90%", height: "1rem", borderRadius: "var(--roundRadius)" }} />
                    <Skuleton style={{ width: "90%", height: "1rem", borderRadius: "var(--roundRadius)" }} />
                </>
            )}
        </div>
    );
}

export default ProjectCardListe;

export const statusClassed: any = {
    0: "positiveResponse",
    1: "iddleResponse",
    2: "positiveResponse",
    3: "negativeResponse",
};

export const expirationclassMap: any = {
    true: "negativeResponse resWhilteCol",
    false: "",
};
export const expirationButtonclassMap: any = {
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

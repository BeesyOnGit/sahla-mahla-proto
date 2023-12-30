import React, { useEffect, useState } from "react";
import "./OrderDetail.scss";
import "../../../../Components/ResourcesCard/ResourcesCard.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
    URLSearchAdd,
    URLSearchParse,
    dateFormater,
    formatAsCurrency,
    generalAddEditFunction,
    generalGetFunction,
} from "../../../../MiddleWear/ClientFunctions";
import { editProjectApi, getProjectdetailsApi, uploadFile } from "../../../../MiddleWear/ApiMiddleWear";
import { Contexts } from "../../../../Contexts/Contexts";
import { projectType, submittersListType } from "../../../../../../Serveur/App/Models/Project";
import Separation from "../../../../Components/Separation/Separation";
import Skuleton from "../../../../Components/Skuleton/Skeleton";
import { freelanceType } from "../../../../../../Serveur/App/Models/Freelance";
import { clientType } from "../../../../../../Serveur/App/Models/Clients";
import { ProjectLang } from "../../../Projects/ProjectsLang";
import { OrdersLang } from "../../OrdersLang";
import LazyImage from "../../../../Components/LazyImage/LazyImage";
import ProfileComp from "../../../../Components/ProfileComp/ProfileComp";
import SubmittersComp from "../../Components/SubmitterComp/SubmittersComp";
import FullpageIcon from "../../../../Components/FullPageIcon/FullpageIcon";
import AutoInputs from "../../../../Components/AutoInputs/AutoInputs";
import { submissionLinksInputs } from "../../OrderFunctions";
import Modal from "../../../../Components/Modal/Modal";
import Button from "../../../../Components/Button/Button";
import { LibraryLang } from "../../../Library/LibraryLang";
import { donwloadFunc } from "../../../../Components/ResourcesCard/ResourcesCard";

function OrderDetail() {
    const { userLang, setNewAlert, refreshApp, refresh, apiWait, setApiWait } = Contexts();
    console.log("🚀 ~ file: OrderDetail.tsx:35 ~ OrderDetail ~ refresh:", refresh);

    const [projectDet, setProjectDet] = useState<orderDetType | null>(null);
    const [submitLinks, setSubmitLinks] = useState<Partial<projectType>>({});

    const [modalDisp, setModalDisp] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<number>(0);

    const { id } = useParams();

    const { freelance, toDelete, fName, lName, pp } = URLSearchParse();

    const {
        title,
        owned,
        amount,
        finalDeadLine,
        buyerDeadline,
        contracted,
        projectStatus,
        submitters,
        description,
        _id,
        contractor,
        buyer,
        finalLink,
        temporaryLink,
    } = projectDet || {};

    const { aprouved, profilePicture, firstName, familyName } = buyer || {};

    const navigate = useNavigate();

    useEffect(() => {
        getProjectDetail();
    }, [refresh]);

    const getProjectDetail = () => {
        generalGetFunction({
            endPoint: getProjectdetailsApi(id!),
            successCode: "S64",
            setNewAlert,
            refresh: refreshApp,
            silent: true,
            setState: setProjectDet,
        });
    };

    const modalMap: any = {
        1: (
            <div className="orderConfirmationContainer">
                <span> {OrdersLang[userLang].ordDetail.confirmChoice} </span>
                <ProfileComp firstName={fName} familyName={lName} profilePicture={pp} />
                <div>
                    <Button
                        content={OrdersLang[userLang].ordDetail.cancelBut}
                        icon="fi fi-br-cross"
                        className="pagesNavButton pagesNavButtonRed"
                        onClick={() => {
                            cancelModal();
                        }}
                    />
                    <Button
                        content={OrdersLang[userLang].ordDetail.confirmButt}
                        icon="fi fi-br-check"
                        className="pagesNavButton pagesNavSelected"
                        onClick={() => {
                            confirmFreelanceChoice();
                        }}
                    />
                </div>
            </div>
        ),
        0: null,
    };

    const textArray = description?.split("\n").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    const choseThisFreelance = (id: string, fName: string, lName: string, pp: string) => {
        URLSearchAdd(navigate, { freelance: id, fName, lName, pp });
        setModalMode(1);
        setModalDisp(true);
    };

    const cancelModal = () => {
        setModalDisp(false);
        setModalMode(0);
        navigate("");
    };

    const confirmFreelanceChoice = () => {
        if (!freelance) {
            return;
        }
        if (!projectDet || !projectDet.submitters) {
            return;
        }

        const submitter: submittersListType | undefined = projectDet!.submitters!.find((e) => {
            //@ts-ignore
            return e.submitter._id == freelance;
        });

        const { submitter: sub, submitterDeadline, submitterPrice } = submitter!;
        const editObject = { contractor: [sub], amount: submitterPrice, finalDeadLine: submitterDeadline, projectStatus: 1, canSubmit: false };

        if (apiWait) {
            return;
        }

        generalAddEditFunction("", {
            endPoint: editProjectApi(editObject, _id!),
            successCode: "S62",
            setNewAlert,
            refresh: refreshApp,
            apiWait,
            setApiWait,
            optFunc: () => {
                cancelModal();
                refreshApp();
            },
        });
    };

    const submitFilesToClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let finalLinks = {};

        for (const key in submitLinks) {
            //@ts-ignore
            if (submitLinks[key].includes("base64")) {
                await generalAddEditFunction("", {
                    //@ts-ignore
                    endPoint: uploadFile({ resource: submitLinks[key] }),
                    successCode: "S101",
                    apiWait,
                    setApiWait,
                    refresh: refreshApp,
                    setNewAlert,
                    optFunc: (data: string) => {
                        finalLinks = { ...finalLinks, [key]: data };
                    },
                });
            }
        }

        await generalAddEditFunction("", {
            //@ts-ignore
            endPoint: editProjectApi({ ...finalLinks, editAsContractor: true }, _id),
            successCode: "S62",
            apiWait,
            setApiWait,
            refresh: refreshApp,
            setNewAlert,
        });
    };

    return (
        <div className="orderDetailContainer customScroll">
            <Modal modalDisp={modalDisp} setModalDisp={setModalDisp}>
                {modalMap[modalMode]}
            </Modal>
            {projectDet ? (
                <section>
                    <Separation className="orderDetTitle" title={title!} line={true} />

                    <p> {_id} </p>

                    <div className="orderDetDesc">{textArray}</div>

                    <div className="orderbaseInfContainer">
                        <div>
                            <span> {ProjectLang[userLang].card.proposedDeadline} </span> <span>:</span>
                            <span> {dateFormater(buyerDeadline!)} </span>
                        </div>

                        <div>
                            <span> {OrdersLang[userLang].ordDetail.finalDeadline} </span> <span>:</span>
                            <span> {finalDeadLine ? dateFormater(finalDeadLine!) : OrdersLang[userLang].ordDetail.noDeadline} </span>
                        </div>

                        <div>
                            <span> {ProjectLang[userLang].card.amount} </span> <span>:</span> <span> {formatAsCurrency(amount!)} </span>
                        </div>
                    </div>

                    <div className="orderDetSubtitle"> {OrdersLang[userLang].ordDetail.projectparts} </div>

                    <div className="ordersPartiesContainer">
                        <div>
                            <div> {OrdersLang[userLang].ordDetail.projectBuyer} </div>
                            <ProfileComp aprouved={aprouved} firstName={firstName} familyName={familyName} profilePicture={profilePicture} />
                        </div>

                        <div>
                            <div> {OrdersLang[userLang].ordDetail.projectContractor} </div>
                            {contractor!.length > 0 ? (
                                contractor?.map((contract, i) => {
                                    return <ProfileComp key={i} {...contract} />;
                                })
                            ) : (
                                <div className="orderDetSubtitle"> {OrdersLang[userLang].ordDetail.noContractorYet} </div>
                            )}
                        </div>
                    </div>

                    {contractor?.length == 0 && <div className="orderDetSubtitle"> {OrdersLang[userLang].ordDetail.submitterListe} </div>}

                    {contractor?.length == 0 && (
                        <div className="orderDetPropalsCont customScroll">
                            {submitters!.length > 0 ? (
                                submitters?.map((submitter, i) => {
                                    return (
                                        <SubmittersComp
                                            key={i}
                                            {...submitter}
                                            refPrice={amount}
                                            refdeadline={buyerDeadline}
                                            choseFunc={choseThisFreelance}
                                        />
                                    );
                                })
                            ) : (
                                <FullpageIcon icon="fi fi-sr-inbox-in" texte={OrdersLang[userLang].ordDetail.noSubmitterYet} />
                            )}
                        </div>
                    )}

                    {contracted && <div className="orderDetSubtitle"> {OrdersLang[userLang].ordDetail.submitWork} </div>}
                    {contracted && (
                        <AutoInputs
                            inputsArr={submissionLinksInputs({ state: submitLinks, stateSetter: setSubmitLinks })}
                            onSubmit={submitFilesToClient}
                        />
                    )}
                    {(temporaryLink || finalLink) && (
                        <div className="orderDetSubtitle">
                            <span>{OrdersLang[userLang].ordDetail.download}</span> <span>{OrdersLang[userLang].ordDetail.submittedWork}</span>
                        </div>
                    )}
                    <div className="orderFilesContainer">
                        {temporaryLink && (
                            <Button
                                className="pagesNavButton"
                                onClick={() => {
                                    donwloadFunc(temporaryLink!);
                                }}
                            >
                                <span>{OrdersLang[userLang].ordDetail.download}</span> <span> {OrdersLang[userLang].ordDetail.tmpLink} </span>
                            </Button>
                        )}
                        {finalLink && (
                            <Button
                                className="pagesNavButton"
                                onClick={() => {
                                    donwloadFunc(finalLink!);
                                }}
                            >
                                <span>{OrdersLang[userLang].ordDetail.download}</span> <span> {OrdersLang[userLang].ordDetail.finalLink} </span>
                            </Button>
                        )}
                    </div>

                    {owned && (
                        <div className="orderFilesContainer">
                            {!finalLink && !temporaryLink && (
                                <Button
                                    content={OrdersLang[userLang].ordDetail.cancelOrderBut}
                                    icon="fi fi-br-cross"
                                    className="pagesNavButton pagesNavButtonRed"
                                    onClick={() => {}}
                                />
                            )}

                            {finalLink && (
                                <Button
                                    content={OrdersLang[userLang].ordDetail.approveBut}
                                    icon="fi fi-br-check"
                                    className="pagesNavButton pagesNavSelected"
                                    onClick={() => {}}
                                />
                            )}
                        </div>
                    )}
                </section>
            ) : (
                <section>
                    <Skuleton style={{}} />
                </section>
            )}
        </div>
    );
}

export default OrderDetail;

type orderDetType = Partial<projectType> & {
    owned?: boolean;
    contracted?: boolean;
    submitters?: { submitter: submittersListType & Partial<freelanceType>[] };
    buyer: Partial<freelanceType | clientType>;
    contractor: Partial<freelanceType>[];
};

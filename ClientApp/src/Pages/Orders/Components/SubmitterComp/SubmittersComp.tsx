import React from "react";
import "./Submittercomp.scss";
import { submittersListType } from "../../../../../../Serveur/App/Models/Project";
import { freelanceType } from "../../../../../../Serveur/App/Models/Freelance";
import ProfileComp from "../../../../Components/ProfileComp/ProfileComp";
import { dateFormater, formatAsCurrency } from "../../../../MiddleWear/ClientFunctions";
import Button from "../../../../Components/Button/Button";
import { OrdersLang } from "../../OrdersLang";
import { Contexts } from "../../../../Contexts/Contexts";

function SubmittersComp(
    props: submittersListType & { submitter: Partial<freelanceType>; choseFunc?: Function; refdeadline?: number; refPrice?: number }
) {
    const { userLang } = Contexts();
    const { submitterDeadline, submitterPrice, submitterQuestions, submitter, choseFunc, refPrice, refdeadline } = props;

    const colorOverRefMap: any = {
        true: "negativeResponse resWhilteCol",
        false: "positiveResponse resWhilteCol",
    };
    return (
        <div className="submitterElemContainer">
            <ProfileComp {...submitter} />
            <span className={colorOverRefMap[`${submitterPrice >= refPrice!}`]}> {formatAsCurrency(submitterPrice)} </span>
            <span className={colorOverRefMap[`${submitterDeadline >= refdeadline!}`]}> {dateFormater(submitterDeadline)} </span>
            <Button
                content={OrdersLang[userLang].ordDetail.choseContractorButton}
                className="pagesNavButton"
                icon="fi fi-sr-star hithere"
                onClick={() => {
                    choseFunc!(submitter._id, submitter.firstName, submitter.familyName, submitter.profilePicture);
                }}
            />
        </div>
    );
}

export default SubmittersComp;

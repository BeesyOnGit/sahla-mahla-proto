import React from "react";
import "./ResourcesCard.scss";
import { resourcesType } from "../../../../Serveur/App/Models/Resources";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import LazyImage from "../LazyImage/LazyImage";
import { LibraryLang } from "../../Pages/Library/LibraryLang";
import { Contexts } from "../../Contexts/Contexts";
import Button from "../Button/Button";
import { formatAsCurrency } from "../../MiddleWear/ClientFunctions";
import Skuleton from "../Skuleton/Skeleton";
import ProfileComp from "../ProfileComp/ProfileComp";

function ResourcesCard(props: Partial<resourcesType> & { likeFunc?: Function; skull?: boolean; deleteFunc?: Function; id?: string }) {
    const { userLang } = Contexts();
    const {
        title,
        owner,
        likes,
        bookMarks,
        resourceThumbnail,
        price,
        discount,
        timesSold,
        buyers,
        _id,
        likeFunc,
        skull,
        resourceLink,
        deleteFunc,
        id,
    } = props;
    const ownerInfos: any = owner;

    const bookedMap: any = {
        true: "bookedRes",
        false: "",
    };
    const likedMap: any = {
        true: "likedRes",
        false: "",
    };

    return (
        <div className="resourceGeneralContainer" id={id && id}>
            {!skull ? (
                <>
                    <div className="resourcesTitle"> {title} </div>
                    <div className="resourceInfosContainer">
                        <ProfileComp
                            aprouved={ownerInfos.aprouved}
                            firstName={ownerInfos.firstName}
                            familyName={ownerInfos.familyName}
                            profilePicture={ownerInfos.profilePicture}
                        />
                        <div className="resourcePopularityContainer">
                            <div
                                onClick={() => {
                                    likeFunc!(_id, "like=true");
                                }}
                            >
                                <i className={"fi fi-sr-heart " + likedMap[`${likes![1]}`]}></i>
                                <span> {likes![0]} </span>
                                <span> {LibraryLang[userLang].resourceCard.likes} </span>
                            </div>
                            <div
                                onClick={() => {
                                    likeFunc!(_id, "bookmark=true");
                                }}
                            >
                                <i className={"fi fi-sr-bookmark " + bookedMap[`${bookMarks![1]}`]}></i>
                                <span> {bookMarks![0]} </span>
                                <span> {LibraryLang[userLang].resourceCard.bookMark} </span>
                            </div>
                        </div>
                    </div>
                    <LazyImage src={resourceThumbnail!} className="resourceCardImage" />
                    <div className="priceButContainer">
                        <div className="priceContainer">
                            <div> {formatAsCurrency(price!)} </div>
                            <section>
                                <span> {LibraryLang[userLang].resourceCard.bought} </span> <span> {timesSold} </span>
                                <span>{LibraryLang[userLang].resourceCard.timesSold}</span>
                            </section>
                        </div>
                        {!resourceLink ? (
                            <Button
                                // disabled={JSON.parse(buyers![1])}
                                content={LibraryLang[userLang].resourceCard.buyButton}
                                className="pagesNavButton"
                            />
                        ) : (
                            <Button
                                // disabled={JSON.parse(buyers![1])}
                                content={LibraryLang[userLang].resourceCard.donwload}
                                className="pagesNavButton"
                                onClick={() => {
                                    donwloadFunc(resourceLink);
                                }}
                            />
                        )}
                    </div>
                    {deleteFunc && (
                        <Button
                            content={LibraryLang[userLang].resourceCard.deleteBut}
                            icon="fi fi-br-cross"
                            className="pagesNavButton pagesNavButtonRed profButtonFullW"
                            onClick={() => {
                                deleteFunc(_id, title);
                            }}
                        />
                    )}
                </>
            ) : (
                <>
                    <Skuleton style={{ width: "50%", height: "1.25rem", borderRadius: "var(--smouthRadius)", margin: "0.7rem 0" }} />
                    {/* <Skuleton style={{ width: "50%", height: "1.25rem", borderRadius: "var(--smouthRadius)", margin: "0.7rem 0" }} /> */}
                    <Skuleton style={{ width: "90%", height: "1rem", borderRadius: "var(--smouthRadius)", margin: "0.7rem 0" }} />
                    <Skuleton style={{ width: "100%", height: "11rem", borderRadius: "var(--smouthRadius)", margin: "0.7rem 0" }} />
                    <Skuleton style={{ width: "50%", height: "1.25rem", borderRadius: "var(--smouthRadius)", margin: "0.7rem 0" }} />
                </>
            )}
        </div>
    );
}

export default ResourcesCard;

export const donwloadFunc = (link: string) => {
    console.log("clicked");

    const a = document.createElement("a");
    a.href = link!;
    a.target = "_blank";
    a.click();
};

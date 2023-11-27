import React, { useState } from "react";
import "./ProductCard.css";
import { commandeContent } from "../../../../Serveur/App/Models/Commande";
import { productType } from "../../../../Serveur/App/Models/Produits";
import Skuleton from "../Skuleton/Skeleton";
import { formatAsCurrency } from "../../MiddleWear/ClientFunctions";
import Button from "../Button/Button";
import { usersLang } from "../../Pages/Users/UsersLang";
import { Contexts } from "../../Contexts/Contexts";

type ProductPropsType = Partial<productType & commandeContent> & {
    skull?: boolean;
    editable?: boolean;
    deleteProd?: Function;
    editProd?: Function;
} & React.HTMLAttributes<HTMLDivElement>;

function ProductCard(props: ProductPropsType) {
    const { userLang } = Contexts();
    const { name, price, picture, skull, onClick, editable, deleteProd, editProd, _id } = props;

    const [confirmMode, setConfirmMode] = useState<boolean>(false);
    return (
        <div className="ProductsCardGeneralContainer" onClick={onClick}>
            {confirmMode && (
                <div className="confirmSectionProd">
                    <Button
                        content={usersLang[userLang].delButton}
                        icon="fi fi-sr-trash"
                        className="newOrderButton negativeResponse buttoInside"
                        onClick={() => {
                            deleteProd!(_id!);
                            setConfirmMode(false);
                        }}
                    />
                    <Button
                        content={usersLang[userLang].cancelButton}
                        icon="fi fi-ss-check-circle"
                        className="newOrderButton positiveResponse buttoInside"
                        onClick={() => setConfirmMode(false)}
                    />
                </div>
            )}
            {!skull ? <div className="ProductCardTitle"> {name} </div> : <Skuleton style={{ width: "8.5rem" }} />}
            {skull ? (
                <Skuleton style={{ width: "4rem", height: "4rem" }} />
            ) : picture ? (
                <img className="ProductCardImg" src={picture} alt="" />
            ) : null}
            {!skull && price ? (
                <div className="ProductCardPrice"> {formatAsCurrency(price)} </div>
            ) : skull ? (
                <Skuleton style={{ width: "3.5rem" }} />
            ) : null}
            {editable && (
                <section className="orderInfosContainer">
                    <i className="fi fi-sr-file-edit orderIcon positiveColor" onClick={() => editProd!(_id)}></i>
                    <i className="fi fi-sr-trash orderIcon negativeColor" onClick={() => setConfirmMode(true)}></i>
                </section>
            )}
        </div>
    );
}

export default ProductCard;

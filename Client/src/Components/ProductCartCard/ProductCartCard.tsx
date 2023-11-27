import React from "react";
import "./ProductCartCard.css";
import { commandeContent } from "../../../../Serveur/App/Models/Commande";
import { productType } from "../../../../Serveur/App/Models/Produits";
import { URLSearchAdd, URLSearchParse, formatAsCurrency } from "../../MiddleWear/ClientFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { addinSelecteMap } from "../../Pages/Order/components/NewOrder/AddinsSection";

type ProductCartCardProps = {
    editQuant: Function;
    removeFromCart: Function;
    product: Partial<productType & commandeContent>;

    index: number;
};

function ProductCartCard(props: ProductCartCardProps) {
    const { product, editQuant, removeFromCart, index } = props;
    const { name, price, quantity, picture, condiments, sauces } = product;

    const navigate = useNavigate();
    const { search } = useLocation();
    const { curridx } = URLSearchParse(search);

    const isSelec = curridx ? curridx == index : false;

    return (
        <div
            className={"newOrderCartElemGeneralContainer " + addinSelecteMap[`${isSelec}`]}
            onClick={() => URLSearchAdd(navigate, { curridx: index }, search)}
        >
            <div className="newOrderContentElem">
                {picture ? <img className="cartImg" src={picture} alt="" /> : null}
                <div className="newOrdersInfosContainer">
                    <span className="orderProductName"> {name ? name : "produit suprimé"} </span>
                    <section className="newOrderInfosInteractivSection">
                        <div className="newOrderInfos">
                            <div className="orderQuantchangerDiv">
                                <i className="fi fi-sr-minus-circle generalIconClass " onClick={() => editQuant(index, "-")}></i>
                                <div> {quantity} </div>
                                <i className="fi fi-sr-add generalIconClass " onClick={() => editQuant(index, "+")}></i>
                            </div>
                        </div>
                        <div className="orderSubTotalDiv">
                            <div>{formatAsCurrency(quantity! * price!)} </div>
                            <i className="fi fi-sr-trash generalIconClass negativeColor" onClick={() => removeFromCart(index)}></i>
                        </div>
                    </section>
                </div>
            </div>
            {sauces!.length > 0 ? (
                <div className="newOrdersAddinsDiv">
                    {sauces?.map((sauce, i) => {
                        return <div key={i}> {sauce} </div>;
                    })}
                </div>
            ) : null}
            {condiments!.length > 0 ? (
                <div className="newOrdersAddinsDiv">
                    {condiments?.map((sauce, i) => {
                        return <div key={i}> {sauce} </div>;
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default ProductCartCard;

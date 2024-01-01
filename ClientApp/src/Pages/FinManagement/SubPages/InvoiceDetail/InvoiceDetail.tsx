import React, { useEffect, useState } from "react";
import "./InvoiceDetail.scss";
import { useParams } from "react-router-dom";
import { invoiceType } from "../../../../../../Serveur/App/Models/Invoice";
import { freelanceType } from "../../../../../../Serveur/App/Models/Freelance";
import { Contexts } from "../../../../Contexts/Contexts";
import { dateFormater, formatAsCurrency, generalGetFunction, phoneFomater } from "../../../../MiddleWear/ClientFunctions";
import { getInvoiceDetailApi, getUtilsApi } from "../../../../MiddleWear/ApiMiddleWear";
import { FinManagementLang } from "../../FinLang";
import { getHashMap } from "../../../Profile/ProfileFunctions";

function InvoiceDetail() {
    const { userLang, setNewAlert, refreshApp, refresh } = Contexts();

    const { id } = useParams();

    const [invoice, setInvoice] = useState<Partial<
        invoiceType & { emmiter?: Partial<freelanceType>; invoiceClient?: Partial<freelanceType> }
    > | null>(null);
    const [wilaya, setWilaya] = useState<any[] | null>(null);
    const [communeEmmiter, setCommuneEmmiter] = useState<any[] | null>(null);
    const [communeCli, setCommuneCli] = useState<any[] | null>(null);

    useEffect(() => {
        if (id) {
            getInvoiceDetail();
        }

        getWilayas();
    }, []);
    useEffect(() => {
        if (adress?.wilaya) {
            getCommunes(adress.wilaya, setCommuneEmmiter);
        }
        if (cliAddres?.wilaya) {
            getCommunes(cliAddres.wilaya, setCommuneCli);
        }
    }, [invoice]);

    const getInvoiceDetail = () => {
        generalGetFunction({
            endPoint: getInvoiceDetailApi(id!),
            successCode: "S74",
            refresh: refreshApp,
            setState: setInvoice,
            setNewAlert,
        });
    };
    const getWilayas = () => {
        generalGetFunction({
            endPoint: getUtilsApi("wilaya"),
            setNewAlert,
            setState: setWilaya,
            refresh: refreshApp,
            successCode: "S52",
            silent: true,
        });
    };
    const getCommunes = (wilToSelect: string, state: Function) => {
        generalGetFunction({
            endPoint: getUtilsApi("commune", `?wilaya=${wilToSelect}`),
            setNewAlert,
            setState: state,
            refresh: refreshApp,
            successCode: "S52",
            silent: true,
        });
    };

    const invNameMap: any = {
        true: "FCT",
        false: "DV",
    };
    const invNumMap: any = {
        true: "",
        false: "00",
    };

    const invTypeMap: any = {
        true: FinManagementLang[userLang].invoice,
        false: FinManagementLang[userLang].quot,
    };
    const isPayedMap: any = {
        true: FinManagementLang[userLang].card.isPayer,
        false: FinManagementLang[userLang].card.isNotPayed,
    };

    const invTypeStyleMap: any = {
        true: "positiveResponse invStyle",
        false: "iddleResponse invStyle",
    };
    const invPayStyleMap: any = {
        true: "positiveResponse invStyle",
        false: "negativeResponse invStyle",
    };

    const {
        emmiter,
        invoiceClient,
        invoiceNumber,
        invoiceDetail,
        grossAmount,
        createdAt,
        lastEdited,
        isInvoice,
        isPayed,
        discount,
        totalAmount,
        invoiceModel,
        invoiceRef,
        invoiceType,
        _id,
    } = invoice || {};
    const { firstName, familyName, adress, email, phone }: Partial<freelanceType> = emmiter || {};
    const {
        firstName: cliFname,
        familyName: cliLname,
        adress: cliAddres,
        email: cliMail,
        phone: cliPhone,
    }: Partial<freelanceType> = invoiceClient || {};
    return (
        <section className="invDetailGeenralContainer customScroll">
            <section className="invoiceContainer">
                <div className="invoiceHeader">
                    <div> {invTypeMap[`${isInvoice}`]} </div>
                    <div>
                        <div>
                            <span> {FinManagementLang[userLang].detail.invoiceNum} </span>
                            {invoiceNumber && (
                                <span> {`${invNameMap[`${isInvoice}`]}-${invNumMap[`${invoiceNumber! >= 100}`]}${invoiceNumber}`} </span>
                            )}
                        </div>
                        <div>
                            <span> {FinManagementLang[userLang].card.created} </span>
                            {createdAt && <span> {dateFormater(createdAt!)} </span>}
                        </div>
                        <div>
                            <span> {FinManagementLang[userLang].card.edited} </span>
                            {lastEdited && <span> {dateFormater(lastEdited!)} </span>}
                        </div>
                    </div>
                </div>
                <div className="invoiceInvolvedContainer">
                    <div>
                        <span> {FinManagementLang[userLang].card.emmiter} </span>
                        <span>
                            {firstName} {familyName}
                        </span>
                        <span> {email} </span>
                        <span dir="ltr"> {phone && phoneFomater(phone!)} </span>
                        <span>
                            <span> {adress?.street} </span> {adress?.street && <span>,</span>}
                            <span> {communeCli && adress?.commune && getHashMap(communeCli, "number")[adress?.commune!]}</span>
                            {adress?.commune && <span>,</span>}
                            <span> {wilaya && adress?.wilaya && getHashMap(wilaya, "wilaya")[adress?.wilaya!]} </span>
                        </span>
                    </div>
                    <div>
                        <span> {FinManagementLang[userLang].card.targer} </span>
                        <span>
                            {cliFname} {cliLname}
                        </span>
                        <span> {cliMail} </span>
                        <span dir="ltr"> {cliPhone && phoneFomater(cliPhone!)} </span>
                        <span>
                            <span> {cliAddres?.street} </span> {cliAddres?.street && <span>,</span>}
                            <span> {communeEmmiter && cliAddres?.commune && getHashMap(communeEmmiter, "number")[cliAddres?.commune!]}</span>
                            {cliAddres?.commune && <span>,</span>}
                            <span> {wilaya && cliAddres?.wilaya && getHashMap(wilaya, "wilaya")[cliAddres?.wilaya!]} </span>
                        </span>
                    </div>
                    <div>
                        <span> {FinManagementLang[userLang].card.totalAmount} </span>
                        <span className="invPriceGene"> {totalAmount && formatAsCurrency(totalAmount!)} </span>
                    </div>
                </div>

                <div className="invoiceDetailContainer">
                    <div className="detailElems detailHeader">
                        <span> {FinManagementLang[userLang].detail.designation} </span>
                        <span> {FinManagementLang[userLang].detail.qte} </span>
                        <span> {FinManagementLang[userLang].detail.price} </span>
                        <span> {FinManagementLang[userLang].detail.discount} </span>
                        <span> {FinManagementLang[userLang].detail.totalPrice} </span>
                    </div>
                    {invoiceDetail &&
                        invoiceDetail.map((invoice, i) => {
                            const { productDiscount, productName, productPrice, productQuantity, productTotalCost } = invoice;
                            return (
                                <div key={i} className="detailElems elemUnderLine">
                                    <span> {productName} </span>
                                    <span> {productQuantity} </span>
                                    <span> {productPrice && formatAsCurrency(productPrice)} </span>
                                    <span> {productDiscount && productDiscount * 100} </span>
                                    <span> {productTotalCost && formatAsCurrency(productTotalCost)} </span>
                                </div>
                            );
                        })}
                    <div className="detailElems">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> {FinManagementLang[userLang].detail.grossTotal} </span>
                        <span> {grossAmount && formatAsCurrency(grossAmount)} </span>
                    </div>
                    <div className="detailElems">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> {FinManagementLang[userLang].detail.discount} </span>
                        <span> {discount && discount * 100} </span>
                    </div>
                    <div className="detailElems">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> {FinManagementLang[userLang].card.totalAmount} </span>
                        <span> {totalAmount && formatAsCurrency(totalAmount)} </span>
                    </div>
                </div>
                <span> {FinManagementLang[userLang].detail.generatedFooter} </span>
            </section>
        </section>
    );
}

export default InvoiceDetail;

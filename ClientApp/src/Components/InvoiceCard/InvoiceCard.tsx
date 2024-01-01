import React from "react";
import "./InvoiceCard.scss";
import { invoiceType } from "../../../../Serveur/App/Models/Invoice";
import { FinManagementLang } from "../../Pages/FinManagement/FinLang";
import { Contexts } from "../../Contexts/Contexts";
import { freelanceType } from "../../../../Serveur/App/Models/Freelance";
import { dateFormater, formatAsCurrency } from "../../MiddleWear/ClientFunctions";
import Button from "../Button/Button";
import Skuleton from "../Skuleton/Skeleton";

function InvoiceCard(
    props: Partial<invoiceType> & {
        skull?: boolean;
        emmiter?: Partial<freelanceType>;
        invoiceClient?: Partial<freelanceType>;
        invoiceDetailFunc?: Function;
    }
) {
    const { userLang } = Contexts();
    const {
        emmiter,
        invoiceClient,
        totalAmount,
        createdAt,
        lastEdited,
        isPayed,
        invoiceNumber,
        isInvoice,
        invoiceType,
        _id,
        invoiceDetailFunc,
        skull,
    } = props;

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

    const { familyName, firstName } = emmiter || {};
    const { familyName: clLN, firstName: clFN } = invoiceClient || {};
    return (
        <div className="invCardGeneralContainer">
            {!skull ? (
                <>
                    <div className="incHeaderContianer">
                        <div>
                            <span> {`${invNameMap[`${isInvoice}`]}-${invNumMap[`${invoiceNumber! >= 100}`]}${invoiceNumber}`} </span>
                        </div>
                        <div className={invTypeStyleMap[`${isInvoice}`]}>{invTypeMap[`${isInvoice}`]} </div>
                    </div>
                    <div>
                        <span> {FinManagementLang[userLang].card.emmiter} </span> <span>:</span>{" "}
                        <span> {`${firstName ? firstName[0] : ""}.${familyName}`} </span>
                    </div>
                    <div>
                        <span> {FinManagementLang[userLang].card.targer} </span> <span>:</span> <span> {`${clFN ? clFN[0] : ""}.${clLN}`} </span>
                    </div>
                    <div>
                        <span> {FinManagementLang[userLang].card.created} </span> <span>:</span> <span> {dateFormater(createdAt!)} </span>
                    </div>
                    <div>
                        <span> {FinManagementLang[userLang].card.edited} </span> <span>:</span> <span> {dateFormater(lastEdited!)} </span>
                    </div>
                    <div>
                        <span> {FinManagementLang[userLang].card.invFor} </span> <span>:</span>
                        <span> {FinManagementLang[userLang].card.type[invoiceType!]} </span>
                    </div>

                    <div className="incHeaderContianer">
                        <div>
                            <span> {FinManagementLang[userLang].card.totalAmount} </span> <span>:</span>{" "}
                            <span> {formatAsCurrency(totalAmount!)} </span>
                        </div>
                        {isInvoice && <div className={invPayStyleMap[`${isPayed}`]}>{isPayedMap[`${isPayed}`]} </div>}
                    </div>

                    {invoiceDetailFunc && (
                        <Button
                            content={FinManagementLang[userLang].card.detailButt}
                            className="pagesNavButton"
                            icon="fi fi-sr-file-invoice"
                            onClick={() => {
                                invoiceDetailFunc(_id);
                            }}
                        />
                    )}
                </>
            ) : (
                <>
                    <Skuleton style={{ width: "15%", borderRadius: "var(--roundRadius)", margin: "0.4rem 0" }} />
                    <Skuleton style={{ width: "50%", borderRadius: "var(--roundRadius)", margin: "0.4rem 0" }} />
                    <Skuleton style={{ width: "60%", borderRadius: "var(--roundRadius)", margin: "0.4rem 0" }} />
                    <Skuleton style={{ width: "50%", borderRadius: "var(--roundRadius)", margin: "0.4rem 0" }} />
                    <Skuleton style={{ width: "50%", borderRadius: "var(--roundRadius)", margin: "0.4rem 0" }} />
                    <Skuleton style={{ width: "30%", borderRadius: "var(--roundRadius)", margin: "0.4rem 0" }} />
                    <Skuleton style={{ width: "70%", borderRadius: "var(--roundRadius)", margin: "0.4rem 0" }} />
                </>
            )}
        </div>
    );
}

export default InvoiceCard;

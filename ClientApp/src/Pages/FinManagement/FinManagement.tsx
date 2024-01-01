import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { URLSearchAdd, URLSearchParse, generalGetFunction } from "../../MiddleWear/ClientFunctions";
import { FinManagementLang } from "./FinLang";
import { Contexts } from "../../Contexts/Contexts";
import { useLocation, useNavigate } from "react-router-dom";
import { invoiceType } from "../../../../Serveur/App/Models/Invoice";
import "../Orders/Orders.scss";
import GridMapper from "../../Components/GripdMapper/GridMapper";
import { getInvoicesApi } from "../../MiddleWear/ApiMiddleWear";
import InvoiceCard from "../../Components/InvoiceCard/InvoiceCard";

function FinManagement() {
    const { userLang, refreshApp, setNewAlert } = Contexts();

    const [invoices, setInvoices] = useState<Partial<invoiceType>[] | null | "empty">(null);

    const navigate = useNavigate();

    const { search } = useLocation();

    const { isInvoice, invoiceType } = URLSearchParse();

    useEffect(() => {
        if (!isInvoice) {
            URLSearchAdd(navigate, { isInvoice: false });
        }
        if (search) {
            getInvoices();
        }
    }, [search]);

    const selectedNav = (name: string, field: string) => {
        if (field == name) {
            return "pagesNavSelected";
        }
        return "";
    };

    const getInvoices = () => {
        generalGetFunction({
            endPoint: getInvoicesApi(search),
            successCode: "S74",
            emptyCode: "E72",
            refresh: refreshApp,
            setNewAlert,
            silent: true,
            setState: setInvoices,
        });
    };

    const navigateToInvoice = (id: string) => {
        navigate(`/fin-management/invoice/${id}`);
    };

    const emptyStrHashMap: any = {
        true: FinManagementLang[userLang].noInvoices,
        false: FinManagementLang[userLang].noQuots,
    };
    return (
        <section className="ordersGeneralContainer">
            <div className="ordersNavContainer">
                <Button
                    className={"pagesNavButton " + selectedNav("false", isInvoice)}
                    icon="fi fi-sr-file-invoice"
                    content={FinManagementLang[userLang].quotsButt}
                    onClick={() => {
                        navigate("?");
                        URLSearchAdd(navigate, { isInvoice: false });
                    }}
                />
                <Button
                    className={"pagesNavButton " + selectedNav("2", invoiceType)}
                    icon="fi fi-sr-file-invoice-dollar"
                    content={FinManagementLang[userLang].invoiceButt}
                    onClick={() => {
                        navigate("?");
                        URLSearchAdd(navigate, { isInvoice: true, invoiceType: 2 });
                    }}
                />
                <Button
                    className={"pagesNavButton " + selectedNav("1", invoiceType)}
                    icon="fi fi-sr-file-invoice-dollar"
                    content={FinManagementLang[userLang].invoiceResourcesButt}
                    onClick={() => {
                        navigate("?");
                        URLSearchAdd(navigate, { isInvoice: true, invoiceType: 1 });
                    }}
                />
                <Button
                    className={"pagesNavButton " + selectedNav("3", invoiceType)}
                    icon="fi fi-sr-file-invoice-dollar"
                    content={FinManagementLang[userLang].invoiceSubButt}
                    onClick={() => {
                        navigate("?");
                        URLSearchAdd(navigate, { isInvoice: true, invoiceType: 3 });
                    }}
                />
            </div>

            <div className="ordersListeContainer">
                <GridMapper toMap={invoices} emptyString={emptyStrHashMap[isInvoice]} emptyIcon="fi fi-sr-file-invoice-dollar">
                    <InvoiceCard invoiceDetailFunc={navigateToInvoice} />
                </GridMapper>
            </div>
        </section>
    );
}

export default FinManagement;

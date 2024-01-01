import express from "express";
import { AuthVerification } from "../MiddleWear/ServerFunctions";
import { addInvoiceApi, deleteInvoice, editInvoice, getAllInvoices, getInvoiceDetail } from "../Controllers/InvoicesControllers";
const InvoicesRoutes = express.Router();

InvoicesRoutes.post("/", AuthVerification, addInvoiceApi);
InvoicesRoutes.post("/edit/:id", AuthVerification, editInvoice);
InvoicesRoutes.get("/", AuthVerification, getAllInvoices);
InvoicesRoutes.get("/:id", AuthVerification, getInvoiceDetail);
InvoicesRoutes.delete("/:id", AuthVerification, deleteInvoice);

export default InvoicesRoutes;

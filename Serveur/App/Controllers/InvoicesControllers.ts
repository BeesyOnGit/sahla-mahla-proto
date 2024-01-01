import { Response, Request } from "express";
import { AddToDailyActivity, Headers, editModelWithSave, populateFromModels } from "../MiddleWear/ServerFunctions";
import { dayilyLogsType } from "../Models/DailyLogs";
import { FilterQuery } from "mongoose";
import dotenv from "dotenv";
import InvoiceModel, { invoiceType, InvoiceDetailType } from "../Models/Invoice";
dotenv.config();

export const addInvoiceApi = async (req: Request, res: Response) => {
    const { body, headers, query } = req;
    const { verifiedId }: Headers = headers;
    // const {  }: Partial<invoiceType> = body;

    try {
        const createInvoice = await InvoiceModel.create({ ...body, emmiter: verifiedId });

        if (!createInvoice) {
            return res.json({ code: "E71" });
        }

        const { _id, invoiceClient } = createInvoice;

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "invoice added",
            concerned: invoiceClient.toString(),
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S71" });
    } catch (error: any) {
        console.log("🚀 ~ file: InvoicesControllers.ts:33 ~ addPlan ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const editInvoice = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    try {
        const filter: FilterQuery<invoiceType> = { _id: id, emmiter: verifiedId };

        const findInvoice = await InvoiceModel.findOne(filter);

        if (!findInvoice) {
            return res.json({ code: "E72" });
        }

        editModelWithSave(findInvoice, body);

        const saveInvoiceChanges = await findInvoice.save();

        if (!saveInvoiceChanges) {
            return res.json({ code: "E73" });
        }

        const { _id } = saveInvoiceChanges;

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "invoice edited",
            concerned: _id.toString(),
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S72" });
    } catch (error: any) {
        console.log("🚀 ~ file: InvoicesControllers.ts:71 ~ editInvoice ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const deleteInvoice = async (req: Request, res: Response) => {
    const { params, headers } = req;
    const { verifiedId }: Headers = headers;
    const { id } = params;

    try {
        const filter: FilterQuery<invoiceType> = { _id: id, emmiter: verifiedId };
        const findInvoice = await InvoiceModel.findOne(filter);

        if (!findInvoice) {
            return res.json({ code: "E72" });
        }

        const deleteInvoiceFromDb = await findInvoice.delete();

        if (!deleteInvoiceFromDb) {
            return res.json({ code: "E74" });
        }

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "invoice removed",
            concerned: id,
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S73" });
    } catch (error: any) {
        console.log("🚀 ~ file: InvoicesControllers.ts:105 ~ deleteInvoice ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const getAllInvoices = async (req: Request, res: Response) => {
    const { headers, query } = req;
    const { verifiedId }: Headers = headers;

    const filter: FilterQuery<invoiceType> = { $or: [{ emmiter: verifiedId }, { invoiceClient: verifiedId }], ...query };

    try {
        const invoices = await InvoiceModel.find(filter).populate({
            path: "emmiter",
            model: "freelance",
            select: "firstName familyName aprouved",
        });

        if (!invoices || invoices.length == 0) {
            return res.json({ code: "E72" });
        }

        for await (const invoice of invoices) {
            await populateFromModels({ doc: invoice, path: "invoiceClient", select: "firstName familyName aprouved" });
        }

        return res.json({ code: "S74", data: invoices });
    } catch (error: any) {
        console.log("🚀 ~ file: InvoicesControllers.ts:125 ~ getAllInvoices ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const getInvoiceDetail = async (req: Request, res: Response) => {
    const { headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;

    const filter: FilterQuery<invoiceType> = { _id: id, $or: [{ emmiter: verifiedId }, { invoiceClient: verifiedId }] };

    try {
        const invoice = await InvoiceModel.findOne(filter).populate({
            path: "emmiter",
            model: "freelance",
            select: "firstName familyName aprouved adress email phone stamp",
        });

        if (!invoice) {
            return res.json({ code: "E72" });
        }

        await populateFromModels({ doc: invoice, path: "invoiceClient", select: "firstName familyName aprouved adress email phone" });

        return res.json({ code: "S74", data: invoice });
    } catch (error: any) {
        console.log("🚀 ~ file: InvoicesControllers.ts:125 ~ getAllInvoices ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const createInvoice = async (invoice: Partial<invoiceType>) => {
    try {
        const addInvoice = await InvoiceModel.create(invoice);
        if (!addInvoice) {
            return false;
        }
        const { _id } = addInvoice;
        return _id.toString();
    } catch (error) {
        console.log("🚀 ~ file: InvoicesControllers.ts:138 ~ addInvoice ~ error:", error);
    }
};

export const makeInvoiceFromQuot = async (id: string) => {
    try {
        const findInvoice = await InvoiceModel.findOne({ _id: id });
        if (!findInvoice) {
            return false;
        }
        findInvoice.isInvoice = true;
        const saveChange = await findInvoice.save();
        if (!saveChange) {
            return false;
        }
        return true;
    } catch (error) {
        console.log("🚀 ~ file: InvoicesControllers.ts:138 ~ addInvoice ~ error:", error);
    }
};

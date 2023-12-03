import { Response, Request } from "express";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import { AddToDailyActivity, Headers, editModelWithSave, hashPassword } from "../MiddleWear/ServerFunctions";
import { sendConfirmationMail } from "./UserConfirmatioControllers";
import { dayilyLogsType } from "../Models/DailyLogs";
import { FilterQuery } from "mongoose";
import ClientModel, { clientType } from "../Models/Clients";

export const editFreelanceInfos = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const { emailConfirmation, phoneConfirmation, createdAt, editedAt, aprouved, ...restEditedInfos }: freelanceType = body;
    try {
        const { email, passWord, phone } = restEditedInfos;

        const currFreelanceInfos = await FreelanceModel.findOne({ _id: verifiedId });

        if (!currFreelanceInfos) {
            return res.json({ code: "E03" });
        }

        const { email: currentMail, phone: currentPhone, firstName } = currFreelanceInfos;

        if (email !== currentMail) {
            sendConfirmationMail(email, 1, firstName);
            currFreelanceInfos.emailConfirmation = false;
        }
        if (phone !== currentPhone) {
            // send otp;
            currFreelanceInfos.phoneConfirmation = false;
        }

        editModelWithSave(currFreelanceInfos, restEditedInfos);

        if (passWord) {
            currFreelanceInfos.passWord = await hashPassword(passWord);
        }

        const saveFreelanceChanges = await currFreelanceInfos.save();

        if (!saveFreelanceChanges) {
            return res.json({ code: "E21" });
        }
        const { _id } = saveFreelanceChanges;

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "account edition",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S21" });
    } catch (error: any) {
        console.log("🚀 ~ file: FreelanceControlers.ts:14 ~ editFreelanceInfos ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const deleteFreelanceAccount = async (req: Request, res: Response) => {
    const { headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const filter: FilterQuery<freelanceType> = { _id: verifiedId };
    try {
        const freelanceExists = await FreelanceModel.findOne(filter);

        if (!freelanceExists) {
            return res.json({ code: "E03" });
        }

        const deleteFreelance = await FreelanceModel.findOneAndDelete(filter);

        if (!deleteFreelance) {
            return res.json({ code: "E22" });
        }

        const { _id } = deleteFreelance;

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "account deletion",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S22" });
    } catch (error: any) {
        console.log("🚀 ~ file: FreelanceControlers.ts:14 ~ editFreelanceInfos ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const editClientInfos = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const { emailConfirmation, phoneConfirmation, createdAt, editedAt, aprouved, ...restEditedInfos }: clientType = body;
    try {
        const { email, passWord, phone } = restEditedInfos;

        const currClientInfos = await ClientModel.findOne({ _id: verifiedId });

        if (!currClientInfos) {
            return res.json({ code: "E03" });
        }

        const { email: currentMail, phone: currentPhone, firstName } = currClientInfos;

        if (email !== currentMail) {
            sendConfirmationMail(email, 1, firstName);
            currClientInfos.emailConfirmation = false;
        }
        if (phone !== currentPhone) {
            // send otp;
            currClientInfos.phoneConfirmation = false;
        }

        editModelWithSave(currClientInfos, restEditedInfos);

        if (passWord) {
            currClientInfos.passWord = await hashPassword(passWord);
        }

        const saveClientChanges = await currClientInfos.save();

        if (!saveClientChanges) {
            return res.json({ code: "E21" });
        }
        const { _id } = saveClientChanges;

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "account edition",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S21" });
    } catch (error: any) {
        console.log("🚀 ~ file: AccountControlers.ts:140 ~ editClientInfos ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const deleteClientAccount = async (req: Request, res: Response) => {
    const { headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const filter: FilterQuery<clientType> = { _id: verifiedId };
    try {
        const ClientExists = await ClientModel.findOne(filter);

        if (!ClientExists) {
            return res.json({ code: "E03" });
        }

        const deleteClient = await ClientModel.findOneAndDelete(filter);

        if (!deleteClient) {
            return res.json({ code: "E22" });
        }

        const { _id } = deleteClient;

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "account deletion",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S22" });
    } catch (error: any) {
        console.log("🚀 ~ file: AccountControlers.ts:173 ~ deleteClientAccount ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

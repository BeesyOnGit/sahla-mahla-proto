import { Response, Request } from "express";
import {
    AddToDailyActivity,
    encryptBillingInfos,
    generateToken,
    hashPassword,
    matchPasswords,
    randomIdGenerator,
} from "../MiddleWear/ServerFunctions";
import jwt from "jsonwebtoken";
import cryptoJs from "crypto-js";
import dotenv from "dotenv";
import { TokenVerifier } from "../MiddleWear/ServerFunctions";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import { sendConfirmationMail } from "./EmailsControllers";
import { FilterQuery } from "mongoose";
import ClientModel, { clientType } from "../Models/Clients";
dotenv.config();

export const freelanceRegister = async (req: Request, res: Response) => {
    const { body } = req;
    const { email, phone, passWord, billing }: freelanceType = body;

    try {
        const hashedPass = await hashPassword(passWord);
        const tmpBillAcount = billing.accountNumber;
        const hashedBillingAccount = encryptBillingInfos(tmpBillAcount);
        const endWith = tmpBillAcount.slice(tmpBillAcount.length - 4, tmpBillAcount.length);

        const newFreelanceAccount = {
            ...body,
            passWord: hashedPass,
            billing: {
                ...billing,
                accountNumber: hashedBillingAccount,
                accountEndWith: endWith,
            },
        };

        // email confirmation
        const randomConfirmation = `${randomIdGenerator(40)}-${randomIdGenerator(40)}-${randomIdGenerator(40)}-1`;
        const sendMail = await sendConfirmationMail(email, randomConfirmation);

        if (!sendMail) {
            return res.json({ code: "ER" });
        }

        //freelance registration
        const registerFreelance = await FreelanceModel.create(newFreelanceAccount);

        if (!registerFreelance) {
            return res.json({ code: "ER" });
        }

        return res.json({ code: "S01" });
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts:26 ~ freelanceRegister ~ error:", error);

        if (error.keyValue && error.keyValue.email) {
            return res.json({ code: "E01" });
        }
        if (error.keyValue && error.keyValue.phone) {
            return res.json({ code: "E02" });
        }
        return res.json({ code: "EO", error: error.message });
    }
};

export const freelanceLogin = async (req: Request, res: Response) => {
    const { body }: { body: Partial<freelanceType> } = req;
    const { phone, email, passWord } = body;
    try {
        const filter: FilterQuery<freelanceType> = { $or: [{ phone }, { email }] };

        const findFreelance = await FreelanceModel.findOne(filter);

        if (!findFreelance) {
            return res.json({ code: "E03" });
        }

        const { _id, passWord: dbPassWord, emailConfirmation } = findFreelance;

        if (emailConfirmation) {
            return res.json({ code: "E06" });
        }

        const passWordMatch = await matchPasswords(dbPassWord, passWord!);

        if (!passWordMatch) {
            return res.json({ code: "E05" });
        }

        const token = generateToken(_id.toString());

        return res.json({ code: "S02", token });
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts:64 ~ freelanceLogin ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const clientRegister = async (req: Request, res: Response) => {
    const { body } = req;
    const { email, phone, passWord, billing }: clientType = body;

    try {
        const hashedPass = await hashPassword(passWord);
        const tmpBillAcount = billing.accountNumber;
        const hashedBillingAccount = encryptBillingInfos(tmpBillAcount);
        const endWith = tmpBillAcount.slice(tmpBillAcount.length - 4, tmpBillAcount.length);

        const newClientAccount = {
            ...body,
            passWord: hashedPass,
            billing: {
                ...billing,
                accountNumber: hashedBillingAccount,
                accountEndWith: endWith,
            },
        };

        // email confirmation
        const randomConfirmation = `${randomIdGenerator(40)}-${randomIdGenerator(40)}-${randomIdGenerator(40)}-2`;
        const sendMail = await sendConfirmationMail(email, randomConfirmation);

        if (!sendMail) {
            return res.json({ code: "ER" });
        }

        //Client registration
        const registerClient = await ClientModel.create(newClientAccount);

        if (!registerClient) {
            return res.json({ code: "ER" });
        }

        return res.json({ code: "S01" });
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts:126 ~ clientRegister ~ error:", error);

        if (error.keyValue && error.keyValue.email) {
            return res.json({ code: "E01" });
        }
        if (error.keyValue && error.keyValue.phone) {
            return res.json({ code: "E02" });
        }
        return res.json({ code: "EO", error: error.message });
    }
};

export const clientLogin = async (req: Request, res: Response) => {
    const { body }: { body: Partial<clientType> } = req;
    const { phone, email, passWord } = body;
    try {
        const filter: FilterQuery<clientType> = { $or: [{ phone }, { email }] };

        const findClient = await ClientModel.findOne(filter);

        if (!findClient) {
            return res.json({ code: "E03" });
        }

        const { _id, passWord: dbPassWord, emailConfirmation } = findClient;

        if (emailConfirmation) {
            return res.json({ code: "E06" });
        }

        const passWordMatch = await matchPasswords(dbPassWord, passWord!);

        if (!passWordMatch) {
            return res.json({ code: "E05" });
        }

        const token = generateToken(_id.toString());

        return res.json({ code: "S04", token });
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts:162 ~ clientLogin ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

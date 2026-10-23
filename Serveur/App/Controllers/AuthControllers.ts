import { Response, Request } from "express";
import {
    AddToDailyActivity,
    Headers,
    encryptString,
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
import { sendConfirmationMail } from "./UserConfirmatioControllers";
import { FilterQuery } from "mongoose";
import ClientModel, { clientType } from "../Models/Clients";
import { dayilyLogsType } from "../Models/DailyLogs";
import UserSequencesModel from "../Models/UsersSequences";
dotenv.config();

export const freelanceRegister = async (req: Request, res: Response) => {
    const { body } = req;
    const { email, phone, passWord, billing, firstName }: freelanceType = body;

    try {
        const hashedPass = await hashPassword(passWord);
        const tmpBillAcount = billing.accountNumber;
        const hashedBillingAccount = encryptString(tmpBillAcount);
        const endWith = tmpBillAcount.slice(tmpBillAcount.length - 4, tmpBillAcount.length);

        const newFreelanceAccount = {
            ...body,
            passWord: hashedPass,
            // Accounts are validated directly (no email confirmation step)
            emailConfirmation: true,
            phoneConfirmation: true,
            billing: {
                ...billing,
                accountNumber: hashedBillingAccount,
                accountEndWith: endWith,
            },
        };

        // email confirmation (disabled: accounts are validated directly)
        // const sendMail = await sendConfirmationMail(email, 1, firstName);

        // if (!sendMail) {
        //     return res.json({ code: "ER" });
        // }

        //freelance registration
        const registerFreelance = await FreelanceModel.create(newFreelanceAccount);

        if (!registerFreelance) {
            return res.json({ code: "ER" });
        }
        const { _id } = registerFreelance;

        const createSequence = await UserSequencesModel.create({ user: _id });

        if (!createSequence) {
            return res.json({ code: "ER" });
        }

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "register freelance",
        };

        AddToDailyActivity(activity);

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
    const { body }: { body: { id: string; passWord: string } } = req;
    const { id, passWord } = body;
    try {
        const filter: FilterQuery<freelanceType> = { $or: [{ phone: id }, { email: id }] };

        const findFreelance = await FreelanceModel.findOne(filter);

        if (!findFreelance) {
            return res.json({ code: "E03" });
        }

        const { _id, passWord: dbPassWord, emailConfirmation } = findFreelance;

        if (!emailConfirmation) {
            return res.json({ code: "E06" });
        }

        const passWordMatch = await matchPasswords(dbPassWord, passWord!);

        if (!passWordMatch) {
            return res.json({ code: "E05" });
        }

        const token = generateToken(_id.toString());

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "login freelance",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S02", token });
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts:64 ~ freelanceLogin ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const clientRegister = async (req: Request, res: Response) => {
    const { body } = req;
    const { email, phone, passWord, billing, firstName }: clientType = body;

    try {
        const hashedPass = await hashPassword(passWord);
        const tmpBillAcount = billing.accountNumber;
        const hashedBillingAccount = encryptString(tmpBillAcount);
        const endWith = tmpBillAcount.slice(tmpBillAcount.length - 4, tmpBillAcount.length);

        const newClientAccount = {
            ...body,
            passWord: hashedPass,
            // Accounts are validated directly (no email confirmation step)
            emailConfirmation: true,
            phoneConfirmation: true,
            billing: {
                ...billing,
                accountNumber: hashedBillingAccount,
                accountEndWith: endWith,
            },
        };

        // email confirmation (disabled: accounts are validated directly)
        // const sendMail = await sendConfirmationMail(email, 2, firstName);

        // if (!sendMail) {
        //     return res.json({ code: "ER" });
        // }

        //Client registration
        const registerClient = await ClientModel.create(newClientAccount);

        if (!registerClient) {
            return res.json({ code: "ER" });
        }

        const { _id } = registerClient;

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "register client",
        };

        AddToDailyActivity(activity);

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
    const { body }: { body: { id: string; passWord: string } } = req;
    const { id, passWord } = body;
    try {
        const filter: FilterQuery<clientType> = { $or: [{ phone: id }, { email: id }] };

        const findClient = await ClientModel.findOne(filter);

        if (!findClient) {
            return res.json({ code: "E03" });
        }

        const { _id, passWord: dbPassWord, emailConfirmation } = findClient;

        if (!emailConfirmation) {
            return res.json({ code: "E06" });
        }

        const passWordMatch = await matchPasswords(dbPassWord, passWord!);

        if (!passWordMatch) {
            return res.json({ code: "E05" });
        }

        const token = generateToken(_id.toString());

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "login client",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S04", token });
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts:162 ~ clientLogin ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const userAuth = async (req: Request, res: Response) => {
    const { headers }: { headers: Headers } = req;
    const { authorizationtoken }: Headers = headers;
    try {
        let data: userAuthDataType = { auth: false, userType: 0, validMail: false, validPhone: false };

        if (!authorizationtoken) {
            return res.json({ code: "E07" });
        }
        const verifiedToken: any = TokenVerifier(authorizationtoken);

        if (!verifiedToken) {
            return res.json({ code: "ET" });
        }

        const { id: _id } = verifiedToken;
        const filter: FilterQuery<clientType | freelanceType> = { _id };

        const findClient = await ClientModel.findOne(filter);
        if (findClient) {
            const { emailConfirmation, phoneConfirmation } = findClient;
            data.userType = 2;
            data.auth = true;
            data.validMail = emailConfirmation;
            data.validPhone = phoneConfirmation;
        }

        const findFreelance = await FreelanceModel.findOne(filter);
        if (findFreelance) {
            const { emailConfirmation, phoneConfirmation } = findFreelance;
            data.userType = 1;
            data.auth = true;
            data.validMail = emailConfirmation;
            data.validPhone = phoneConfirmation;
        }

        if (!findClient && !findFreelance) {
            return res.json({ code: "E03" });
        }

        return res.json({ code: "S04", data });
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts:248 ~ userAuth ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

// Demo mode (DEMO_MODE=true): one confirmed client and one confirmed freelance, shown on the login page
const demoAccounts = () => ({
    client: { id: "demo.client@sahla-mahla.com", passWord: process.env.DEMO_PASSWORD || "demo1234" },
    freelance: { id: "demo.freelance@sahla-mahla.com", passWord: process.env.DEMO_PASSWORD || "demo1234" },
});

// Creates the demo accounts, or resets them (password included) on every start
export const seedDemoAccounts = async () => {
    if (process.env.DEMO_MODE !== "true") return;
    try {
        const { client, freelance } = demoAccounts();
        const common = {
            familyName: "demo",
            dob: new Date("1990-01-01").getTime(),
            emailConfirmation: true,
            phoneConfirmation: true,
            aprouved: true,
            IDcard: ["demo"],
            "billing.accountNumber": String(encryptString("00000000000000000000")),
            "billing.accountEndWith": "0000",
        };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await ClientModel.findOneAndUpdate(
            { email: client.id },
            { ...common, firstName: "client", phone: "0500000001", passWord: await hashPassword(client.passWord) },
            options
        );
        const demoFreelance = await FreelanceModel.findOneAndUpdate(
            { email: freelance.id },
            { ...common, firstName: "freelance", phone: "0500000002", passWord: await hashPassword(freelance.passWord) },
            options
        );
        await UserSequencesModel.updateOne({ user: demoFreelance!._id }, { $setOnInsert: { invoiceSeq: 1 } }, { upsert: true });
        console.log("Demo accounts ready");
    } catch (error: any) {
        console.log("🚀 ~ file: AuthControllers.ts ~ seedDemoAccounts ~ error:", error);
    }
};

export const demoCredentials = (req: Request, res: Response) => {
    if (process.env.DEMO_MODE !== "true") {
        return res.json({ code: "E03" });
    }
    return res.json({ code: "S04", data: demoAccounts() });
};

export type userAuthDataType = {
    auth: boolean;
    userType: 0 | 1 | 2;
    validMail: boolean;
    validPhone: boolean;
};

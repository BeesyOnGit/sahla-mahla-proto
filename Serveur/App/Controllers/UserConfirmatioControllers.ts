import { Response, Request } from "express";
import dotenv from "dotenv";
import nodeMailer from "nodemailer";
import EmailConfirmModel from "../Models/UsersConfirmation";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import ClientModel, { clientType } from "../Models/Clients";
import { passResetMailTemplate, validationMailTemplate } from "../EmailsTemplats/EmailTemplates";
import { FilterQuery } from "mongoose";
import { hashPassword, randomIdGenerator } from "../MiddleWear/ServerFunctions";

dotenv.config();

const serverDomaine = process.env.SERVER_DOMAIN;

export const sendConfirmationMailApi = async (req: Request, res: Response) => {
    const { body } = req;

    const { email, type } = body;
    try {
        const userFilter: FilterQuery<freelanceType | clientType> = { email };
        const isUser = (await FreelanceModel.findOne(userFilter)) || (await ClientModel.findOne(userFilter));

        if (!isUser) {
            return res.json({ code: "E03" });
        }

        const { firstName } = isUser;
        const confirmationString = `${randomIdGenerator(40)}-${randomIdGenerator(40)}-${randomIdGenerator(40)}-${type}`;

        const emailRecord = await EmailConfirmModel.create({ email, rndConfirmation: confirmationString });

        if (!emailRecord) {
            return false;
        }

        const url = `${serverDomaine}/confirmation/email/${confirmationString}`;

        //send mail logic
        const mailConfig: sendMailType = {
            mailToUse: "no-reply",
            to: email,
            subject: "Sahla & Mahla Email Confirmation",
            text: `this is the link to confirm your email : ${url}`,
            html: validationMailTemplate(url, firstName),
        };
        const mailDelivery = await sendEmail(mailConfig);

        if (!mailDelivery) {
            return res.json({ code: "E16" });
        }

        return res.json({ code: "S12" });
    } catch (error: any) {
        console.log("🚀 ~ file: UserConfirmatioControllers.ts:112 ~ sendConfirmationMailApi ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const sendpassResetMail = async (req: Request, res: Response) => {
    const { body } = req;

    const { email, type } = body;
    try {
        const userFilter: FilterQuery<freelanceType | clientType> = { email };
        const isUser = (await FreelanceModel.findOne(userFilter)) || (await ClientModel.findOne(userFilter));

        if (!isUser) {
            return res.json({ code: "E03" });
        }

        const confirmationString = `${randomIdGenerator(40)}-${randomIdGenerator(40)}-${randomIdGenerator(40)}-${type}`;

        const emailRecord = await EmailConfirmModel.create({ email, rndConfirmation: confirmationString });

        if (!emailRecord) {
            return false;
        }

        const url = `${serverDomaine}/confirmation/password-reset/${confirmationString}`;

        //send mail logic
        const mailConfig: sendMailType = {
            mailToUse: "no-reply",
            to: email,
            subject: "Sahla & Mahla Password Reset",
            text: `this is the link to reset your password : ${url}`,
            html: passResetMailTemplate(url, email),
        };
        const mailDelivery = await sendEmail(mailConfig);

        if (!mailDelivery) {
            return res.json({ code: "E16" });
        }

        return res.json({ code: "S12" });
    } catch (error: any) {
        console.log("🚀 ~ file: UserConfirmatioControllers.ts:97 ~ sendpassResetMail ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const confirmEmail = async (req: Request, res: Response) => {
    const { params } = req;
    const { confirmString } = params;

    const DbModelUsage: any = {
        1: FreelanceModel,
        2: ClientModel,
    };

    const requestDate = new Date().getTime();
    try {
        if (!confirmString) {
            return res.json({ code: "E14" });
        }

        const dbtoUse: any = confirmString[confirmString.length - 1];

        const emailConfirmation = await EmailConfirmModel.findOne({ rndConfirmation: confirmString });

        if (!emailConfirmation) {
            return res.json({ code: "E11" });
        }

        const { email, validUpTo, createdAt, used } = emailConfirmation;

        if (used) {
            return res.json({ code: "E15" });
        }

        if (requestDate < createdAt) {
            return res.json({ code: "E12" });
        }
        if (requestDate > validUpTo) {
            return res.json({ code: "E13" });
        }

        const validateMail = await DbModelUsage[dbtoUse].findOne({ email });

        if (!validateMail) {
            return res.json({ code: "E03" });
        }
        if (validateMail.emailConfirmation) {
            return res.json({ code: "E17" });
        }

        validateMail.emailConfirmation = true;

        const saveUsersChanges = await validateMail.save();
        emailConfirmation.used = true;
        emailConfirmation.save();

        if (!saveUsersChanges) {
            return res.json({ code: "E04" });
        }

        return res.json({ code: "S11" });
    } catch (error: any) {
        console.log("🚀 ~ file: UserConfirmatioControllers.ts:226 ~ confirmEmail ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const resetPassword = async (req: Request, res: Response) => {
    const { params, body } = req;
    const { confirmString } = params;
    const { newPassWord } = body;

    const DbModelUsage: any = {
        1: FreelanceModel,
        2: ClientModel,
    };

    const requestDate = new Date().getTime();
    try {
        if (!confirmString) {
            return res.json({ code: "E14" });
        }

        const dbtoUse: any = confirmString[confirmString.length - 1];

        const recordToChangePassword = await EmailConfirmModel.findOne({ rndConfirmation: confirmString });

        if (!recordToChangePassword) {
            return res.json({ code: "E11" });
        }

        const { email, validUpTo, createdAt, used } = recordToChangePassword;

        if (used) {
            return res.json({ code: "E15" });
        }
        if (requestDate < createdAt) {
            return res.json({ code: "E12" });
        }
        if (requestDate > validUpTo) {
            return res.json({ code: "E13" });
        }

        const changePassword = await DbModelUsage[dbtoUse].findOne({ email });

        if (!changePassword) {
            return res.json({ code: "E03" });
        }

        changePassword.passWord = await hashPassword(newPassWord);

        const saveUsersChanges = await changePassword.save();
        recordToChangePassword.used = true;
        recordToChangePassword.save();

        if (!saveUsersChanges) {
            return res.json({ code: "E04" });
        }

        return res.json({ code: "S11" });
    } catch (error: any) {
        console.log("🚀 ~ file: UserConfirmatioControllers.ts:284 ~ resetPassword ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export type sendMailType = {
    mailToUse: "no-reply" | "contact";
    to: string;
    subject: string;
    text: string;
    html: string;
};
export const sendConfirmationMail = async (email: string, confirmationString: string, userFname: string) => {
    try {
        const emailRecord = await EmailConfirmModel.create({ email, rndConfirmation: confirmationString });

        if (!emailRecord) {
            return false;
        }

        const url = `${serverDomaine}/confirmation/email/${confirmationString}`;

        //send mail logic
        const mailConfig: sendMailType = {
            mailToUse: "no-reply",
            to: email,
            subject: "Sahla & Mahla Email Confirmation",
            text: `this is the link to confirm your email : ${url}`,
            html: validationMailTemplate(url, userFname),
        };
        const mailDelivery = await sendEmail(mailConfig);

        if (!mailDelivery) {
            return false;
        }
        return true;
    } catch (error) {
        console.log("🚀 ~ file: EmailsControllers.ts:7 ~ sendConfirmationMail ~ error:", error);
        return false;
    }
};

const sendEmail = async ({ mailToUse, to, text, html, subject }: sendMailType) => {
    const mailsPreset: any = {
        "no-reply": {
            user: "no-reply@arabatii.com",
            pass: "x1rCmH#Adjgjxy5K",
            from: "NO-REPLY Sahla & Mahla no-reply@arabatii.com",
        },
    };
    try {
        const transporter = nodeMailer.createTransport({
            host: "arabatii.com",
            port: 465,
            secure: true,
            auth: {
                user: mailsPreset[mailToUse].user,
                pass: mailsPreset[mailToUse].pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const info = await transporter.sendMail({
            from: mailsPreset[mailToUse].from, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        if (!info) {
            return false;
        }

        console.log("mail sent");

        return true;
    } catch (error) {
        console.log("🚀 ~ file: UserConfirmatioControllers.ts:19 ~ sendEmail ~ error:", error);
        return false;
    }
};

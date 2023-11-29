import { Response, Request } from "express";
import nodeMailer from "nodemailer";
import EmailConfirmModel from "../Models/UsersConfirmation";
import FreelanceModel from "../Models/Freelance";
import ClientModel from "../Models/Clients";

export const sendConfirmationMail = async (email: string, random: string) => {
    try {
        const emailRecord = await EmailConfirmModel.create({ email, rndConfirmation: random });

        if (!emailRecord) {
            return false;
        }

        const url = `http://localhost:3000/email/confirm/${random}`;

        //send mail logic
        const transporter = nodeMailer.createTransport({
            host: "arabatii.com",
            port: 465,
            secure: true,
            auth: {
                user: "no-reply@arabatii.com",
                pass: "x1rCmH#Adjgjxy5K",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const info = await transporter.sendMail({
            from: '"NO-REPLY Sahla & Mahla" <no-reply@arabatii.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "mail confirmation", // Subject line
            text: `this is the link to confirm your mail : ${url}`, // plain text body
            html: `<a href=${url}>click to confirm your mail</a>`, // html body
        });

        if (!info) {
            return false;
        }

        console.log("email sent");

        return true;
    } catch (error) {
        console.log("🚀 ~ file: EmailsControllers.ts:7 ~ sendConfirmationMail ~ error:", error);
        return false;
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

        const { email, validUpTo, createdAt } = emailConfirmation;

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

        validateMail.emailConfirmation = true;

        const saveUsersChanges = await validateMail.save();
        emailConfirmation.used = true;
        emailConfirmation.save();

        if (!saveUsersChanges) {
            return res.json({ code: "E04" });
        }

        return res.json({ code: "S11" });
    } catch (error: any) {
        console.log("🚀 ~ file: EmailsControllers.ts:7 ~ sendConfirmationMail ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

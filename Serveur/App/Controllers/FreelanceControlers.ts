import { Response, Request } from "express";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import { Headers, editModelWithSave, hashPassword } from "../MiddleWear/ServerFunctions";
import { sendConfirmationMail } from "./UserConfirmatioControllers";

export const editFreelanceInfos = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const { emailConfirmation, phoneConfirmation, createdAt, editedAt, aprouved, ...restEditedInfos }: freelanceType = body;
    try {
        const { email, passWord, phone } = restEditedInfos;

        const currFreelanceInfos = await FreelanceModel.findOne({ _id: verifiedId });

        if (!currFreelanceInfos) {
            return res.json({ code: "E0" });
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
            return res.json({ code: "E" });
        }

        return res.json({ code: "S" });
    } catch (error: any) {
        console.log("🚀 ~ file: FreelanceControlers.ts:14 ~ editFreelanceInfos ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

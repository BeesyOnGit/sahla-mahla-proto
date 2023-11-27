import { Response, Request } from "express";
import { AddToDailyActivity } from "../MiddleWear/ServerFunctions";
import jwt from "jsonwebtoken";
import cryptoJs from "crypto-js";
import dotenv from "dotenv";
import { TokenVerifier } from "../MiddleWear/ServerFunctions";
dotenv.config();

export const showRoomLogin = async (req: Request, res: Response) => {
    const { body } = req;
    const { email, SCode, phone, passWord } = body;
    const sellerFilter = { $or: [{ SCode }, { email }, { phone }] };

    try {
    } catch (error) {
        console.log("🚀 ~ file: AuthControllers.ts:36 ~ ShowRoomLogin ~ error:", error);
    }
};

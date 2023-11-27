import { Request, Response } from "express";
import { FilesSavingAsync } from "../MiddleWear/ServerFunctions";
import dotenv from "dotenv";

dotenv.config();
const path = process.env.MEDIA_SAVE_PATH;
const serverUrl = process.env.SERVER_URL;

export const addMedia = async (req: Request, res: Response) => {
    const { body } = req;
    const { picture } = body;
    try {
        const fileName = await FilesSavingAsync({ data: picture, savePath: path! });
        const url = `${serverUrl}/${fileName}`;
        return res.json({ code: "10", url });
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:12 ~ addMedia ~ error:", error);
    }
};
export const getMedia = (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    try {
        const fileName = id.split("/")[0];

        if (!fileName.includes(".webp")) {
            return res.json({ code: "001" });
        }

        return res.sendFile(`${path}/${fileName}`);
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:25 ~ getMedia ~ error:", error);
    }
};

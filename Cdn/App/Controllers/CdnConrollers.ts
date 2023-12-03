import { Request, Response } from "express";
import { FilesSavingAsync, randomIdGenerator, saveImageAsync, thumbnailResource, watermarkResource } from "../MiddleWear/ServerFunctions";

import dotenv from "dotenv";

dotenv.config();
const path = process.env.MEDIA_SAVE_PATH;
const resourcesPath = process.env.RESOURCES_SAVE_PATH;
const serverUrl = process.env.SERVER_URL;
const resourcesUrl = process.env.SERVER_RESOURCES_URL;

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
export const saveResource = async (req: Request, res: Response) => {
    const { body } = req;
    const { image } = body;
    try {
        const fileName = `${randomIdGenerator(10)}-${randomIdGenerator(10)}`;

        const saveOriginalImage = await saveImageAsync({ data: image, savePath: resourcesPath!, fileName });

        if (!saveOriginalImage) {
            return res.json({ code: "E101" });
        }

        const TumbnailBuffer = await thumbnailResource({ data: image, width: 200 });
        const thumbnailFileName = `${fileName}-thumb`;
        const saveThumbnail = await saveImageAsync({ data: TumbnailBuffer, savePath: path!, fileName: thumbnailFileName, buffer: true });

        if (!saveThumbnail) {
            return res.json({ code: "E101" });
        }

        const watermarkBuffer = await watermarkResource({ data: image, width: 800 });
        const WatermarkFileName = `${fileName}-general`;
        const saveWatermark = await saveImageAsync({ data: watermarkBuffer, savePath: path!, fileName: WatermarkFileName, buffer: true });

        if (!saveWatermark) {
            return res.json({ code: "E101" });
        }

        const url = {
            resourceLink: `${resourcesUrl}/${saveOriginalImage}`,
            resourceThumbnail: `${serverUrl}/${saveThumbnail}`,
            resourceWaterLink: `${serverUrl}/${saveWatermark}`,
        };
        return res.json({ code: "S101", url });
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
export const getResources = (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    try {
        const fileName = id.split("/")[0];

        if (!fileName.includes(".webp")) {
            return res.json({ code: "001" });
        }

        // Check Ownership
        return res.download(`${resourcesPath}/${fileName}`);
        // return res.sendFile(`${resourcesPath}/${fileName}`);
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:25 ~ getMedia ~ error:", error);
    }
};

import { Request, Response } from "express";
import {
    FilesSavingAsync,
    TokenVerifier,
    randomIdGenerator,
    removeFile,
    saveImageAsync,
    thumbnailResource,
    watermarkResource,
} from "../MiddleWear/ServerFunctions";

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
        return res.json({ code: "10", data: url });
    } catch (error: any) {
        console.log("🚀 ~ file: CdnConrollers.ts:12 ~ addMedia ~ error:", error);
        return res.json({ code: "EO", data: error.message });
    }
};
export const saveResource = async (req: Request, res: Response) => {
    const { body } = req;
    const { resource, owner } = body;
    try {
        if (!owner) {
            return res.json({ code: "E103" });
        }
        const fileName = `${randomIdGenerator(10)}-${randomIdGenerator(10)}`;
        const resUserPath = `${resourcesPath}/${owner}`;
        const saveOriginalImage = await saveImageAsync({ data: resource, savePath: resUserPath, fileName });

        if (!saveOriginalImage) {
            return res.json({ code: "E101" });
        }

        const TumbnailBuffer = await thumbnailResource({ data: resource, width: 200 });
        if (!TumbnailBuffer) {
            return res.json({ code: "E102" });
        }
        const thumbnailFileName = `${fileName}-thumb`;
        const resUserThumbPath = `${path}/${owner}`;
        const saveThumbnail = await saveImageAsync({ data: TumbnailBuffer, savePath: resUserThumbPath, fileName: thumbnailFileName, buffer: true });

        if (!saveThumbnail) {
            return res.json({ code: "E101" });
        }

        const watermarkBuffer = await watermarkResource({ data: resource, width: 800 });
        if (!watermarkBuffer) {
            return res.json({ code: "E102" });
        }
        const WatermarkFileName = `${fileName}-general`;
        const resUserWaterPath = `${path}/${owner}`;
        const saveWatermark = await saveImageAsync({ data: watermarkBuffer, savePath: resUserWaterPath, fileName: WatermarkFileName, buffer: true });

        if (!saveWatermark) {
            return res.json({ code: "E101" });
        }

        const url = {
            resourceLink: `${resourcesUrl}/${owner}/${saveOriginalImage}`,
            resourceThumbnail: `${serverUrl}/${saveThumbnail}/${owner}`,
            resourceWaterLink: `${serverUrl}/${saveWatermark}/${owner}`,
        };
        return res.json({ code: "S101", url });
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:12 ~ addMedia ~ error:", error);
        return res.json({ code: "E101" });
    }
};

export const saveUserFile = async (req: Request, res: Response) => {
    const { body, headers } = req;
    let { resource, owner } = body;
    const { authorizationtoken }: any = headers;
    try {
        if (!owner) {
            owner = TokenVerifier(authorizationtoken)!.id;
            if (!owner) {
                return res.json({ code: "E103" });
            }
        }
        const fileName = `${randomIdGenerator(10)}-${randomIdGenerator(10)}`;
        const resUserPath = `${resourcesPath}/${owner}`;
        const saveOriginalImage = await saveImageAsync({ data: resource, savePath: resUserPath, fileName });

        if (!saveOriginalImage) {
            return res.json({ code: "E101" });
        }

        const url = `${resourcesUrl}/${owner}/${saveOriginalImage}`;
        return res.json({ code: "S101", data: url });
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:12 ~ addMedia ~ error:", error);
        return res.json({ code: "E101" });
    }
};

export const getMedia = (req: Request, res: Response) => {
    const { params } = req;
    const { id, folder } = params;
    try {
        const fileName = id.split("/")[0];

        return res.sendFile(`${path}${folder ? `/${folder}/` : "/"}${fileName}`);
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:25 ~ getMedia ~ error:", error);
        return res.json({ code: "E104" });
    }
};
export const getResources = (req: Request, res: Response) => {
    const { params } = req;
    const { id, folder } = params;
    try {
        const fileName = id.split("/")[0];

        // Check Ownership
        return res.download(`${resourcesPath}/${folder}/${fileName}`);
        // return res.sendFile(`${resourcesPath}/${fileName}`);
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:25 ~ getMedia ~ error:", error);
        return res.json({ code: "E104" });
    }
};

export const removeResource = async (req: Request, res: Response) => {
    const { params, path: urlPath } = req;
    const { id, folder } = params;
    try {
        const fileName = id.split("/")[0];

        if (urlPath.includes("resources")) {
            const Path = `${resourcesPath}/${folder}/${fileName}`;
            await removeFile(Path);
            return res.json({ code: "S102" });
        }
        const Path = `${path}${folder ? `/${folder}/` : "/"}${fileName}`;
        await removeFile(Path);
        return res.json({ code: "S102" });
    } catch (error) {
        console.log("🚀 ~ file: CdnConrollers.ts:104 ~ removeResource ~ error:", error);
        return res.json({ code: "E104" });
    }
};

import { writeFile, rm } from "fs/promises";
import { createCanvas, loadImage } from "canvas";
import { mimeToFormats } from "./formatMimes";
import fs from "fs";

export const FilesSavingAsync = ({ data, savePath }: { data: string; savePath: string }) => {
    const Path = savePath;
    try {
        return new Promise(async (resolve) => {
            const finalName = `${randomIdGenerator(15)}-${randomIdGenerator(15)}.webp`;
            const FInalUrl = `${Path}/${finalName}`;
            const checkDir = await ensureDirectoryExists(Path);

            if (!checkDir) {
                return resolve(false);
            }
            await writeFile(FInalUrl, urltoArrayBuffer({ url: data })!);
            return resolve(finalName);
        });
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:15 ~ FilesSavingAsync ~ error:", error);
    }
};

export type saveImgType = {
    data: any;
    savePath: string;
    fileName: string;
    buffer?: boolean;
};
export const saveImageAsync = ({ data, savePath, fileName, buffer }: saveImgType) => {
    const Path = savePath;
    try {
        return new Promise<string>(async (resolve) => {
            try {
                if (!buffer) {
                    const fileExtention = mimeToFormats[data.split(";base64,")[0].split(":")[1]];
                    const FInalUrl = `${Path}/${fileName}.${fileExtention}`;
                    const url: any = data;
                    const checkDir = await ensureDirectoryExists(Path);

                    if (!checkDir) {
                        return resolve("");
                    }
                    await writeFile(FInalUrl, urltoArrayBuffer({ url })!);
                    return resolve(`${fileName}.${fileExtention}`);
                }

                const FInalUrl = `${Path}/${fileName}.webp`;

                const checkDir = await ensureDirectoryExists(Path);

                if (!checkDir) {
                    return resolve("");
                }
                await writeFile(FInalUrl, data!);
                return resolve(`${fileName}.webp`);
            } catch (error) {
                console.log("🚀 ~ file: ServerFunctions.ts:43 ~ returnnewPromise<boolean> ~ error:", error);
                return resolve("");
            }
        });
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:15 ~ FilesSavingAsync ~ error:", error);
    }
};

export const generateRandChars = (length: number) => {
    try {
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let id = "";
        for (let i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return id;
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:32 ~ randomIdGenerator ~ error:", error);
    }
};

export const randomIdGenerator = (length: number) => {
    try {
        let id = "";
        const chars = generateRandChars(250)!;
        for (let i = 0; i < length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:32 ~ randomIdGenerator ~ error:", error);
    }
};

export const urltoArrayBuffer = ({ url }: { url: string }) => {
    try {
        var data = url.split(";base64,")[1];
        return Buffer.from(data, "base64");
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:36 ~ urltoArrayBuffer ~ error:", error);
    }
};
export type compressImageType = {
    data: string;
    width: number;
};
export const watermarkResource = async ({ data, width }: compressImageType) => {
    return new Promise<Buffer>(async (resolve, reject) => {
        try {
            const canvas = createCanvas(800, 800);
            const contextGlob = canvas.getContext("2d");

            const image = await loadImage(data);
            // image.src = data;
            // image.crossOrigin = "anonymous";

            let ratio = width / image.width;
            canvas.width = width;
            canvas.height = image.height * ratio;

            contextGlob.drawImage(image, 0, 0, canvas.width, canvas.height);

            //////// watermark
            const imgLoad = await loadImage("C:/Users/THINKBOOK/Desktop/sahla-mahla-prototype/Cdn/CdnResources/watermarkLogo.png");

            let context = canvas.getContext("2d");
            context.globalAlpha = 0.7;

            // Scale down
            const tempCanvas = createCanvas(800, 800);
            const tempCtx = tempCanvas.getContext("2d");

            tempCanvas.width = imgLoad.width * (width / 10000);
            tempCanvas.height = imgLoad.height * (width / 10000);

            // Draw to canvas
            tempCtx.drawImage(imgLoad, 0, 0, tempCanvas.width, tempCanvas.height);

            const pattern = contextGlob.createPattern(tempCanvas, "repeat");
            // contextGlob.rotate(Math.PI / 4);
            contextGlob.fillStyle = pattern;
            contextGlob.fillRect(0, 0, canvas.width, canvas.height);
            // contextGlob.drawImage(image2, 50, 50, canvas.width, canvas.height);

            return resolve(canvas.toBuffer());
        } catch (error) {
            console.log("🚀 ~ file: ServerFunctions.ts:114 ~ returnnewPromise<Buffer> ~ error:", error);
        }
    });
};
export const thumbnailResource = async ({ data, width }: compressImageType) => {
    return new Promise<Buffer>(async (resolve, reject) => {
        const canvas = createCanvas(800, 800);
        const contextGlob = canvas.getContext("2d");

        const image = await loadImage(data);

        let ratio = width / image.width;
        canvas.width = width;
        canvas.height = image.height * ratio;

        contextGlob.drawImage(image, 0, 0, canvas.width, canvas.height);

        return resolve(canvas.toBuffer());
    });
};

export const removeFile = async (path: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            await rm(path);
            return resolve(true);
        } catch (error) {
            console.log("🚀 ~ file: ServerFunctions.ts:173 ~ removeFile ~ error:", error);
            return resolve(false);
        }
    });
};

export function ensureDirectoryExists(directoryPath: string) {
    return new Promise<boolean>((resolve, reject) => {
        fs.access(directoryPath, fs.constants.F_OK, (err) => {
            if (err) {
                // Directory doesn't exist, create it
                fs.mkdir(directoryPath, { recursive: true }, (err) => {
                    if (err) {
                        console.log("🚀 ~ file: ServerFunctions.ts:190 ~ fs.mkdir ~ err:", err);

                        return reject(false); // Failed to create directory
                    }
                    return resolve(true); // Directory created successfully
                });
            }
            return resolve(true); // Directory already exists
        });
    });
}

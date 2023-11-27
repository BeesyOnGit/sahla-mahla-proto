import { writeFile } from "fs/promises";

export const FilesSavingAsync = ({ data, savePath }: { data: string; savePath: string }) => {
    const Path = savePath;
    try {
        return new Promise(async (resolve) => {
            const finalName = `${randomIdGenerator(15)}-${randomIdGenerator(15)}.webp`;
            const FInalUrl = `${Path}/${finalName}`;
            await writeFile(FInalUrl, urltoArrayBuffer({ url: data })!);
            return resolve(finalName);
        });
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:15 ~ FilesSavingAsync ~ error:", error);
    }
};

export const randomIdGenerator = (length: number) => {
    try {
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        let id = "";
        for (let i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return id;
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:32 ~ randomIdGenerator ~ error:", error);
    }
};

export const urltoArrayBuffer = ({ url }: { url: string }) => {
    try {
        var data = url.replace(/^data:image\/\w+;base64,/, "");
        return Buffer.from(data, "base64");
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:36 ~ urltoArrayBuffer ~ error:", error);
    }
};

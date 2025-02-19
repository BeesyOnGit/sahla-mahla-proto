import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import mongoose, { FilterQuery, Model } from "mongoose";
import { writeFile } from "fs";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import ClientModel, { clientType } from "../Models/Clients";
import DailyLogsModel, { dayilyLogsType } from "../Models/DailyLogs";
import { progModels } from "../projectModels";
import ProjectModel from "../Models/Project";

dotenv.config();

dotenv.config();

const env = process.env.ENVIRONEMENT;
const SITE_URL = process.env.SITE_URL;
export type Headers = IncomingHttpHeaders & {
    verifiedId?: string;
    userType?: number;
    validMail?: boolean;
    validPhone?: boolean;
    authorizationtoken?: string;
};

export const AuthVerification = async (req: Request, res: Response, next: NextFunction) => {
    const { headers }: any = req;
    const { originalUrl } = req;
    const { authorizationtoken } = headers;

    if (!authorizationtoken) {
        return res.json({ code: "E07" });
    }

    try {
        const verifiedToken: any = TokenVerifier(authorizationtoken);

        if (!verifiedToken) {
            return res.json({ code: "ET" });
        }

        const { id: _id } = verifiedToken;

        const GeneralFilter: FilterQuery<freelanceType | clientType> = { _id };

        const findClient = await ClientModel.findOne(GeneralFilter);
        if (findClient) {
            const { emailConfirmation, phoneConfirmation, _id } = findClient;
            headers.userType = 2;
            headers.validMail = emailConfirmation;
            headers.validPhone = phoneConfirmation;
            headers.verifiedId = _id.toString();
            res.cookie("userType", 2, {
                maxAge: 1000 * 60 * 10,
            });
        }

        const findFreelance = await FreelanceModel.findOne(GeneralFilter);
        if (findFreelance) {
            const { emailConfirmation, phoneConfirmation, _id } = findFreelance;
            headers.userType = 1;
            headers.validMail = emailConfirmation;
            headers.validPhone = phoneConfirmation;
            headers.verifiedId = _id.toString();
            res.cookie("userType", 1, {
                maxAge: 1000 * 60 * 10,
            });
        }

        if (!findClient && !findFreelance) {
            return res.json({ code: "E03" });
        }

        return next();
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:64 ~ AuthVerification ~ error:", error);
    }
};

export const verrifiySocket = async (socket: any, token: string, socketId: string) => {
    const clearToken: any = TokenVerifier(token);

    const { id: _id } = clearToken;

    const GeneralFilter = { _id };

    // const isUser: UserModel | null = await Users.findOne<UserModel>(GeneralFilter);

    // if (!isUser) {
    //     return;
    // }
    // const { location, isAdmin } = isUser;

    // if (isAdmin) {
    //     return { ...socket, [socketId]: "all" };
    // }

    return { ...socket, [socketId]: location };
};

export const toObjectId = (id: string) => {
    return new mongoose.Types.ObjectId(id);
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return hash;
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:149 ~ hashPassword ~ error:", error);
        return "";
    }
};

export const matchPasswords = async (hashed: string, plain: string) => {
    try {
        const isMatch = await bcrypt.compare(plain, hashed);
        return isMatch;
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:159 ~ matchPasswords ~ error:", error);
    }
};

export const encryptString = (infos: string) => {
    try {
        return CryptoJS.AES.encrypt(infos, process.env.BILLING_ENCRIPTION_KEY!);
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:127 ~ cryptBillingInfos ~ error:", error);
    }
};

export const decryptString = (encryptedBilling: string) => {
    try {
        return CryptoJS.AES.decrypt(encryptedBilling, process.env.BILLING_ENCRIPTION_KEY!).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:134 ~ decryptBillingInfos ~ error:", error);
    }
};

export const TokenVerifier = (token: string) => {
    try {
        if (token == undefined) {
            return false;
        }
        return jwt.verify(token, process.env.TOKEN_ENCRIPTION_KEY!);
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:93 ~ TokenVerifier ~ error:", error);
    }
};

export const generateToken = (id: string) => {
    try {
        if (!id) {
            return false;
        }
        return jwt.sign({ id }, process.env.TOKEN_ENCRIPTION_KEY!);
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:101 ~ generateToken ~ error:", error);
    }
};

export const urlWitoutParams = (url: string) => {
    const urlArr = url.split("/");
    if (urlArr.length <= 4) {
        return urlArr.join("/");
    }
    urlArr.pop();

    return urlArr.join("/");
};

export const editModelWithSave = (model: any, edit: any) => {
    for (const key in edit) {
        if (model[key] && typeof model[key] == "object") {
            editModelWithSave(model[key], edit[key]);
            continue;
        }
        model[key] = edit[key];
    }
    return model;
};

export const urltoArrayBuffer = ({ url }: { url: string }) => {
    var data = url.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(data, "base64");
};

export const FilesSavingAsync: Function = ({ dataArray, fileName, savePath }: { dataArray: Array<string>; fileName: string; savePath?: string }) => {
    let PhotoArray: Array<string> = [];
    console.log("🚀 ~ file: ServerFunctions.ts:10 ~ env:", env);

    const Path = env == "dev" ? "C:/Users/THINKBOOK/Desktop/RealAuto/Media" : "/home/RealAutoMedia";
    // const VPSPath = ;
    const Url = `${SITE_URL}/api/localinfos/realAutoMedia`;
    // const WebUrl = "http://165.232.71.118:3000/api/localinfos/realAutoMedia";

    return new Promise((resolve) => {
        dataArray.forEach(async (url: string, index: number) => {
            const finalName = `${fileName}-${index + 1}.jpeg`;
            const FInalUrl = `${Path}/${finalName}`;
            PhotoArray.push(`${Url}/${finalName}`);
            writeFile(FInalUrl, urltoArrayBuffer({ url: url }), () => {
                if (index + 1 == dataArray.length) {
                    return resolve(PhotoArray);
                }
            });
        });
    });
};

export const urlToFile = ({ url, name }: { url: any; name?: String }) => {
    const arr = url.split(",");
    // console.log(arr)
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];

    const dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);
    return dataArr;
    // while (n--) {
    //     dataArr[n] = dataStr.charCodeAt(n);
    // }

    // let file = new File([dataArr], `${name}.jpg`, { type: mime });

    // return file;
};

export const AddToDailyActivity = async (obj: dayilyLogsType) => {
    try {
        const Dailyadded = await DailyLogsModel.create(obj);

        if (Dailyadded) {
            return true;
        }

        const { action, doer } = obj;

        console.log(`Log for ${doer}: ${action} NOT SAVED AT => ${new Date().toLocaleDateString("fr-FR")}`);

        return false;
    } catch (error) {
        console.log("🚀 ~ file: ServerFunctions.ts:216 ~ AddToDailyActivity ~ error:", error);
    }
};

export function filterEditedObject(befor: any, edited: Object) {
    let keysedited = [];

    for (const key in edited) {
        keysedited.push(key);
    }

    let beforEditAbstract: any = {};

    for (const key of keysedited) {
        beforEditAbstract = { ...beforEditAbstract, [key]: befor[key] || "newly added" };
    }

    // for (const key in befor) {
    //     if (keysedited.includes(key)) {
    //         beforEditAbstract = { ...beforEditAbstract, [key]: befor[key] };
    //     }
    // }
    return beforEditAbstract;
}

export const compareObjects = (original: any, edited: any) => {
    let originalFields: any = {};
    let editedFields: any = {};

    for (const key in edited) {
        if (typeof edited[key] != "object" && original[key] && original[key] != edited[key]) {
            originalFields = { ...originalFields, [key]: original[key] };
            editedFields = { ...editedFields, [key]: edited[key] };
        }

        if (typeof edited[key] != "object" && !original[key]) {
            originalFields = { ...originalFields, [key]: "did not exist" };
            editedFields = { ...editedFields, [key]: edited[key] };
        }

        if (edited[key].length && !original[key]) {
            originalFields = { ...originalFields, [key]: "did not exist" };
            editedFields = { ...editedFields, [key]: edited[key] };
        }

        if (edited[key].length && original[key]) {
            originalFields = { ...originalFields, [key]: original[key] };
            editedFields = { ...editedFields, [key]: edited[key] };
        }

        if (typeof edited[key] == "object" && original[key] && original[key] != edited[key] && !edited[key].length) {
            const { originalFields: ofResult, editedFields: efResult } = compareObjects(original[key], edited[key]) as any;
            originalFields = { ...originalFields, [key]: ofResult };
            editedFields = { ...editedFields, [key]: efResult };
        }
        if (typeof edited[key] == "object" && !original[key] && original[key] != edited[key] && !edited[key].length) {
            const { originalFields: ofResult, editedFields: efResult } = compareObjects(original[key], edited[key]) as any;
            originalFields = { ...originalFields, [key]: "did not exist" };
            editedFields = { ...editedFields, [key]: efResult };
        }
    }

    return { originalFields, editedFields };
};

export const editObjectWithSimilarObject = (original: any, edited: any) => {
    let newObject = {};

    for (const key in edited) {
        if (!original[key]) {
            original = { ...original, [key]: edited[key] };
        }
    }

    for (const key in original) {
        if (original[key].length && edited[key] && edited[key].length) {
            newObject = { ...newObject, [key]: edited[key] };
        }

        if (original[key].length && (!edited[key] || !edited[key].length)) {
            newObject = { ...newObject, [key]: original[key] };
        }

        if (typeof original[key] != "object" && edited[key]) {
            newObject = { ...newObject, [key]: edited[key] };
        }

        if (typeof original[key] != "object" && !edited[key]) {
            newObject = { ...newObject, [key]: original[key] };
        }

        if (typeof original[key] == "object" && edited[key] && !original[key].length) {
            newObject = { ...newObject, [key]: editObjectWithSimilarObject(original[key], edited[key]) };
        }

        if (typeof original[key] == "object" && !edited[key] && !original[key].length) {
            newObject = { ...newObject, [key]: original[key] };
        }
    }
    return newObject;
};

export const editObjectWithFields = (original: any, edited: any) => {
    let newObject = {};

    for (const key in original) {
        if (typeof original[key] != "object" && edited[key]) {
            newObject = { ...newObject, [key]: edited[key] };
        }
        if (typeof original[key] != "object" && !edited[key]) {
            newObject = { ...newObject, [key]: original[key] };
        }
        if (typeof original[key] == "object") {
            newObject = { ...newObject, [key]: editObjectWithFields(original[key], edited) };
        }
    }

    return newObject;
};

export const spreadObjectToItskeys = (object: any) => {
    let spreadedObject = {};
    for (const key in object) {
        if (object[key][0]) {
            spreadedObject = { ...spreadedObject, [key]: [...object[key]] };
        }

        if (typeof object[key] == "object" && !object[key][0]) {
            const objectSpreaded: any = spreadObjectToItskeys(object[key]);
            spreadedObject = { ...spreadedObject, ...objectSpreaded };
        }
        if (typeof object[key] != "object") {
            spreadedObject = { ...spreadedObject, [key]: object[key] };
        }
    }
    return spreadedObject;
};

export const getSellerCode: Function = async (length: number, DB: Model<any>, prefix: String) => {
    try {
        let sellerCode = `${prefix}-`;
        let characters = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < length; i++) {
            sellerCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const getSellersCodes = await DB.findOne({ SCode: sellerCode });

        if (getSellersCodes) {
            return getSellerCode(length, DB, prefix);
        }

        return sellerCode;
    } catch (error) {
        console.log("🚀 ~ file: ServerFuntions.ts:113 ~ getSellerCode ~ error:", error);
    }
};

export const cleanPhoneNumber = (number: any) => {
    const numTab = number.split("");

    for (let i = 0; i < 4; i++) {
        numTab.shift();
    }
    // console.log(numTab);
    let finalNum = "0";

    numTab.forEach((e: any) => {
        finalNum += e;
    });

    return finalNum;
};

export const randomIdGenerator = (length: number) => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
};

type PopulateParams = {
    doc: any;
    path: string;
    // firstModel: string;
    // secondModel: string;
    select: string;
};

export async function populateFromModels({ doc, path, select }: PopulateParams) {
    const modelsToPopulateFromMap: any = {
        1: "freelance",
        2: "clients",
    };

    const keys = Object.keys(modelsToPopulateFromMap);
    try {
        if (!doc) {
            return;
        }

        let tmpId = doc[path];
        doc[path] = null;
        for await (const iterator of keys) {
            if (!doc[path]) {
                doc[path] = tmpId;
                await doc.populate({
                    path,
                    model: modelsToPopulateFromMap[iterator],
                    select,
                });
            }
        }
    } catch (err) {
        console.log("🚀 ~ file: ProjectControllers.ts:168 ~ err:", err);
    }
}

export const createProject = () => {
    const now = new Date();
    // const cron = "0 */2 * * *"; // every 2 hours
    const rand = Math.floor(Math.random() * 28);
    const subDeadline = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 23, now.getMinutes()).getTime();
    const buyDeadline = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 0, 0, 0).getTime();
    const project = { ...progModels[rand], submitDeadLine: subDeadline, buyerDeadline: buyDeadline };
    ProjectModel.create(project);
};

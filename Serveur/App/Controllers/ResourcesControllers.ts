import { Response, Request } from "express";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import { AddToDailyActivity, Headers, editModelWithSave, hashPassword } from "../MiddleWear/ServerFunctions";
import { sendConfirmationMail } from "./UserConfirmatioControllers";
import { dayilyLogsType } from "../Models/DailyLogs";
import { FilterQuery } from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import ResourcesModel, { resourcesType } from "../Models/Resources";
dotenv.config();

export const uploadResource = async (req: Request, res: Response) => {
    const { body, headers } = req;
    const { verifiedId }: Headers = headers;
    const { resource, ...restBody }: Partial<resourcesType> & { resource: string } = body;
    try {
        const uploadData = {
            resource,
            owner: verifiedId,
        };
        const cdnurl = process.env.CDN_DOMAIN;
        const cdnResponse = await axios.post(`${cdnurl}`, uploadData);

        if (!cdnResponse) {
            return res.json({ code: "EN" });
        }

        const { data } = cdnResponse;
        const { code, url } = data;

        if (code != "S101") {
            return res.json({ code: "E31" });
        }
        const { resourceThumbnail, resourceWaterLink, resourceLink } = url;

        const newResourceObject: Partial<resourcesType> = {
            owner: verifiedId?.toString()!,
            resourceLink,
            resourceThumbnail,
            resourceWaterLink,
            ...restBody,
        };
        const createResource = await ResourcesModel.create(newResourceObject);

        if (!createResource) {
            return res.json({ code: "E32" });
        }
        const { _id } = createResource;

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "resource added",
            concerned: _id.toString(),
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S31" });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:65 ~ uploadResource ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const editResource = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const { price, public: publicResource, discount, description, categories, title }: Partial<resourcesType> & { resource: string } = body;
    try {
        const filter: FilterQuery<resourcesType> = { _id: id, owner: verifiedId };

        const newResourceObject: Partial<resourcesType> = {
            price,
            discount,
            public: publicResource,
            description,
            categories,
            title,
        };
        const findResource = await ResourcesModel.findOne(filter);

        if (!findResource) {
            return res.json({ code: "E33" });
        }

        editModelWithSave(findResource, newResourceObject);

        const saveResourceChanges = await findResource.save();

        if (!saveResourceChanges) {
            return res.json({ code: "E34" });
        }

        const { _id } = saveResourceChanges;

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "resource edited",
            concerned: _id.toString(),
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S32" });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:65 ~ uploadResource ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const deleteResource = async (req: Request, res: Response) => {
    const { params, headers } = req;
    const { verifiedId }: Headers = headers;
    const { id } = params;

    try {
        const filter: FilterQuery<resourcesType> = { _id: id, owner: verifiedId };
        const findResource = await ResourcesModel.findOne(filter);

        if (!findResource) {
            return res.json({ code: "E33" });
        }

        const { resourceLink, resourceThumbnail, resourceWaterLink, timesSold } = findResource;

        if (timesSold > 0) {
            return res.json({ code: "E35" });
        }

        const deleteResourceFromDb = await findResource.delete();

        if (!deleteResourceFromDb) {
            return res.json({ code: "E36" });
        }

        await axios.delete(resourceLink);
        await axios.delete(resourceThumbnail);
        await axios.delete(resourceWaterLink);

        return res.json({ code: "S33" });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:118 ~ deleteResource ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const getAllResources = async (req: Request, res: Response) => {
    const { headers, query } = req;
    const { verifiedID }: Headers = headers;
    const { categories, title, page } = query;

    const pageSize = 10;
    const pageNumber: any = page || 1;

    const titleMatchMap: any = {
        true: { title },
        false: {},
    };
    const categoriesMatchMap = {
        true: { categories: { $in: categories } },
        false: {},
    };

    try {
        const resourceFilter: FilterQuery<resourcesType> = {
            public: true,
            ...titleMatchMap[`${title ? true : false}`],
            ...categoriesMatchMap[`${categories ? true : false}`],
        };
        const resources = await ResourcesModel.find(resourceFilter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .select({
                saves: "inclusion",
                resourceThumbnail: "inclusion",
                timesSold: "inclusion",
                discount: "inclusion",
                price: "inclusion",
                categories: "inclusion",
                title: "inclusion",
                likes: "inclusion",
                createdAt: "inclusion",
            });

        if (!resources || resources.length == 0) {
            return res.json({ code: "E33" });
        }

        return res.json({ code: "S34", data: "" });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:181 ~ getAllResources ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const getResourceDetail = async (req: Request, res: Response) => {
    const { headers, params } = req;
    const { id } = params;
    const { verifiedID }: Headers = headers;

    try {
        const resourceFilter: FilterQuery<resourcesType> = { _id: id };

        const findResource = await ResourcesModel.findOne(resourceFilter)
            .populate({
                path: "owner",
                select: "firstName familyName notation aprouved createdAt",
                model: "freelance",
            })
            .select({
                buyers: "exclusion",
                resourceThumbnail: "exclusion",
            });

        if (!findResource) {
            return res.json({ code: "E33" });
        }
        const { owner, buyers, public: resourcePublic } = findResource;

        if (!resourcePublic && verifiedID !== owner) {
            return res.json({ code: "E37" });
        }

        findResource.owned = true;

        if (verifiedID != owner || !buyers.includes(verifiedID!)) {
            findResource.owned = false;
            findResource.resourceLink = "";
        }

        return res.json({ code: "S34", data: findResource });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:181 ~ getAllResources ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

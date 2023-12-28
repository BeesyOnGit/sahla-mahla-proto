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
    const { resourceLink: rslink, ...restBody }: Partial<resourcesType> & { resource: string } = body;
    const { price, discount } = restBody;
    try {
        const uploadData = {
            resource: rslink,
            owner: verifiedId,
        };
        const cdnurl = process.env.CDN_DOMAIN;
        const cdnResponse = await axios.post(`${cdnurl}`, uploadData);

        if (!cdnResponse) {
            return res.json({ code: "EN" });
        }

        const { data } = cdnResponse;
        const { code, url } = data;
        console.log("🚀 ~ file: ResourcesControllers.ts:33 ~ uploadResource ~ code:", code);

        if (code != "S101") {
            return res.json({ code: "E31", cdnError: code });
        }
        const { resourceThumbnail, resourceWaterLink, resourceLink } = url;

        const newResourceObject: Partial<resourcesType> = {
            ...restBody,
            owner: verifiedId?.toString()!,
            resourceLink,
            resourceThumbnail,
            resourceWaterLink,
            price: !price ? 0 : price < 0 ? 0 : price,
            discount: !price ? 0 : price <= 0 ? 0 : discount,
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
    const { price, discount, ...rest }: Partial<resourcesType> & { resource: string } = body;
    try {
        const filter: FilterQuery<resourcesType> = { _id: id, owner: verifiedId };

        const newResourceObject: Partial<resourcesType> = {
            ...rest,
            price: !price ? 0 : price < 0 ? 0 : price,
            discount: !discount ? 0 : !price ? 0 : price <= 0 ? 0 : discount,
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

export const bookmarkLikResource = async (req: Request, res: Response) => {
    const { headers, params, query } = req;
    const { like, bookmark } = query;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    try {
        const filter: FilterQuery<resourcesType> = { _id: id };

        const findResource = await ResourcesModel.findOne(filter);

        if (!findResource) {
            return res.json({ code: "E33" });
        }
        const { likes, bookMarks } = findResource;

        if (like) {
            const present = likes.indexOf(verifiedId!);
            if (present > -1) {
                likes.splice(present, 1);
                editModelWithSave(findResource, { likes: likes });
            }
            if (present == -1) {
                editModelWithSave(findResource, { likes: [...likes, verifiedId] });
            }
        }
        if (bookmark) {
            const present = bookMarks.indexOf(verifiedId!);
            if (present > -1) {
                bookMarks.splice(present, 1);
                editModelWithSave(findResource, { bookMarks: bookMarks });
            }
            if (present == -1) {
                editModelWithSave(findResource, { bookMarks: [...bookMarks, verifiedId] });
            }
        }

        const saveResourceChanges = await findResource.save();

        if (!saveResourceChanges) {
            return res.json({ code: "E34" });
        }

        const { _id } = saveResourceChanges;

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "resource liked/bookmarked",
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

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "resource removed",
            concerned: id,
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S33" });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:118 ~ deleteResource ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const getAllResources = async (req: Request, res: Response) => {
    const { headers, query } = req;
    const { verifiedId }: Headers = headers;
    const { search, page, resourceType, type } = query;

    const pageSize = 10;
    const pageNumber: any = page || 1;

    const titleMatchMap: any = {
        true: {},
        false: { title: new RegExp(search?.toString()!, "i") },
    };
    const descriptionMatchMap: any = {
        true: {},
        false: { description: new RegExp(search?.toString()!, "i") },
    };
    const categoriesMatchMap = {
        false: { categories: { $in: [new RegExp(search?.toString()!, "i")] } },
        true: {},
    };
    const resourceTypeMatchMap = {
        false: { resourceType },
        true: {},
    };
    const typeMap: any = {
        bookmarks: { bookMarks: { $in: [verifiedId] } },
        likes: { likes: { $in: [verifiedId] } },
        undefined: {},
    };

    const searchMatchMap = {
        false: { $or: [titleMatchMap[`${!search}`], categoriesMatchMap[`${!search}`], descriptionMatchMap[`${!search}`]] },
        true: {},
    };

    try {
        const resourceFilter: FilterQuery<resourcesType> = {
            public: true,
            ...searchMatchMap[`${!search}`],
            ...resourceTypeMatchMap[`${!resourceType}`],
            ...typeMap[`${type}`],
        };
        console.log("🚀 ~ file: ResourcesControllers.ts:258 ~ getAllResources ~ resourceFilter:", resourceFilter);

        const resources = await ResourcesModel.find(resourceFilter)
            .populate({
                path: "owner",
                select: "firstName familyName profilePicture aprouved -_id",
                model: "freelance",
            })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .select("-resourceWaterLink -resourceLink -description -categories -lastTimeSold -public");

        if (!resources || resources.length == 0) {
            return res.json({ code: "E33" });
        }

        resources.forEach((resource) => {
            const { likes, buyers, bookMarks } = resource;
            let liked = false,
                booked = false,
                owned = false;

            if (likes.includes(verifiedId!)) {
                liked = true;
            }
            if (bookMarks.includes(verifiedId!)) {
                booked = true;
            }
            if (buyers.includes(verifiedId!)) {
                owned = true;
            }
            // @ts-ignore
            resource.buyers = resource.buyers.length;
            // @ts-ignore
            resource.bookMarks = resource.bookMarks.length;
            // @ts-ignore
            resource.likes = resource.likes.length;
            // @ts-ignore
            resource.likes[1] = liked;
            // @ts-ignore
            resource.bookMarks[1] = booked;
            // @ts-ignore
            resource.buyers[1] = owned;
        });

        return res.json({ code: "S34", data: resources });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:305 ~ getAllResources ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const getMyResources = async (req: Request, res: Response) => {
    const { headers, query, params } = req;
    const { verifiedId }: Headers = headers;
    const { search, page, resourceType } = query;
    const { reqType } = params;

    const pageSize = 10;
    const pageNumber: any = page || 1;

    const titleMatchMap: any = {
        true: {},
        false: { title: new RegExp(search?.toString()!, "i") },
    };
    const descriptionMatchMap: any = {
        true: {},
        false: { description: new RegExp(search?.toString()!, "i") },
    };
    const categoriesMatchMap = {
        false: { categories: { $in: [new RegExp(search?.toString()!, "i")] } },
        true: {},
    };
    const resourceTypeMatchMap = {
        false: { resourceType },
        true: {},
    };
    const typeMap: any = {
        owned: { buyers: { $in: [verifiedId] } },
        selling: { owner: verifiedId },
    };

    const searchMatchMap = {
        false: { $or: [titleMatchMap[`${!search}`], categoriesMatchMap[`${!search}`], descriptionMatchMap[`${!search}`]] },
        true: {},
    };

    try {
        const resourceFilter: FilterQuery<resourcesType> = {
            ...searchMatchMap[`${!search}`],
            ...resourceTypeMatchMap[`${!resourceType}`],
            ...typeMap[`${reqType}`],
        };
        console.log("🚀 ~ file: ResourcesControllers.ts:351 ~ getMyResources ~ resourceFilter:", resourceFilter);

        const resources = await ResourcesModel.find(resourceFilter)
            .populate({
                path: "owner",
                select: "firstName familyName profilePicture aprouved ",
                model: "freelance",
            })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .select("-resourceWaterLink -description -categories -lastTimeSold -public");

        if (!resources || resources.length == 0) {
            return res.json({ code: "E33" });
        }

        resources.forEach((resource) => {
            const { likes, buyers, bookMarks } = resource;
            let liked = true,
                booked = true,
                owned = true;

            if (!likes.includes(verifiedId!)) {
                liked = false;
            }
            if (!bookMarks.includes(verifiedId!)) {
                booked = false;
            }

            // @ts-ignore
            if (!buyers.includes(verifiedId!) && resource.owner._id != verifiedId) {
                owned = false;
                resource.resourceLink = "";
            }
            // @ts-ignore
            resource.buyers = resource.buyers.length;
            // @ts-ignore
            resource.bookMarks = resource.bookMarks.length;
            // @ts-ignore
            resource.likes = resource.likes.length;
            // @ts-ignore
            resource.likes[1] = liked;
            // @ts-ignore
            resource.bookMarks[1] = booked;
            // @ts-ignore
            resource.buyers[1] = owned;
        });

        return res.json({ code: "S34", data: resources });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:397 ~ getMyResources ~ error:", error);
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

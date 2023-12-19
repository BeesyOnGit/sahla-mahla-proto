import { Response, Request } from "express";
import { FilterQuery, QueryOptions } from "mongoose";
import dotenv from "dotenv";
import UtilitiesModel, { utilitiesType } from "../Models/Utilities";
dotenv.config();

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await UtilitiesModel.findOne({ resourcesCategories: { $exists: true } });

        if (!categories) {
            return res.json({ code: "E51" });
        }

        return res.json({ code: "S51", data: categories.resourcesCategories });
    } catch (error: any) {
        console.log("🚀 ~ file: UtilitiesControllers.ts:17 ~ getCategories ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const getadressUtils = async (req: Request, res: Response) => {
    const { params, query } = req;
    const { util } = params;
    const { wilaya } = query;

    const wilayaFilter: any = {
        //@ts-ignore
        false: { wilaya },
        true: {},
    };

    try {
        const FilterQuery: FilterQuery<utilitiesType> = { utilType: util, ...wilayaFilter[`${!wilaya}`] };
        const adresses = await UtilitiesModel.find(FilterQuery);

        if (!Array.isArray(adresses)) {
            return res.json({ code: "E52" });
        }

        return res.json({ code: "S52", data: adresses });
    } catch (error: any) {
        console.log("🚀 ~ file: UtilitiesControllers.ts:42 ~ getadressUtils ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

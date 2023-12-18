import { Response, Request } from "express";
import { FilterQuery } from "mongoose";
import dotenv from "dotenv";
import UtilitiesModel from "../Models/Utilities";
dotenv.config();

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await UtilitiesModel.findOne({ resourcesCategories: { $exists: true } });

        if (!categories) {
            return res.json({ code: "E51" });
        }

        return res.json({ code: "S51", data: categories.resourcesCategories });
    } catch (error: any) {
        console.log("🚀 ~ file: ResourcesControllers.ts:65 ~ uploadResource ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

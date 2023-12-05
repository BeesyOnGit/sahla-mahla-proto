import { Response, Request } from "express";
import { AddToDailyActivity, Headers, editModelWithSave } from "../MiddleWear/ServerFunctions";
import { dayilyLogsType } from "../Models/DailyLogs";
import { FilterQuery } from "mongoose";
import dotenv from "dotenv";
import PlanModel, { planType } from "../Models/Plans";
dotenv.config();

export const addPlan = async (req: Request, res: Response) => {
    const { body, headers } = req;
    const { verifiedId }: Headers = headers;
    const { planDiscount, planPrice, ...restPlan }: Partial<planType> & { resource: string } = body;

    try {
        const newPlanObject: Partial<planType> = {
            ...restPlan,
            planPrice: !planPrice ? 0 : planPrice < 0 ? 0 : planPrice,
            planDiscount: !planPrice ? 0 : planPrice <= 0 ? 0 : planDiscount,
        };
        const createPlan = await PlanModel.create(newPlanObject);

        if (!createPlan) {
            return res.json({ code: "E42" });
        }

        const { _id } = createPlan;

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "plan added",
            concerned: _id.toString(),
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S41" });
    } catch (error: any) {
        console.log("🚀 ~ file: PlansControllers.ts:41 ~ addPlan ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const editPlan = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const { planPrice, planDiscount, ...rest }: Partial<planType> & { resource: string } = body;
    try {
        const filter: FilterQuery<planType> = { _id: id, owner: verifiedId };

        const editPlanObject: Partial<planType> = {
            ...rest,
            planPrice: !planPrice ? 0 : planPrice < 0 ? 0 : planPrice,
            planDiscount: !planPrice ? 0 : planPrice <= 0 ? 0 : planDiscount,
        };
        const findPlan = await PlanModel.findOne(filter);

        if (!findPlan) {
            return res.json({ code: "E43" });
        }

        editModelWithSave(findPlan, editPlanObject);

        const savePlanChanges = await findPlan.save();

        if (!savePlanChanges) {
            return res.json({ code: "E44" });
        }

        const { _id } = savePlanChanges;

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "plan edited",
            concerned: _id.toString(),
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S42" });
    } catch (error: any) {
        console.log("🚀 ~ file: PlansControllers.ts:82 ~ editPlan ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const deletePlan = async (req: Request, res: Response) => {
    const { params, headers } = req;
    const { verifiedId }: Headers = headers;
    const { id } = params;

    try {
        const filter: FilterQuery<planType> = { _id: id, owner: verifiedId };
        const findPlan = await PlanModel.findOne(filter);

        if (!findPlan) {
            return res.json({ code: "E43" });
        }

        const deletePlanFromDb = await findPlan.delete();

        if (!deletePlanFromDb) {
            return res.json({ code: "E45" });
        }

        const activity: dayilyLogsType = {
            doer: verifiedId!.toString(),
            action: "plan removed",
            concerned: id,
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S43" });
    } catch (error: any) {
        console.log("🚀 ~ file: PlansControllers.ts:108 ~ deletePlan ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const getAllPlans = async (req: Request, res: Response) => {
    const { headers, query } = req;
    const { verifiedID }: Headers = headers;
    const { planFor } = query;

    try {
        const plans = await PlanModel.find({ planFor }).select({
            createdAt: "exclusion",
            editedAt: "exclusion",
        });

        if (!plans || plans.length == 0) {
            return res.json({ code: "E43" });
        }

        return res.json({ code: "S44", data: plans });
    } catch (error: any) {
        console.log("🚀 ~ file: PlansControllers.ts:130 ~ getAllPlans ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

import { Response, Request } from "express";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import { AddToDailyActivity, Headers, editModelWithSave, encryptString, hashPassword, populateFromModels } from "../MiddleWear/ServerFunctions";
import { sendConfirmationMail } from "./UserConfirmatioControllers";
import { dayilyLogsType } from "../Models/DailyLogs";
import { FilterQuery } from "mongoose";
import ProjectModel, { projectType } from "../Models/Project";

export const createProjetc = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { verifiedId }: Headers = headers;
    try {
        const newProject: projectType = {
            ...body,
            buyer: verifiedId,
        };
        const createProject = await ProjectModel.create(newProject);

        if (!createProject) {
            return res.json({ code: "E61" });
        }

        const { _id } = createProject;

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "project created",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S61" });
    } catch (error: any) {
        console.log("🚀 ~ file: ProjectControllers.ts:30 ~ createProjetc ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const editProject = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    try {
        const currProjectInfos = await ProjectModel.findOne({ _id: id });

        if (!currProjectInfos) {
            return res.json({ code: "E62" });
        }

        const { buyer } = currProjectInfos;

        if (verifiedId != buyer) {
            return res.json({ code: "E63" });
        }

        editModelWithSave(currProjectInfos, body);

        const saveProjectInfos = await currProjectInfos.save();

        if (!saveProjectInfos) {
            return res.json({ code: "E64" });
        }
        // const { _id } = saveFreelanceChanges;

        const activity: dayilyLogsType = {
            doer: buyer.toString(),
            action: "project edited",
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S62" });
    } catch (error: any) {
        console.log("🚀 ~ file: ProjectControllers.ts:77 ~ editProject ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const deleteProject = async (req: Request, res: Response) => {
    const { headers, params } = req;
    const { id } = params;
    const { verifiedId }: Headers = headers;
    const filter: FilterQuery<projectType> = { buyer: verifiedId, _id: id };
    try {
        const projectExists = await ProjectModel.findOne(filter);

        if (!projectExists) {
            return res.json({ code: "E62" });
        }

        const deleteProject = await ProjectModel.findOneAndDelete(filter);

        if (!deleteProject) {
            return res.json({ code: "E65" });
        }

        const { _id, buyer } = deleteProject;

        const activity: dayilyLogsType = {
            doer: buyer.toString(),
            action: "project deleted",
            concerned: _id,
        };

        AddToDailyActivity(activity);

        return res.json({ code: "S63" });
    } catch (error: any) {
        console.log("🚀 ~ file: ProjectControllers.ts:103 ~ deleteProject ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};
export const getAllProjects = async (req: Request, res: Response) => {
    const { headers, params, query } = req;
    const { verifiedId }: Headers = headers;
    try {
        const projectFound = await ProjectModel.find().select(
            "-submitters -finalLink -temporaryLink -resourcesListe -contractor -contractorDeadline -finalDeadline"
        );

        if (!projectFound || projectFound.length == 0) {
            return res.json({ code: "E62" });
        }

        for await (const doc of projectFound) {
            await populateFromModels({
                doc,
                path: "buyer",
                firstModel: "clients",
                secondModel: "freelance",
                select: "firstName familyName profilePicture aprouved -_id",
            });
        }

        return res.json({ code: "S64", data: projectFound });
    } catch (error: any) {
        console.log("🚀 ~ file: ProjectControllers.ts:134 ~ getAllProjects ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

import { Response, Request } from "express";
import FreelanceModel, { freelanceType } from "../Models/Freelance";
import { AddToDailyActivity, Headers, editModelWithSave, encryptString, hashPassword, populateFromModels } from "../MiddleWear/ServerFunctions";
import { sendConfirmationMail } from "./UserConfirmatioControllers";
import { dayilyLogsType } from "../Models/DailyLogs";
import { FilterQuery } from "mongoose";
import ProjectModel, { projectType } from "../Models/Project";

export const createProjetc = async (req: Request, res: Response) => {
    const { body, headers, params } = req;
    const { verifiedId, userType }: Headers = headers;
    try {
        const newProject: projectType = {
            ...body,
            buyer: verifiedId,
            buyerType: userType,
        };
        const createProject = await ProjectModel.create(newProject);

        if (!createProject) {
            return res.json({ code: "E61" });
        }

        const { _id } = createProject;

        const activity: dayilyLogsType = {
            doer: _id.toString(),
            action: "project created",
            concerned: createProject._id,
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

        if (verifiedId != buyer && !body.editAsContractor) {
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
            concerned: saveProjectInfos._id,
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
    const { verifiedId, userType }: Headers = headers;
    const { page, order }: any = query;

    const pageSize = 10;
    const pageNumber: any = page || 1;
    const now = new Date().getTime();
    const orderMap: any = {
        [order]: { 1: {}, 2: {} },

        my: {
            1: {
                $or: [
                    { buyer: verifiedId, projectStatus: { $in: [0, 1, 2] }, isApproved: false },
                    { contractor: { $in: [verifiedId] }, projectStatus: { $in: [1, 2] }, isApproved: false },
                ],
            },
            2: { buyer: verifiedId, projectStatus: { $in: [0, 1, 2] }, isApproved: false },
        },
        recap: {
            1: { $or: [{ buyer: verifiedId }, { contractor: { $in: [verifiedId] } }] },
            2: { $or: [{ buyer: verifiedId }, { contractor: { $in: [verifiedId] } }] },
        },
        involved: { 1: { "submitters.submitter": verifiedId }, 2: {} },
    };
    try {
        const projectFound = await ProjectModel.find({ ...orderMap[order][userType!] })
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .select("-submitters -finalLink -temporaryLink -resourcesListe -contractor -contractorDeadline -finalDeadline");

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

export const submitParticipation = async (req: Request, res: Response) => {
    const { headers, params, body } = req;
    const { verifiedId }: Headers = headers;
    const { id } = params;

    const filter: FilterQuery<projectType> = { _id: id };
    const now = new Date().getTime();
    try {
        const projecttoSubmitTo = await ProjectModel.findOne(filter);

        if (!projecttoSubmitTo) {
            return res.json({ code: "E62" });
        }
        const { submitDeadLine, canSubmit, projectStatus } = projecttoSubmitTo;

        if (submitDeadLine < now || canSubmit == false || projectStatus > 0) {
            return res.json({ code: "E67" });
        }

        projecttoSubmitTo.submitters.push({ ...body, submitter: verifiedId });

        const saveModifs = await projecttoSubmitTo.save();

        if (!saveModifs) {
            return res.json({ code: "E66" });
        }

        return res.json({ code: "S65" });
    } catch (error: any) {
        console.log("🚀 ~ file: ProjectControllers.ts:163 ~ submitParticipation ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

export const projectDetail = async (req: Request, res: Response) => {
    const { headers, params, query } = req;
    const { verifiedId, userType }: Headers = headers;
    const { id } = params;
    const {}: any = query;

    // const orderMap: any = {
    //     [order]: { 1: {}, 2: {} },

    //     my: {
    //         1: { $or: [{ buyer: verifiedId }, { contractor: { $in: [verifiedId] } }], projectStatus: 2 },
    //         2: { buyer: verifiedId },
    //     },
    //     recap: {
    //         1: { $or: [{ buyer: verifiedId }, { contractor: { $in: [verifiedId] } }] },
    //         2: { $or: [{ buyer: verifiedId }, { contractor: { $in: [verifiedId] } }] },
    //     },
    //     involved: { 1: { "submitters.submitter": verifiedId }, 2: {} },
    // };
    try {
        const projectFound: any = await ProjectModel.findOne({ _id: id })
            .populate({
                path: "contractor",
                model: "freelance",
                select: "firstName familyName profilePicture aprouved",
            })
            .populate({
                path: "submitters.submitter",
                model: "freelance",
                select: "firstName familyName profilePicture aprouved",
            });

        if (!projectFound) {
            return res.json({ code: "E62" });
        }

        const { buyer, contractor } = projectFound;

        if (buyer != verifiedId && !contractor.toString().includes(verifiedId!)) {
            return res.json({ code: "E68" });
        }
        let copyProject: Partial<projectType> & { owned?: boolean; contracted?: boolean } = {};

        if (buyer == verifiedId) {
            copyProject.owned = true;
        }
        if (contractor.toString().includes(verifiedId!)) {
            copyProject.contracted = true;
            if (buyer != verifiedId) {
                copyProject.submitters = [];
            }
        }

        await populateFromModels({
            doc: projectFound,
            path: "buyer",
            firstModel: "clients",
            secondModel: "freelance",
            select: "firstName familyName profilePicture aprouved _id",
        });

        copyProject = { ...{ ...projectFound._doc }, ...copyProject };

        return res.json({ code: "S64", data: copyProject });
    } catch (error: any) {
        console.log("🚀 ~ file: ProjectControllers.ts:134 ~ getAllProjects ~ error:", error);
        return res.json({ code: "EO", error: error.message });
    }
};

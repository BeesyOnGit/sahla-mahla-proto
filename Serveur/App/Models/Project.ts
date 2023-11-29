import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema<projectType>({
    executor: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "freelance",
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "clients",
    },

    buyerDeadline: {
        type: Number,
        required: true,
    },

    executorDeadline: {
        type: Number,
    },

    finalDeadLine: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        lowercase: true,
    },

    targetFields: {
        type: [String],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    submitters: {
        type: [
            {
                submitter: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "freelance",
                },
                submitterDeadline: { type: Number, required: true },
                submitterPrice: { type: Number, required: true },
                submitterQuesrions: { type: String, required: true },
            },
        ],
        required: true,
    },

    resourcesListe: {
        type: [String],
        default: [],
    },

    temporaryLink: {
        type: String,
    },

    timesEditedAmount: {
        type: Number,
        default: 0,
    },

    isApproved: {
        type: Boolean,
        default: false,
    },

    finalLink: {
        type: String,
    },

    projectStatus: {
        type: Number,
        default: 0,
    }, // 0 : launched  , 1 : in progress , 2 : completed ,

    projectStep: {
        type: Number,
        default: 0,
    }, // 0 : available for bid , 1 : confirmed

    createdAt: {
        type: Number,
        default: () => {
            return new Date().getTime();
        },
    },
    lastActive: {
        type: Number,
        default: () => {
            return new Date().getTime();
        },
    },
});

const ProjectModel: mongoose.Model<projectType> = mongoose.model<projectType>("projects", ProjectSchema);
export default ProjectModel;

export type projectType = {
    executor: mongoose.Schema.Types.ObjectId[];
    buyer: mongoose.Schema.Types.ObjectId;

    buyerDeadline: number;
    executorDeadline: number;
    finalDeadLine: number;

    description: string;
    targetFields: string[];
    amount: number;
    submitters: submittersListType[];

    resourcesListe: string[];

    temporaryLink: string;
    timesEditedAmount: number;

    isApproved: boolean;

    finalLink: string;

    createdAt: number;

    lastActive: number;

    projectStatus: number;

    projectStep: number;
};

export type submittersListType = {
    submitter: mongoose.Schema.Types.ObjectId;
    submitterDeadline: number;
    submitterPrice: number;
    submitterQuesrions: string;
};

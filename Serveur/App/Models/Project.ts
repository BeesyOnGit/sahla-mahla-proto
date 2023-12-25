import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema<projectType>({
    contractor: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "freelance",
        default: [],
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "clients",
    },
    buyerType: {
        type: Number,
        required: true,
    },

    title: {
        type: String,
        required: true,
        lowercase: true,
    },

    buyerDeadline: {
        type: Number,
        required: true,
    },

    contractorDeadline: {
        type: Number,
    },

    finalDeadLine: {
        type: Number,
        required: true,
        default: 0,
    },

    submitDeadLine: {
        type: Number,
        required: true,
    },

    canSubmit: {
        type: Boolean,
        required: true,
        default: true,
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
                submitterQuestions: { type: String },
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
    },

    // projectStep: {
    //     type: Number,
    //     default: 0,
    // }, // 0 : available for bid , 1 : confirmed

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

ProjectSchema.pre("save", function () {
    this.lastActive = new Date().getTime();
});

const ProjectModel: mongoose.Model<projectType> = mongoose.model<projectType>("projects", ProjectSchema);
export default ProjectModel;

export type projectType = {
    contractor: mongoose.Schema.Types.ObjectId[];
    buyer: mongoose.Schema.Types.ObjectId | string;
    buyerType: number;

    title: string;
    buyerDeadline: number;
    contractorDeadline: number;
    finalDeadLine: number;
    submitDeadLine: number;
    canSubmit: boolean;

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

    projectStatus: number; // 0 : launched  , 1 : in progress , 2 : completed , 3 : canceled

    // projectStep: number;

    _id?: string;
};

export type submittersListType = {
    submitter: mongoose.Schema.Types.ObjectId;
    submitterDeadline: number;
    submitterPrice: number;
    submitterQuestions: string;
};

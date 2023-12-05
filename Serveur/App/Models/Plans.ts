import mongoose from "mongoose";
const PlanSchema = new mongoose.Schema<planType>({
    planName: {
        type: String,
        required: true,
    },
    planDescription: {
        type: String,
        required: true,
    },
    planPrice: {
        type: Number,
        required: true,
    },
    planDiscount: {
        type: Number,
        required: true,
    },
    planFor: {
        type: Number,
        required: true,
    },
    planLength: {
        type: Number,
        required: true,
        default: 1,
    },
    planMinSubscription: {
        type: Number,
        required: true,
        default: 1,
    },
    createdAt: {
        type: Number,
        required: true,
        default: function () {
            return new Date().getTime();
        },
    },
    editedAt: {
        type: Number,
        required: true,
        default: function () {
            return new Date().getTime();
        },
    },
});

const PlanModel: mongoose.Model<planType> = mongoose.model<planType>("plans", PlanSchema);
export default PlanModel;

export type planType = {
    planName: string;
    planPrice: number;
    planDiscount: number;
    planLength: number; // mois
    planDescription: string;
    plancontent: number[];
    planMinSubscription: number; // months
    planFor: number; // 1: freelance , 2 : client , 3 entreprise
    createdAt: number;
    editedAt: number;
};

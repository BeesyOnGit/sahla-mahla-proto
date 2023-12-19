import mongoose from "mongoose";
const UtilitiesSchema = new mongoose.Schema<utilitiesType>({
    resourcesCategories: {
        type: [Number],
    },
    wilaya: {
        type: String,
    },
    commune: {
        type: String,
    },
    fr: {
        type: String,
    },
    ar: {
        type: String,
    },
    utilType: {
        type: String,
    },
    long: {
        type: String,
    },
    lat: {
        type: String,
    },
    postCode: {
        type: String,
    },
});

const UtilitiesModel: mongoose.Model<utilitiesType> = mongoose.model<utilitiesType>("utilities", UtilitiesSchema);
export default UtilitiesModel;

export type utilitiesType = {
    resourcesCategories?: number[];
    wilaya?: number;
    fr?: string;
    ar?: string;
    utilType?: string;
    long?: string;
    lat?: string;
    commune?: number;
    postCode?: string;
};

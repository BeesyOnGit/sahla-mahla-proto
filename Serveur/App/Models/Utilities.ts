import mongoose from "mongoose";
const UtilitiesSchema = new mongoose.Schema<utilitiesType>({
    resourcesCategories: {
        type: [Number],
    },
    wilaya: {
        type: String,
    },
    categoryCode: {
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
    wilaya?: string;
    fr?: string;
    ar?: string;
    utilType?: string;
    long?: string;
    lat?: string;
    commune?: string;
    postCode?: string;
    categoryCode?: string;
};

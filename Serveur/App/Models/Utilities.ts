import mongoose from "mongoose";
const UtilitiesSchema = new mongoose.Schema<utilitiesType>({
    resourcesCategories: {
        type: [Number],
    },
});

const UtilitiesModel: mongoose.Model<utilitiesType> = mongoose.model<utilitiesType>("utilities", UtilitiesSchema);
export default UtilitiesModel;

export type utilitiesType = {
    resourcesCategories?: number[];
};

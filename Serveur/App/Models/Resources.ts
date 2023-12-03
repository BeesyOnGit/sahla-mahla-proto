import mongoose from "mongoose";
const ResourcesSchema = new mongoose.Schema<resourcesType>({
    resourceType: {
        type: Number,
        required: true,
    },
    resourceThumbnail: {
        type: String,
        required: true,
    },
    resourceWaterLink: {
        type: String,
        required: true,
    },
    resourceLink: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
        default: function () {
            return new Date().getTime();
        },
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    timesSold: {
        type: Number,
        required: true,
        default: 0,
    },
    public: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const ResourcesModel: mongoose.Model<resourcesType> = mongoose.model<resourcesType>("resources", ResourcesSchema);
export default ResourcesModel;

export type resourcesType = {
    resourceType: number;
    resourceThumbnail: string;
    resourceWaterLink: string;
    resourceLink: string;
    owner: string;
    createdAt: number;
    price: number;
    discount: number;
    timesSold: number;
    public: boolean;
};

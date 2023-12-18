import mongoose from "mongoose";
const ResourcesSchema = new mongoose.Schema<resourcesType>({
    resourceType: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        lowercase: true,
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
    },
    categories: {
        type: [String],
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
        default: 0,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    timesSold: {
        type: Number,
        required: true,
        default: 0,
    },
    likes: {
        type: [String],
        required: true,
        default: [],
    },
    bookMarks: {
        type: [String],
        required: true,
        default: [],
    },
    lastTimeSold: {
        type: Number,
        default: null,
    },
    public: {
        type: Boolean,
        required: true,
        default: true,
    },
    buyers: {
        type: [String],
        required: true,
        default: [],
    },
});

ResourcesSchema.pre("save", function () {
    if (this.timesSold < this.buyers.length) {
        this.lastTimeSold = new Date().getTime();
    }
    this.timesSold = this.buyers.length;
});

const ResourcesModel: mongoose.Model<resourcesType> = mongoose.model<resourcesType>("resources", ResourcesSchema);
export default ResourcesModel;

export type resourcesType = {
    _id?: string;
    title: string;
    resourceType: number;
    resourceThumbnail: string;
    resourceWaterLink: string;
    resourceLink: string;
    owner: mongoose.Schema.Types.ObjectId | string;
    description: string;
    categories?: string[];
    createdAt: number;
    price: number;
    discount: number;
    timesSold: number;
    lastTimeSold: number;
    public: boolean;
    buyers: string[];
    owned?: boolean;
    likes: string[];
    bookMarks: string[];
};

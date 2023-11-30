import mongoose from "mongoose";
import { adressType } from "../MiddleWear/GeneralTypes";

const ClientSchema = new mongoose.Schema<clientType>({
    email: {
        type: String,
        unique: true,
    },

    emailConfirmation: {
        type: Boolean,
        default: false,
    },

    profilePicture: {
        type: String,
        default: null,
    },

    phone: {
        type: String,
        minLength: 10,
        maxLength: 10,
        required: true,
        validate: {
            validator: (v: string) => {
                return new RegExp(/^\d+$/).test(v);
            },
            message: "the phone number must contain only NUMBERS",
        },
    },

    phoneConfirmation: {
        type: Boolean,
        default: false,
    },

    passWord: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
        loadClass: true,
    },

    familyName: {
        type: String,
        required: true,
        loadClass: true,
    },

    dob: {
        type: Number,
        required: true,
    },

    poste: {
        type: String,
        required: true,
        loadClass: true,
    },

    IDcard: {
        type: [String],
        required: true,
    },
    approuved: {
        type: Boolean,
        required: true,
        default: false,
    },

    billing: {
        accountNumber: {
            type: String,
            required: true,
        },
        accountEndWith: {
            type: String,
            required: true,
        },
        credits: {
            type: Number,
            required: true,
            default: 0,
        },
    },

    createdAt: {
        type: Number,
        default: () => {
            return new Date().getTime();
        },
    },
    editedAt: {
        type: Number,
        default: () => {
            return new Date().getTime();
        },
    },

    adress: {
        country: {
            type: String,
            default: "algeria",
        },
        wilaya: {
            type: String,
        },
        commune: {
            type: String,
        },
        street: {
            type: String,
        },
    },
});

ClientSchema.pre("save", function () {
    this.editedAt = new Date().getTime();
});

const ClientModel: mongoose.Model<clientType> = mongoose.model<clientType>("clients", ClientSchema);
export default ClientModel;

export type clientType = {
    firstName: string;
    familyName: string;
    dob: number;

    email: string;
    emailConfirmation: boolean;
    passWord: string;

    phone: string;
    phoneConfirmation: boolean;

    poste: string;
    IDcard: string[];

    adress: adressType;

    createdAt: number;
    editedAt: number;
    approuved: boolean;

    profilePicture?: string;

    billing: {
        accountNumber: string;
        accountEndWith: string;
        credits: number;
    };
    // comment Multi * a usage interne
};

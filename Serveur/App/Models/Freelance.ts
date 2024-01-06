import mongoose from "mongoose";
import { adressType } from "../MiddleWear/GeneralTypes";
const FreelanceSchema = new mongoose.Schema<freelanceType>({
    email: {
        type: String,
        unique: true,
        lowercase: true,
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
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10,
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
        lowercase: true,
    },

    familyName: {
        type: String,
        required: true,
        lowercase: true,
    },

    dob: {
        type: Number,
        required: true,
    },

    degrees: {
        type: [
            {
                degreeName: {
                    type: String,
                    // required: true,
                    lowercase: true,
                },
                degreeFileLink: {
                    type: String,
                    // required: true,
                },
            },
        ],
        // required: true,
    },
    stamp: {
        type: String,
    },
    Field: {
        //specialité
        type: [String],
        // required: true,
        lowercase: true,
    },
    IDcard: {
        type: [String],
        // required: true,
    },
    aprouved: {
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
            minlength: 4,
            maxlength: 4,
        },
        credits: {
            type: Number,
            required: true,
            default: 0,
        },
    },

    notation: {
        type: Number,
        required: true,
        default: 0,
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

FreelanceSchema.pre("save", function () {
    this.editedAt = new Date().getTime();
});

const FreelanceModel: mongoose.Model<freelanceType> = mongoose.model<freelanceType>("freelance", FreelanceSchema);
export default FreelanceModel;

// export default new (mongoose.model as any)("freelance", FreelanceModel);

export type freelanceType = {
    firstName: string;
    familyName: string;
    dob: number;

    email: string;
    emailConfirmation: boolean;
    passWord: string;

    phone: string;
    phoneConfirmation: boolean;

    degrees: degreeType[];
    Field: string[];
    IDcard: string[];
    stamp?: string;
    aprouved: boolean;

    adress: adressType;

    createdAt: number;
    editedAt: number;

    notation: number;

    profilePicture?: string;

    billing: {
        accountNumber: string;
        accountEndWith: string;
        credits: number;
    };
    // comment Multi * a usage interne
    _id?: string;
};

export type degreeType = {
    degreeName: string;
    degreeFileLink: string;
};

import mongoose from "mongoose";
const UsersModels = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        // required: true,
        // unique: true,
    },

    // emailVeriffication: {
    //     type: Boolean,
    //     default: false,
    // },

    logoUrl: {
        type: String,
        default: null,
    },

    photosUrls: {
        type: Array,
        default: [],
    },

    phone: {
        type: Array,
        required: true,
    },

    phoneVerification: {
        type: Boolean,
        default: false,
    },

    passWord: {
        type: String,
        // required: true,
    },

    // fireBaseID: {
    //     type: String,
    //     required: true,
    // },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    joinDate: {
        type: Date, // date TimeStamp
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    productSerial: {
        type: Number,
        default: 1,
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

export default new (mongoose.model as any)("users", UsersModels);

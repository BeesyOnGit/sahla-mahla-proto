import mongoose from "mongoose";

const UserConfirmSchema = new mongoose.Schema<userConfirmationType>({
    email: {
        type: String,
        required: function (): boolean {
            const doc: any = this;
            if (doc.phone) {
                return false;
            }
            return true;
        },
    },
    phone: {
        type: String,
        required: function (): boolean {
            const doc: any = this;
            if (doc.email) {
                return false;
            }
            return true;
        },
    },

    rndConfirmation: {
        type: String,
        required: function (): boolean {
            const doc: any = this;
            if (doc.phone) {
                return false;
            }
            return true;
        },
    },
    otp: {
        type: String,
        required: function (): boolean {
            const doc: any = this;
            if (doc.email) {
                return false;
            }
            return true;
        },
    },

    createdAt: {
        type: Number,
        default: () => {
            return new Date().getTime();
        },
    },
    validUpTo: {
        type: Number,
        default: () => {
            const doc: any = this;
            const date = new Date();
            if (doc.phone) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + 3).getTime();
            }
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1, date.getMinutes()).getTime();
        },
    },
    used: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const UserConfirModel: mongoose.Model<userConfirmationType> = mongoose.model<userConfirmationType>("users-confirmation", UserConfirmSchema);
export default UserConfirModel;

export type userConfirmationType = {
    email?: string;
    phone?: string;
    otp?: string;
    rndConfirmation?: string;
    createdAt: number;
    validUpTo: number;
    used: boolean;
};

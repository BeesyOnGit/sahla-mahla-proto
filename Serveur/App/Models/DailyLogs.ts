import mongoose from "mongoose";
const DailyLogsSchema = new mongoose.Schema<dayilyLogsType>({
    doer: {
        type: String,
        required: true,
    },

    action: {
        type: String,
        required: true,
    },

    date: {
        type: Number,
        required: true,
        default: function () {
            return new Date().getTime();
        },
    },

    concerned: {
        type: String,
    },

    modification: {
        type: Object,
    },

    comment: {},
});

const DailyLogsModel: mongoose.Model<dayilyLogsType> = mongoose.model<dayilyLogsType>("daily-logs", DailyLogsSchema);
export default DailyLogsModel;

export type dayilyLogsType = {
    doer: string;
    action:
        | "login"
        | "register"
        | "account edition"
        | "account deletion"
        | "email validation"
        | "password change"
        | "phone verification"
        | "resource buy"
        | "account certification";
    date?: number;
    concerned?: string;
    modification?: any;
    comment?: string;
};

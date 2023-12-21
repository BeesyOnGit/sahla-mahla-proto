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
        | "login freelance"
        | "login client"
        | "register freelance"
        | "register client"
        | "account edition"
        | "account deletion"
        | "email validation"
        | "password change"
        | "phone verification"
        | "resource buy"
        | "resource liked/bookmarked"
        | "resource added"
        | "resource edited"
        | "resource removed"
        | "plan added"
        | "plan edited"
        | "plan removed"
        | "account certification"
        | "project created"
        | "project edited"
        | "project deleted"
        | "submited on project";
    date?: number;
    concerned?: string;
    modification?: any;
    comment?: string;
};

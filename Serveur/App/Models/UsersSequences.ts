import mongoose from "mongoose";

const UserSequencesSchema = new mongoose.Schema<usersSequanceType>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    invoiceSeq: {
        type: Number,
        required: true,
        default: 1,
    },
});

const UserSequencesModel: mongoose.Model<usersSequanceType> = mongoose.model<usersSequanceType>("users-sequences", UserSequencesSchema);
export default UserSequencesModel;

export type usersSequanceType = {
    user: mongoose.Schema.Types.ObjectId;
    invoiceSeq: number;
};

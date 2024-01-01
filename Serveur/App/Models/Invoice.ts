import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSequencesModel from "./UsersSequences";

dotenv.config();

const VAT = parseFloat(process.env.VAT!);
const InvoiceSchema = new mongoose.Schema<invoiceType>({
    emmiter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "freelance",
    },

    invoiceClient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref: "clients",
    },

    invoiceRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    invoiceDetail: {
        type: [
            {
                productName: String,
                productPrice: Number,
                productQuantity: Number,
                productDiscount: Number,
                productTotalCost: {
                    type: Number,
                    default: function () {
                        //@ts-ignore
                        const res: InvoiceDetailType = this;
                        const { productDiscount, productPrice, productQuantity } = res;
                        const subTotal = productPrice * productQuantity;
                        const discount = productDiscount * (productPrice * productQuantity);
                        return subTotal - discount <= 0 ? 0 : subTotal - discount;
                    },
                },
            },
        ],
        required: true,
    },
    //@ts-ignore
    invoiceNumber: {
        type: Number,
    },

    grossAmount: {
        type: Number,
        required: true,
        default: function (): number {
            const doc: invoiceType = this;
            const { invoiceDetail, discount } = doc;
            const subTotal = invoiceDetail.reduce((accumulator, currentValue) => accumulator + currentValue.productTotalCost!, 0);
            return subTotal <= 0 ? 0 : subTotal - subTotal * discount;
        },
    },

    totalAmount: {
        type: Number,
        required: true,
        default: function (): number {
            const doc: invoiceType = this;
            const { grossAmount } = doc;

            return grossAmount <= 0 ? 0 : grossAmount + grossAmount * VAT;
        },
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    invoiceModel: {
        type: Number,
        required: true,
        default: 0,
    },
    isPayed: {
        type: Boolean,
        required: true,
        default: false,
    },
    isInvoice: {
        type: Boolean,
        required: true,
        default: false,
    },
    invoiceType: {
        type: Number,
        default: 1,
    },

    createdAt: {
        type: Number,
        default: () => {
            return new Date().getTime();
        },
    },
    lastEdited: {
        type: Number,
        default: () => {
            return new Date().getTime();
        },
    },
});

InvoiceSchema.pre("save", async function () {
    this.lastEdited = new Date().getTime();

    if (!this.invoiceNumber) {
        const userSeq = await UserSequencesModel.findOne({ user: this.emmiter });
        if (!userSeq) {
            const createSeq = await UserSequencesModel.create({ user: this.emmiter, invoiceSeq: 2 });

            this.invoiceNumber = 1;
            return;
        }

        const { invoiceSeq } = userSeq!;

        this.invoiceNumber = invoiceSeq;
        userSeq!.invoiceSeq += 1;
        userSeq?.save();
    }
});

const InvoiceModel: mongoose.Model<invoiceType> = mongoose.model<invoiceType>("invoices", InvoiceSchema);
export default InvoiceModel;
// export default new (mongoose.model as any)("invoices", InvoiceModel);

export type invoiceType = {
    emmiter: mongoose.Schema.Types.ObjectId | string;
    invoiceClient: mongoose.Schema.Types.ObjectId | string;

    invoiceNumber: number;

    invoiceDetail: InvoiceDetailType[];

    grossAmount: number;
    discount: number;
    totalAmount: number;

    invoiceModel: number;
    isInvoice: boolean; // false: devis, true:facture
    invoiceType: number; // 1: achats , 2 : projet , 3 : abonnement

    invoiceRef: mongoose.Schema.Types.ObjectId | string;

    isPayed: boolean;
    createdAt: number;
    lastEdited: number;
    _id?: string;
};

export type InvoiceDetailType = {
    productName: string;
    productPrice: number;
    productQuantity: number;
    productDiscount: number;
    productTotalCost?: number;
};

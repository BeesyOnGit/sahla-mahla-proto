import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const VAT = parseFloat(process.env.VAT!);
const InvoiceSchema = new mongoose.Schema<invoiceType>({
    // emmiter: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     required: true,
    //     ref: "freelance",
    // },

    // invoiceClient: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "clients",
    // },

    // invoiceProject: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "projects",
    // },

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
                        const res: InvoiceDetailType = this;
                        const { productDiscount, productPrice, productQuantity } = res;
                        const subTotal = productPrice * productQuantity;
                        const discount = productDiscount * (productPrice * productQuantity);
                        return subTotal - discount;
                    },
                },
            },
        ],
        required: true,
    },

    invoiceNumber: {
        type: String,
        required: true,
    },

    grossAmount: {
        type: Number,
        required: true,
        default: function (): number {
            const doc: invoiceType = this;
            const { invoiceDetail, discount } = doc;
            const subTotal = invoiceDetail.reduce((accumulator, currentValue) => accumulator + currentValue.productTotalCost, 0);
            return subTotal - subTotal * discount;
        },
    },

    totalAmount: {
        type: Number,
        required: true,
        default: function (): number {
            const doc: invoiceType = this;
            const { grossAmount } = doc;

            return grossAmount + grossAmount * VAT;
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

InvoiceSchema.pre("save", function () {
    this.lastEdited = new Date().getTime();
});

const InvoiceModel: mongoose.Model<invoiceType> = mongoose.model<invoiceType>("invoices", InvoiceSchema);
export default InvoiceModel;
// export default new (mongoose.model as any)("invoices", InvoiceModel);

export type invoiceType = {
    emmiter: mongoose.Schema.Types.ObjectId[];
    invoiceClient: mongoose.Schema.Types.ObjectId;

    invoiceNumber: string;

    invoiceDetail: InvoiceDetailType[];

    grossAmount: number;
    discount: number;
    totalAmount: number;

    invoiceModel: number;

    invoiceProject: mongoose.Schema.Types.ObjectId;

    isPayed: boolean;
    createdAt: number;
    lastEdited: number;
};

export type InvoiceDetailType = {
    productName: string;
    productPrice: number;
    productQuantity: number;
    productDiscount: number;
    productTotalCost: number;
};

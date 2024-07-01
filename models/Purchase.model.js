const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Purchase model to whatever makes sense in this case
const purchaseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        itemType: {
            type: String,
            enum: ["cruise", "vacation", "flight", "hotel-booking"],
            required: true
        },
        itemBought: {
            type: Schema.Types.ObjectId,
            required: true
        },
        paymentStatus: {
            type: String,
            default: ["payment-pending"],
            enum: ["payment-pending", "payment-successful"],
            required: true
        }

    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Purchase = model("Purchase", purchaseSchema);

module.exports = Purchase;

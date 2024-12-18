import { mongoose } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,
    cartProducts: Object,
    totalPrice: String,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models?.Order || mongoose.model("Order", OrderSchema);

import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: { type: String },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String, // 修正成 JavaScript 的原生類型 String
    },
    authProviderId: {
      type: String,
    },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

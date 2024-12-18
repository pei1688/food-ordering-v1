import { mongoose } from "mongoose";

const ExtraPriceSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const menuItemSchma = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  basePrice: { type: Number },
  sizes: { type: [ExtraPriceSchema] },
  extraIngredientPrice: { type: [ExtraPriceSchema] }, //額外成分價格
});

export const MenuItem =
  mongoose.models?.MenuItem || mongoose.model("MenuItem", menuItemSchma);

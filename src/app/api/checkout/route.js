import connectDB from "@/lib/db";
import { auth } from "../../../auth";
import { MenuItem } from "@/app/models/MenuItem";
import { Order } from "@/app/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  await connectDB();

  const { cartProducts, addressInfo, totalPrice } = await req.json();
  const session = await auth();
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...addressInfo,
    cartProducts,
    totalPrice,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras.find(
          (extra) =>
            extra._id.toString() === cartProductExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "twd",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      "http://localhost:3000/" +
      "thankOrder/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: "http://localhost:3000/" + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "twd" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}

//連接mongoose資料庫

import mongoose from "mongoose";


let isConnected = false; // 用來追蹤是否已連接

export default async function connectDB() {
  if (isConnected) {
    console.log("已經連接到 MONGODB");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 秒連接超時
      socketTimeoutMS: 45000, // 45 秒連接中斷超時
    });

    isConnected = conn.connections[0].readyState === 1;
    if (isConnected) {
      console.log("成功連接至 MONGODB");
    }
  } catch (error) {
    console.error(`連接到 MONGODB 時發生錯誤: ${error.message}`);
    // 視需求是否終止進程
    // process.exit(1);
  }
}

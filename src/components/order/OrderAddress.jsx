import { Label } from "@/components/ui/label";
import { BookUser } from "lucide-react";
function OrderAddress({ order }) {
  return (
    <div className="space-y-4 bg-food-200 px-4  w-full  rounded-md h-[500px] flex flex-col ">
      <h1 className="text-2xl flex items-center gap-2 font-semibold text-zinc-100">
        <BookUser size={20} />
        寄送資訊
      </h1>
      <InfoInput label="電子信箱" value={order.userEmail} />
      <InfoInput label="電話" value={order.phone} />
      <InfoInput label="郵遞區號" value={order.postalCode} />
      <InfoInput label="城市" value={order.city} />
      <InfoInput label="地址" value={order.streetAddress} />
    </div>
  );
}

export default OrderAddress;
//重用欄位
function InfoInput({ label, value }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="w-full border-b-food-50 border-b">
        <p className="py-2">{value || "未提供"}</p>
      </div>
    </div>
  );
}

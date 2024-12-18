"use client"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AdressInfo({ addressInfo, onAddressChange }) {
  function handleChange(e) {
    const { name, value } = e.target;
    const updateInfo = { ...addressInfo, [name]: value };
    
    onAddressChange(updateInfo);
  }

  return (
    <div className=" space-y-4">
      <div className="space-y-4">
        <Label className="text-zinc-100">姓名</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={addressInfo.name}
          className="w-full text-zinc-800"
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="space-y-4">
        <Label className="text-zinc-100">電子信箱</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={addressInfo.email}
          className="w-full text-zinc-800"
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="space-y-4">
        <Label className="text-zinc-100">電話</Label>
        <Input
          type="phone"
          id="phone"
          name="phone"
          className="w-full text-zinc-800"
          onChange={handleChange}
          placeholder="ex.09123456"
          value={addressInfo.phone}
        />
      </div>

      <div className=" flex items-center gap-4">
        <div className="space-y-4  flex-1">
          <Label className="text-zinc-100">郵遞區號</Label>
          <Input
            type="number"
            id="postalCode"
            name="postalCode"
            className="w-full text-zinc-800"
            onChange={handleChange}
            placeholder="ex.321"
            value={addressInfo.postalCode}
          />
        </div>
        <div className="space-y-4 flex-1">
          <Label className="text-zinc-100">城市</Label>
          <Input
            type="text"
            id="city"
            name="city"
            className="w-full text-zinc-800"
            onChange={handleChange}
            placeholder="ex.新北"
            value={addressInfo.city}
          />
        </div>
      </div>
      <div className="flex gap-4 flex-col ">
        <Label className="text-zinc-100">地址</Label>
        <Input
          type="text"
          id="streetAddress"
          name="streetAddress"
          className="w-full text-zinc-800"
          onChange={handleChange}
          placeholder="ex.地址"
          value={addressInfo.streetAddress}
        />
      </div>
    </div>
  );
}

export default AdressInfo;

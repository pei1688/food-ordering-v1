"use client";
import Image from "next/image";
import Modal from "./Modal";
import { Button } from "../ui/button";
import { Flower, Minus, Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";


function MenuItemModal({ item, open, setOpen, addToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const transformedSizes = item.sizes.map((size) => ({
    sizeName: size.name,
    price: size.price,
    _id: size._id.toString(),
  }));

  const transformedExtras = item.extraIngredientPrice.map((extra) => ({
    extraName: extra.name,
    price: extra.price,
    _id: extra._id.toString(),
  }));

  function handleSizeChange(size) {
    setSelectedSize(size);
  }

  function handleExtraChange(extra) {
    const existingExtra = selectedExtra.find(
      (selected) => selected.extraName === extra.extraName
    );

    if (existingExtra) {
      // 移除已選擇的加料
      setSelectedExtra(
        selectedExtra.filter(
          (selected) => selected.extraName !== extra.extraName
        )
      );
    } else {
      // 新增加料
      setSelectedExtra([...selectedExtra, extra]);
    }
  }
  // 總價格
  let selectedPrice = item.basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtra?.length > 0) {
    selectedPrice += selectedExtra.reduce((sum, extra) => sum + extra.price, 0);
  }

  // 重置
  function resetSelections() {
    setSelectedSize(null);
    setSelectedExtra([]);
    setQuantity(1);
  }

  const product = {
    ...item,
    selectedSize,
    selectedExtra,
    quantity,
    totalPrice: selectedPrice * quantity,
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        resetSelections();
      }}
      className=""
    >
      <>
        <div className="relative w-full h-[300px] lg:h-[400px] ">
          <Image
            src={item.image}
            alt="name"
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute top-0 right-0">
            <Button variant="modal" onClick={() => setOpen(false)}>
              X
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col text-zinc-100 p-4">
          <div className="text-2xl md:text-3xl flex items-center gap-4">
            <Flower size={30} />
            {item.name} <Flower size={30} />
          </div>
          <div className="text-sm my-4  text-center">
            {item.description}
          </div>
          {transformedSizes.length > 0 && (
            <>
              <div className="mt-6 flex w-full font-semibold mb-2">
                選擇大小
              </div>
              {transformedSizes.map((size) => (
                <p
                  key={size._id}
                  className="text-md w-full  border my-2 py-3 rounded-lg"
                >
                  <Label
                    htmlFor={size._id}
                    className="cursor-pointer w-full flex items-center  gap-3 px-3"
                  >
                    <Input
                      type="radio"
                      id={size._id}
                      name="sizes"
                      checked={selectedSize?.sizeName === size.sizeName}
                      className="h-5 w-5"
                      onChange={() => handleSizeChange(size)}
                    />
                    {size.sizeName}: ${size.price}
                  </Label>
                </p>
              ))}
            </>
          )}
          {transformedExtras.length > 0 && (
            <>
              <div className="mt-6 flex w-full font-semibold mb-2">
                選擇加料
              </div>
              {transformedExtras.map((extra) => (
                <p
                  key={extra._id}
                  className="text-md w-full flex items-center gap-3 border my-2  rounded-lg pl-3 "
                >
                  <Checkbox
                    id={`extraIngredientPrice-${extra._id}`}
                    name="extraIngredientPrice"
                    value={extra.extraName}
                    checked={selectedExtra.some(
                      (selected) => selected.extraName === extra.extraName
                    )}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    onCheckedChange={() => handleExtraChange(extra)}
                  />
                  <Label
                    htmlFor={`extraIngredientPrice-${extra._id}`}
                    className="cursor-pointer w-full pl-4 py-3"
                  >
                    {extra.extraName}: ${extra.price}
                  </Label>
                </p>
              ))}
            </>
          )}
          <div className="flex items-center justify-between  mt-4 w-full flex-col sm:flex-row gap-4">
            <div className="flex items-center  gap-4">
              <Button
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
                className={`${
                  quantity <= 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                variant="create"
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </Button>
              {quantity}
              <Button
                onClick={() => setQuantity(quantity + 1)}
                variant="create"
              >
                <Plus size={20} />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <p className="font-semibold text-md md:text-lg ">
                總價格: ${selectedPrice * quantity}
              </p>
              <Button
                variant="create"
                onClick={() => {
                  addToCart(product);
                  resetSelections();
                  setOpen(false);
                }}
              >
                加入購物車
              </Button>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default MenuItemModal;

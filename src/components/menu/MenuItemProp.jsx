"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function MenuItemProp({ prop, setProp, name, label }) {
  function addProp() {
    setProp((oldProp) => {
      return [...oldProp, { name: "", price: 0 }];
    });
  }

  function editProp(e, index, prop) {
    const newValue = e.target.value;
    setProp((prevProp) => {
      const newProp = [...prevProp];
      newProp[index][prop] = newValue;
      return newProp;
    });
  }

  //刪除
  function removeProp(index) {
    setProp((prev) => prev.filter((v, i) => i !== index));
  }
  return (
    <div className="bg-food-300 px-2 rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm flex font-semibold">
            <div className="flex items-center gap-3">
              <h1>{name}</h1>
              <div
                className={` bg-brown-100 text-brown-400 px-1 text-xs rounded-full ${
                  prop.length ? "block" : "hidden"
                }`}
              >
                {prop.length}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5">
            {prop?.length > 0 &&
              prop.map((size, index) => (
                <div className="flex gap-2 items-end" key={index}>
                  {/* 名稱輸入框 */}
                  <div className="space-y-3 flex-grow">
                    <Label>{label}</Label>
                    <Input
                      type="text"
                      placeholder={`輸入${label}`}
                      value={size.name}
                      className="text-zinc-800 w-full"
                      onChange={(e) => editProp(e, index, "name")}
                    />
                  </div>
                  {/* 額外價格輸入框 */}
                  <div className="space-y-3 flex-grow">
                    <Label>額外價格</Label>
                    <Input
                      type="text"
                      placeholder="輸入額外價格"
                      value={size.price}
                      className="text-zinc-800 w-full"
                      onChange={(e) => editProp(e, index, "price")}
                    />
                  </div>
                  {/* 刪除按鈕 */}
                  <div className="flex-grow">
                    <Button
                      variant="create"
                      type="button"
                      onClick={() => removeProp(index)}
                      className="w-full"
                    >
                      <Trash2 size={22} />
                    </Button>
                  </div>
                </div>
              ))}
            <div className="flex items-center">
              <Button
                type="button"
                variant="create"
                className="w-full"
                onClick={addProp}
              >
                <Plus size={22} />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default MenuItemProp;

import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

function Counter({ quantity, setQuantity }) {
  function handleDec() {
    if (quantity > 1) setQuantity(quantity - 1);
  }
  function handleIec() {
    setQuantity(quantity + 1);
  }

  return (
    <>
      <Button
        onClick={handleDec}
        className={`${quantity <= 1 ? "cursor-not-allowed opacity-50" : ""}`}
        variant="quantity"
        disabled={quantity <= 1}
      >
        <Minus size={20} />
      </Button>
      {quantity}
      <Button onClick={handleIec} variant="quantity">
        <Plus size={20} />
      </Button>
    </>
  );
}

export default Counter;

import React, { useContext, useState } from "react";
import { myContext } from "./Context";

function Counter() {
  const [count, setCount] = useState(0);
  const {cart,setCart}=useContext(myContext)

  const incrementCount = () => {
    setCount(count + 1);
    setCart([...cart,cart])
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      setCart(cart.slice(0, -1));
    } else {
      setCount(0);
    }
  };


  return (
    <div className="flex bg-green-500 gap-[2rem] max-w-fit pl-2 pr-2 rounded-2xl">
      <button className="text-white font-bold text-lg" onClick={decrementCount}>
        -
      </button>
      <p className="text-white font-bold text-lg">{count}</p>
      <button className="text-white font-bold text-lg" onClick={incrementCount}>
        +
      </button>
    </div>
  );
}

export default Counter;

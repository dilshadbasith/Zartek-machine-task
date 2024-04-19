import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);


  const incrementCount = () => {
    setCount(count + 1);
  };


  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className='flex bg-green-500 gap-[2rem] max-w-fit pl-2 pr-2 rounded-2xl'>
      <button className='text-white font-bold text-lg' onClick={decrementCount}>-</button>
      <p className='text-white font-bold text-lg'>{count}</p>
      <button className='text-white font-bold text-lg' onClick={incrementCount}>+</button>
    </div>
  );
}

export default Counter;

import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import { myContext } from "./Components/Context";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <myContext.Provider value={{cart,setCart}}>
        <Home />
      </myContext.Provider>
    </>
  );
}

export default App;

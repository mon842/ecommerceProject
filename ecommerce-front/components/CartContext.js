// import { createContext, useEffect, useState } from "react";

// export const CartContext = createContext({});

// export function CartContextProvider({ children }) {
//     const ls = typeof window !== "undefined" ? localStorage : {};
//     const [cartProducts, setCartProducts] = useState(
//         JSON.parse(ls.getItem('cart')) || []);

//     useEffect(() => {
//         if (cartProducts?.length > 0) {
//             ls?.setItem('cart', JSON.stringify(cartProducts));
//         }
//     }, [cartProducts]);

//     const addProduct = (productId) => {
//         setCartProducts(prev => [...prev, productId]);
//     }

//     return (
//         <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
//             {children}
//         </CartContext.Provider>
//     )
// }


import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {

  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);
  
  function addProduct(productId) {
    setCartProducts(prev => [...prev,productId]);
  }

  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct}}>
      {children}
    </CartContext.Provider>
  );
}
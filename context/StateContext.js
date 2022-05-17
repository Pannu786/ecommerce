// * IMPORTED THESE FILES FROM THE REPOSITORY (REACT)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// *CREATED CONTEXT
const Context = createContext();

//* HOOK(STATES) FOR USING CONTEXT
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  //* FUNCTION TO ADD ITEM AND UPDATE QUANTITY TO CART
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  //* FUNCTION TO INCREMENT QUANTITY
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //* FUNCTION TO DECREMENT QUANTITY
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  //* ALL THE STATES AND FUNCTIONS ARE PASSED TO THE CHILD COMPONENT
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        decQty,
        incQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// * EXPORTING CONTEXT TO USE IN OTHER COMPONENTS
export const useStateContext = () => useContext(Context);

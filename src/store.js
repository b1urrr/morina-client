import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./features/navbar/navbarSlice";
import productsReducer from "./features/products/productsSlice";
import cartReducer from "./features/cart/cartSlice";
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart.cart);
});
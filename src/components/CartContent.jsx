import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import CartColumns from "./CartColumns";
import { clearCart, countCartTotals } from "../features/cart/cartSlice";
const CartContent = () => {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearCart())
    dispatch(countCartTotals())
  }

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          Към продуктите
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={() => handleClick()}
        >
          изчисти количката
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;

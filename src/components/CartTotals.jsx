import React, { useEffect } from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countCartTotals } from "../features/cart/cartSlice";
const CartTotals = () => {
  const { total_amount ,cart  } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
const shipping_fee = 534
  useEffect(() => {
    dispatch(countCartTotals());
  }, [cart]);

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            всички продукти:<span>{formatPrice(total_amount)}</span>
          </h5>
          <p>
            цена за доставка:<span>{formatPrice(shipping_fee)}</span>
          </p>
          <hr />
          <h4>
            общо:<span>{formatPrice(total_amount + shipping_fee)}</span>
          </h4>
        </article>
        <Link to="/checkout" className="btn">
          Продължи към плащане
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
  span {
    text-transform: none;
  }
`;

export default CartTotals;

import React from 'react'
import { BsCart4} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const CartButtons = () => {
  const {total_items} = useSelector((store) => store.cart)
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn'>
        Количка
        <span className='cart-container'>
          <BsCart4 />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
display: flex;
justify-content: center;

  .cart-btn {
    color: var(--clr-primary-1);
    font-size: 1.2rem;
    color: var(--clr-grey-1);
    display: flex;
    letter-spacing: var(--spacing);
    align-items: center;
  }
  .cart-btn svg {
    font-size: 2rem
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 2.5rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -7px;
    right: 2px;
    background: var(--clr-primary-8);
    width: 10px;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--clr-white);
    padding: 12px;
  }
`
export default CartButtons

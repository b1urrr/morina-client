import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  updateFilters,
} from "../features/products/productsSlice";
import { formatPrice, getUniqueValues } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
const Filters = () => {
  const dispatch = useDispatch();
  const {
    products,
    filters: { text, category, color, min_price, price, max_price },
  } = useSelector((store) => store.products);

  const categories = getUniqueValues(products, "category");
  const colors = getUniqueValues(products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={text}
              placeholder="търси"
              onChange={(e) =>
                dispatch(
                  updateFilters({ value: e.target.value, name: e.target.name })
                )
              }
              className="search-input"
            />
          </div>
          {/* end of search input */}
          {/* categories */}
          <div className="form-control">
            <h5>категория</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) =>
                      dispatch(
                        updateFilters({
                          value: e.target.value,
                          name: e.target.name,
                        })
                      )
                    }
                    type="button"
                    name="category"
                    value={c}
                    className={`${
                      category === c ? "active" : null
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* colors */}
          <div className="form-control">
            <h5>цветове</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={(e) =>
                        dispatch(
                          updateFilters({
                            value: e.target.dataset.color,
                            name: e.target.name,
                          })
                        )
                      }
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      всички
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={(e) =>
                      dispatch(
                        updateFilters({
                          value: e.target.dataset.color,
                          name: e.target.name,
                        })
                      )
                    }
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
           {/* price */}
           <div className="form-control">
            <h5>цена</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={(e) =>
                      dispatch(
                        updateFilters({
                          value: Number(e.target.value),
                          name: e.target.name,
                        })
                      )
                    }
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
        </form>
        <button type="button" className="clear-btn" onClick={() => dispatch(clearFilters())}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-gray-2);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-gray-5);
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;

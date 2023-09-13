import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getSingleProduct } from "../features/products/productsSlice";
import { ProductImages, AddToCart } from "../components";
const SingleProductPage = () => {
  const { id } = useParams();
  const { products } = useSelector((store) => store.products);
  const [ product ] = products.filter((product) => id === product._id)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [id]);
  

  if (!product) {
    return
  }
  const { name, price, description, stock, id: sku, images } = product;
  return (
    <Wrapper>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          обратно към продуктите
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Наличност: </span>
              {stock > 0 ? "Да" : "в момента не е налично"}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
    
    text-transform: none;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;

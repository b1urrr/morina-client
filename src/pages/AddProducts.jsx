import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  setCurrentId,
} from "../features/products/productsSlice";
import styled from "styled-components";

const initialProduct = {
  name: "",
  price: 0,
  image: "",
  colors: [],
  description: "",
  category: "",
  shipping: false,
};
const Form = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState(initialProduct);
  const currentId = useSelector((store) => store.currentId);
  const product = useSelector((store) =>
    currentId
      ? store.products.find((product) => product.id === currentId)
      : null
  );
  useEffect(() => {
    if (product) setNewProduct(product);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (currentId) {
    //   dispatch(updateProduct(currentId, newProduct));
    // } else {    }
    dispatch(createProduct(newProduct));

    clearForm();
    // console.log(newProduct);
  };
  const clearForm = () => {
    setCurrentId(null);
    setNewProduct(initialProduct);
  };

  return (
    <Wrapper>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>{currentId ? "EDIT" : "NEW"} Product</h1>
        <div className="field">
          <label>Product Name: </label>
          <input
            required
            type="text"
            label="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Product Price: </label>

          <input
            required
            type="text"
            label="price"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Product Image URL: </label>
          <input
            required
            type="text"
            label="image"
            placeholder="Product Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
        </div>
        {/* <div className="field">
          <label>Product Colors: </label>
          <input
            required
            type="text"
            label="color"
            placeholder="Product Color"
            value={newProduct.color}
            onChange={(e) =>
              setNewProduct({ ...newProduct, color: [e.target.value] })
            }
          />
        </div> */}
        <div className="field">
          <label>Product Description: </label>
          <input
            required
            type="text"
            label="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Product Category: </label>
          <input
            required
            type="text"
            label="category"
            placeholder="Product Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Free Shipping?: </label>
          <input
            type="checkbox"
            label="shipping"
            placeholder="Free Shipping"
            value={newProduct.shipping}
            onChange={(e) =>
              setNewProduct({ ...newProduct, shipping: e.target.value })
            }
          />
        </div>
        {/* <div className="field">
          <label>Generate Unique ID</label>
          <input
            required
            type="checkbox"
            label="id"
            placeholder="id"
            value={newProduct.id}
            onChange={(e) => setNewProduct({ ...newProduct, id: nanoid() })}
          />
        </div> */}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 5rem;
  .field {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    min-width: 350px;
  }
  .btn {
    padding: 1rem 3rem;
  }
`;

export default Form;

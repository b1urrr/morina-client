import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  setCurrentId,
} from "../features/products/productsSlice";
import styled from "styled-components";
import { productColors } from "../utils/constants";

const initialProduct = {
  name: "",
  price: 0,
  images: [],
  stock: 1,
  colors: [],
  description: "",
  category: "",
  shipping: false,
};
const Form = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState(initialProduct);
  const currentId = useSelector((store) => store.currentId);

  const tempArray = [1, 2, 3, 4, 5]
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
  };
  const clearForm = () => {
    setCurrentId(null);
    setNewProduct(initialProduct);
  };

  const handleColorChanges = (e) => {
    if (e.target.checked) {
      setNewProduct({
        ...newProduct,
        colors: [...newProduct.colors, e.target.value],
      });
    } else {
      // Remove the value from the array
      setNewProduct({
        ...newProduct,
        colors: newProduct.colors.filter((color) => color !== e.target.value),
      });
    }
  };
  const handleImageChanges = (e) => {
      if (e.target.value.startsWith('http')) {
      setNewProduct({ 
        ...newProduct, 
        images: [...newProduct.images, e.target.value] 
      })
    }
  }


  return (
    <Wrapper>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>{currentId ? "EDIT" : "NEW"} Product</h1>
        {/* Product Name */}
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
        {/* Product Price */}
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
        {/* Product Image */}
        {tempArray.map((item) => {
          return <div key={item} className="field">
          <label>Product Image URL №{item}: </label>
          <input
            required={item <= 3 ? true : false}
            type="text"
            label="image"
            placeholder="Product Image URL"
            value={newProduct.image}
            onChange={handleImageChanges}
          />
        </div>
        })}
        
        {/* Product Colors */}
        <label>Product Colors: </label>
        <div className="field colors">
          {productColors.map((color, index) => {
            return (
              <div
                className="color-checkbox"
                key={index}
                style={{ backgroundColor: color }}
              >
                <input
                  type="checkbox"
                  label="colors"
                  value={color}
                  onChange={handleColorChanges}
                />
              </div>
            );
          })}
        </div>
        <div className="selected">
          Selected colors:
          {newProduct.colors.map((color, index) => {
            return (
              <div key={index}
                className="selected-color"
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
        </div>
        {/* Product Description */}
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
        {/* Product Category */}
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
        {/* Stock Available */}
        <div className="field">
          <label>Налично количество: </label>
          <input
            type="number"
            label="shipping"
            placeholder="1"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
        </div>
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
  .colors {
    flex-wrap: wrap;
  }
  .btn {
    padding: 1rem 3rem;
  }
  .color-checkbox {
    flex-basis: 16%;
    display: flex;
    justify-content: center;
    height: 25px;
    margin: 3px;
  }
  .selected {
    margin-top: 1rem;
    display: flex;
    gap: 3px;
    align-items: center;
  }
  .selected-color {
    width: 35px;
    height: 35px;
  }
`;

export default Form;

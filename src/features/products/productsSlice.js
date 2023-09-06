import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { products_url as url } from "../../utils/constants";

const initialState = {
  // product
  products_loading: false,
  products_error: false, // double check if needed
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  // sort
  sort: "price-lowest",
  grid_view: true,
  // filters
  filtered_products: [],
  filters: {
    text: "",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
  },
  // Database
  current_id: null,
  create_product_loading: false,
  create_product: [],
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const res = await axios(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (url) => {
    try {
      const res = await axios(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct", 
  async (product) => {
    try {
      const res = await axios.post(url, product)
      return res.data;
    } catch (error) {
      console.log(error)
    } 
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setGridView: (state) => {
      state.grid_view = true;
    },
    setListView: (state) => {
      state.grid_view = false;
    },
    updateSort: (state, action) => {
      state.sort = action.payload.value;
      if (state.sort === "price-lowest") {
        state.filtered_products = state.filtered_products.sort(
          (a, b) => a.price - b.price
        );
      }
      if (state.sort === "price-highest") {
        state.filtered_products = state.filtered_products.sort(
          (a, b) => b.price - a.price
        );
      }
      if (state.sort === "name-a") {
        state.filtered_products = state.filtered_products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (state.sort === "name-z") {
        state.filtered_products = state.filtered_products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
    },
    updateFilters: (state, action) => {
      let { name, value } = action.payload;
      state.filters = { ...state.filters, [name]: value };

      const { text, category, color, price } = state.filters;

      let tempProducts = [...state.products];
      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().includes(text)
        );
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      tempProducts = tempProducts.filter((product) => product.price <= price);
      state.filtered_products = tempProducts;
    },
    clearFilters: (state) => {
      state.filters = {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
      };
      state.filtered_products = state.products;
    },
    // Database actions
    setCurrentId: (state, action) => {
      state.current_id = action.payload.value;
    },
    // End
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.products_loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.products_loading = false;
      state.products = action.payload;
      state.filtered_products = action.payload;
      let maxPrice = action.payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);
      state.filters.price = maxPrice;
      state.filters.max_price = maxPrice;
    },
    [getAllProducts.rejected]: (state) => {
      state.single_product_loading = false;
    },
    [getSingleProduct.pending]: (state) => {
      state.single_product_loading = true;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.single_product_loading = false;
      state.single_product = action.payload;
    },
    [getSingleProduct.rejected]: (state) => {
      state.single_product_loading = false;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.create_product_loading = false;
    },
  },
});

export const {
  setGridView,
  setListView,
  updateSort,
  updateFilters,
  clearFilters,
  setCurrentId,
} = productsSlice.actions;
export default productsSlice.reducer;

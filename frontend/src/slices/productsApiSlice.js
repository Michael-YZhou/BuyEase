import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Create a new slice for the product API and inject the endpoints to the parent slice
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),
    getProductDetails: builder.query({
      query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;

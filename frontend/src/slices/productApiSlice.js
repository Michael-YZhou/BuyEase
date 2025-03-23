import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCT_URL }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),
    getProductById: builder.query({
      query: (id) => `${PRODUCT_URL}/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;

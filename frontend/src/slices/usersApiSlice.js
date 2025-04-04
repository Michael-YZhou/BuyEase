import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Create a new slice for the product API and inject the endpoints to the parent slice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL + "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;

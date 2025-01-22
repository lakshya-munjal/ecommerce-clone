import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductResponse } from "./types";

export const storeApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getCategories: builder.query<Array<string>, void>({
      query: () => `/products/categories`,
      transformResponse: (response: Array<string>) =>
        response.map((item) => {
          return `${item[0].toUpperCase()}${item.slice(1)}`;
        }),
    }),
    getProductsList: builder.query<Array<ProductResponse>, void>({
      query: () => `/products`,
    }),
    getProductsByCategory: builder.query<Array<ProductResponse>, string>({
      query: (category: string) => `/products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsListQuery,
  useGetCategoriesQuery,
  useLazyGetProductsByCategoryQuery,
} = storeApi;

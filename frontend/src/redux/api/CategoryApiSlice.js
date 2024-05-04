import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

export const CategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: data,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    GetAllGategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),

    GetCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllGategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = CategoryApiSlice;

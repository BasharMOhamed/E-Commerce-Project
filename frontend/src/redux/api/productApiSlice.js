
import {PRODUCT_URL ,UPLOAD_URL} from '../constants' 
import {apiSlice}from './apiSlice'


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query: ({keyword})=>({
                url:`${PRODUCT_URL}`,
                params : {keyword},
            }),

            keepUnusedDataFor:5,
            providesTages:["Product"],
        }),

        getProductById: builder.query({
            query:(productId)=>`${PRODUCT_URL}/${productId}`,
            providesTags:(result ,error,productId)=>[
                {type :"Product",id:productId}
            ],
        }),

        allProducts:builder.query({
            query:()=>`${PRODUCT_URL}/allproducts`,
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                erl:`${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor:5,
        }),
        createProduct : builder.mutation({
            query:(productData)=>({
                url:`${PRODUCT_URL}`,
                method:'POST',
                body: productData,
            }),
            invalidatesTages:["Product"],
        }),
        updateProduct:builder.mutation({
            query:({productId,FormData})=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:'PUT',
                body:FormData
            }),
        }),

        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:"POST",
                body:data,
            }),
        }),
         deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:"DELETE"
            }),
            providesTages: ['Product']
         }),

        createReview:builder.mutation({
            query:(data)=>({
                url:`${PRODUCT_URL}/${data.productId}/reviews`,
                method:'POST',
                body: data
            })
        }),

        getTopProducts:builder.query({
            query:()=> `${PRODUCT_URL}/top`,
            keepUnusedDataFor:5,
        }),
       getNewProducts:builder.query({
        query:()=>`${PRODUCT_URL}/new`,
        keepUnusedDataFor:5,
       }) ,
    }),
});

export const{

   useGetProductByIdQuery,
   useGetProductsQuery,
   useLazyGetProductDetailsQuery,
   useAllProductsQuery,
   useCreateProductMutation,
   useUpdateProductMutation,
   useDeleteProductMutation,
   useCreateReviewMutation,
   useLazyGetTopProductsQuery,
   useLazyGetNewProductsQuery, 
   useUploadProductImageMutation
 
}= productApiSlice
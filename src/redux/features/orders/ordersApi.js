import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseURL from '../../../utils/baseURL';



const OrdersApi = createApi ({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
         baseUrl: `${getBaseURL()}api/orders`,
         credentials: 'include', 
        }),
        tagTypes: ['Orders'],
        endpoints: (builder) => ({
            createOrder: builder.mutation ({
                query: (newOrder) => ({
                    url: "/",
                    method: 'POST',
                    body: newOrder,
                    credentials: 'include',
                })
            }),
            getOrderByEmail: (builder.query) ({
                 query: (email) => ({
                    url: `/email/${email}`
            }),
            providesTags: ['Orders']
        })
    })  
});


export const {useCreateOrderMutation, useGetOrderByEmailQuery} = OrdersApi;

export default OrdersApi;
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Settings from "../../config/settings"


export const mainSliceApi = createApi({ 
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: Settings.API,
        prepareHeaders(headers){
            return headers
        }
    }),
    endpoints: (build) => ({ 
        fetchCurrency: build.query({
            query: () => `/conf/pub:list:currency`
            // For a list of all currencies on the platform, look to:
        }),
        fetchPairs: build.query({
            query: (type) => `/conf/pub:list:pair:exchange`
                // For a list of all trading pairs on the platform, look to:
        }),
        fetchMarginPairs: build.query({
            query: () => `/conf/pub:list:pair:margin`
               //  For a list of all margin trading pairs on the platform, look to:
        }),

        fetchBooking: build.query({
            query: (pair) => `book/t${pair}/P0`
               //  For a list of all margin trading pairs on the platform, look to:
        }),


    }),
});


export const { useFetchCurrencyQuery, useFetchMarginPairsQuery, useFetchPairsQuery, useFetchBookingQuery } = mainSliceApi
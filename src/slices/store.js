import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageDataSlice'
export const store = configureStore({
    reducer: {
        pageData: pageReducer
    },
})
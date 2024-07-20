import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageDataSlice'
import siteReducer from './siteDataSlice'
export const store = configureStore({
    reducer: {
        pageData: pageReducer,
        siteData: siteReducer
    },
})

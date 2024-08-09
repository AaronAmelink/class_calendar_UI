import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageDataSlice';
import siteReducer from './siteDataSlice';
import classReducer from './classDataSlice';
export const store = configureStore({
    reducer: {
        pageData: pageReducer,
        siteData: siteReducer,
        classData: classReducer,
    },
})

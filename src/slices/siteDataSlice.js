import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: 'dark',
    currentClassTab: 'Add and Organize'
}
const siteData = createSlice({
    name: 'pageData',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
        },
        setCurrentClassTab(state, action) {
            state.currentClassTab = action.payload;
        }
    }
})

export const { setTheme, setCurrentClassTab } = siteData.actions
export default siteData.reducer
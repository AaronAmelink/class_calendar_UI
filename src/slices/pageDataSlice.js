import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loaded: false,
    saved: false,
}
const pageData = createSlice({
    name: 'pageDataLoaded',
    initialState,
    reducers: {
        setLoaded(state, action) {
            state.loaded = action.payload;
        },
        setSaved(state, action) {
            state.saved = action.payload
        }
    },
})

export const { setLoaded, setSaved } = pageData.actions
export default pageData.reducer
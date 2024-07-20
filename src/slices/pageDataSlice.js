import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loaded: false,
    saved: true,
    lastAccessedPage: { name: null, id: null }
}
const pageData = createSlice({
    name: 'pageData',
    initialState,
    reducers: {
        setLoaded(state, action) {
            state.loaded = action.payload;
        },
        setSaved(state, action) {
            state.saved = action.payload
        },
        setLastAccessedPage(state, action) {
            state.lastAccessedPage = action.payload
        }
    },
})

export const { setLoaded, setSaved, setLastAccessedPage } = pageData.actions
export default pageData.reducer
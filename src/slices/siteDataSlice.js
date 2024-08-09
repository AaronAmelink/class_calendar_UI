import { createSlice } from '@reduxjs/toolkit'
import theme from "../theme";

const initialState = {
    theme: { mode: 'dark', color: '#0096ab'},
    currentClassTab: 'Add and Organize',
    changes: [],
    saved: true
}
const siteData = createSlice({
    name: 'pageData',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.theme.mode = action.payload;
        },
        setCurrentClassTab(state, action) {
            state.currentClassTab = action.payload;
        },
        setColor(state, action) {
            const newColor = action.payload;
            if (state.theme.mode === 'dark') {
                theme.dark.palette.secondary.main = newColor;
                theme.dark.palette.icon.main = newColor;
                theme.dark.palette.menu.main = newColor;
                theme.dark.palette.menu.selected = newColor;
            } else {
                theme.light.palette.secondary.main = newColor;
                theme.light.palette.icon.main = newColor;
                theme.light.palette.menu.main = newColor;
                theme.light.palette.menu.selected = newColor;
            }
            state.theme.color = newColor;
        },
        addChange(state, action){
            let foundIndex = state.changes.findIndex((c) => c.id === action.payload.id);
            if (foundIndex !== -1) {
                state.changes[foundIndex] = action.payload;
            } else {
                state.changes.push(action.payload);
            }
        },
        clearChanges(state){
            state.changes = [];
        },
        setSaved(state, action){
            state.saved = action.payload
        }
    }
})

export const {
    setTheme,
    setCurrentClassTab,
    setColor,
    addChange,
    clearChanges,
    setSaved
} = siteData.actions
export default siteData.reducer
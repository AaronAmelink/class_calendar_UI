import {createSelector, createSlice} from '@reduxjs/toolkit'

const initialState = {
    classes: []
}
const classData = createSlice({
    name: 'classData',
    initialState,
    reducers: {
        addClass(state, action) {
            state.classes.push(action.payload);
        },
        removeClass(state, action) {
            state.classes = state.classes.filter((c) => c.id !== action.payload);
        },
        setSelectedClass(state, action){
            if (state.selectedClass !== {}){
                addClass(state.selectedClass);
            }
            let id = action.payload;
            state.selectedClass = state.classes.find((c) => c.id === id);
            removeClass(id);
        }
    }
});

export const makeClassSelector = () => {
    const selectClass = createSelector(
        [state => state.classData.classes, (state, id) => id],
        (classes, id) => {
            return classes.filter(item => item?.id === id)[0];
        })
    return selectClass;
}


export const { addClass, removeClass, setSelectedClass} = classData.actions
export default classData.reducer
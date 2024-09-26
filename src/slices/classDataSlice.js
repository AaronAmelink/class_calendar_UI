import {createSelector, createSlice} from '@reduxjs/toolkit'

const initialState = {
    classes: []
}
const classData = createSlice({
    name: 'classData',
    initialState,
    reducers: {
        addClassToState(state, action) {
            state.classes.push(action.payload);
        },
        removeClass(state, action) {
            state.classes = state.classes.filter((c) => c.id !== action.payload);
        },
        setSelectedClass(state, action) {
            if (state.selectedClass !== {}) {
                addClassToState(state.selectedClass);
            }
            let id = action.payload;
            state.selectedClass = state.classes?.find((c) => c.id === id);
            removeClass(id);
        },
        updateClassProperty(state, action) {
            let classIndex = state.classes.findIndex(classItem => classItem.id === action.payload.classId);
            let propIndex = state.classes[classIndex].properties.findIndex(property => property.id === action.payload.id);

            state.classes[classIndex].properties[propIndex] = action.payload;
        },
        updateClassName(state, action) {
            let classIndex = state.classes.findIndex(classItem => classItem.id === action.payload.id);
            state.classes[classIndex].name = action.payload.name;
        },
        addPropertyToClass(state, action) {
            console.log(action);
            state.classes?.find(classItem => classItem.id === action.payload.classID).properties.push(action.payload.property);
        },
        removePropertyFromClass(state, action) {
            console.log(action);
            let classIndex = state.classes.findIndex(classItem => classItem.id === action.payload.classId);
            let propIndex = state.classes[classIndex].properties.findIndex(property => property.id === action.payload.id);
            state.classes[classIndex].properties.splice(propIndex, 1);
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


export const {
    addPropertyToClass,
    removePropertyFromClass,
    addClassToState,
    removeClass,
    setSelectedClass,
    updateClassProperty,
    updateClassName
} = classData.actions
export default classData.reducer
import {createSelector, createSlice} from '@reduxjs/toolkit'

const initialState = {
    loaded: false,
    saved: true,
    lastAccessedPage: { name: null, id: null },
    currentPage: {},
    pages: {}
}
export const pageData = createSlice({
    name: 'pageData',
    initialState,
    reducers: {
        setLoaded(state, action) {
            state.loaded = action.payload;
        },
        setSaved(state, action) {
            state.saved = action.payload;
        },
        setLastAccessedPage(state, action) {
            state.lastAccessedPage = action.payload;
        },
        setCurrentPageProperties(state, action) {
            state.currentPage.properties = action.payload;
        },
        setCurrentPageName(state, action) {
            state.currentPage.name = action.payload;
        },
        setCurrentPageContent(state, action) {
            state.currentPage.content = action.payload;
        },
        updatePageContent(state, action) {
            let index = state.currentPage.content.findIndex(content => content.id === action.payload.id);
            state.currentPage.content[index] = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        addPageToState(state, action) {
            state.pages[action.payload._id] = action.payload;
        },
        removePage(state, action) {
            delete state.pages[action.payload];
        },
    },
})

export const makeContentSelector = () => {
    const selectContent = createSelector(
        [state => state.pageData.currentPage?.content, (state, id) => id],
        (content, id) => {
            return content.filter(item => item?.id === id)[0];
        })
    return selectContent;
}

export const getContentBasics = createSelector(state => state.pageData.currentPage, currentPage => {
    const mappedContent = currentPage.content?.map(content => {
        return {
            id: content.id,
            type: content.type
        }
    });
    console.log('ello'); //note how every key press ello gets logged. this is incorrect
    return mappedContent ? mappedContent : [];
});

export const getPageID = state => {
    return state.currentPage?._id;
}

export const {
    setLoaded,
    setSaved,
    setLastAccessedPage,
    addPageToState,
    removePage,
    setCurrentPageContent,
    setCurrentPageName,
    setCurrentPageProperties,
    setCurrentPage,
    addChangeLocally,
    clearLocalChanges,
    updatePageContent
} = pageData.actions

export const getContent = id => state => {
    return state.currentPage?.content?.find(content => content.id === id);
}
export default pageData.reducer
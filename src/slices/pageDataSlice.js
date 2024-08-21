import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import httpHelper from "../managment/httpHelper";

export const fetchPages = createAsyncThunk('pageData/get', async ({pageID}, {getState}) => {
    const state = getState();
    let index = state.pageData.pages.findIndex(page => page._id === pageID);
    let newPages = []
    if (index !== -1) {
        let newPage = state.pageData.pages[index];
        for (const content of newPage.content) {
            if (content.type === 'page' && !state.pageData.pages.find(page => page._id === content.linkedPageID)) {
                let childPage = await httpHelper.getPage(content.linkedPageID);
                newPages.push(childPage);
            }
        }
        return {currentPage: newPage, childPages: newPages};
    } else {
        let newPage = await httpHelper.getPage(pageID);
        console.log(newPage);
        for (const content of newPage.content) {
            if (content.type === 'page' && !state.pageData.pages.find(page => page._id === content.linkedPageID)) {
                let childPage = await httpHelper.getPage(content.linkedPageID);
                newPages.push(childPage);
            }
        }
        return {currentPage: newPage, childPages: newPages};
    }

});


const initialState = {
    loaded: false,
    saved: true,
    lastAccessedPage: {name: null, id: null},
    currentPage: null,
    pages: [],
    localChanges: [],
    lastModifiedItemId: null,
    lastModifiedPropertyId: null,
    isClass: null
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
            console.log(action.payload);
            state.currentPage.page_name = action.payload;
        },
        addCurrentPageToPages(state) {
            state.pages.push(state.currentPage);
        },
        updatePageContent(state, action) {
            let index = state.currentPage.content.findIndex(content => content.id === action.payload.id);
            state.currentPage.content[index] = action.payload;
        },
        updatePageProperty(state, action) {
            let index = state.currentPage.properties.findIndex(property => property.id === action.payload.id);
            state.currentPage.properties[index] = action.payload;
        },
        setCurrentPage(state, action) {
            state.isClass = action.payload.isClass;
            state.currentPage = action.payload;
            state.lastAccessedPage = {id: action.payload._id, name: action.payload.page_name};
            state.lastModifiedItemId = `changed page ${action.payload._id}`;
        },
        addPageToState(state, action) {
            let index = state.pages.findIndex(page => page._id === action.payload._id);
            if (index !== -1) {
                state.pages[index] = action.payload;
            } else {
                state.pages.push(action.payload);
            }
        },
        removePage(state, action) {
            delete state.pages[action.payload];
        },
        removePropertyFromState(state, action) {
            let index = state.currentPage.properties.findIndex(property => property.id === action.payload);
            state.currentPage.properties.splice(index, 1);
            state.lastModifiedPropertyId = `removed ${action.payload}`;
        },
        addPropertyToState(state, action) {
            state.currentPage.properties.push(action.payload);
            state.lastModifiedPropertyId = action.payload.id;
        },
        removeContentFromState(state, action) {
            let index = state.currentPage.content.findIndex(content => content.id === action.payload);
            state.currentPage.content.splice(index, 1);
            state.lastModifiedItemId = `removed ${action.payload}`;
        },
        addContentToState(state, action) {
            state.currentPage.content.splice(action.payload.index, 0, action.payload.content);
            state.lastModifiedItemId = action.payload.content.id;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPages.fulfilled, (state, action) => {
            state.loaded = true;
            state.lastModifiedItemId = `changed page ${action.payload.currentPage._id}`;
            state.lastModifiedPropertyId = `changed page ${action.payload.currentPage._id}`;
            state.isClass = action.payload.currentPage.isClass;
            if (state.currentPage) {
                state.pages.push(state.currentPage);
            }
            state.currentPage = action.payload.currentPage;
            state.pages.push(...action.payload.childPages);
        });
        builder.addCase(fetchPages.pending, (state, action) => {
            state.loaded = false;
            console.log('pending');
        });
        builder.addCase(fetchPages.rejected, (state, action) => {
            state.loaded = false;
            console.log('rejected');
        });
    }
})

export const makeContentSelector = () => {
    const selectContent = createSelector(
        [state => state.pageData.currentPage?.content, (state, id) => id],
        (content, id) => {
            return content.find(item => item?.id === id);
        })
    return selectContent;
}

export const makePropertySelector = () => {
    const selectProperty = createSelector(
        [state => state.pageData.currentPage?.properties, state => state.classData.classes, (state, id) => id, state => state.pageData.isClass],
        (properties, classes, id, isClass) => {
            if (!isClass) {
                return properties.find(item => item?.id === id);
            } else {
                return classes.find(item => item?.id === id);
            }
        })
    return selectProperty;
}
export const getPropertyBasics = (state) => {
    if (state.pageData.isClass) {
        return state.classData.classes?.map(classItem => classItem.id)
    } else {
        return state.pageData.currentPage?.properties?.map(property => {
            return {
                id: property.id,
                type: property.type
            }
        });
    }
}

export const selectPageName = state => state.pageData.currentPage?.page_name;
export const getPageName = (state, id) => state.pageData.pages[id].page_name;
export const getLastModifiedItemId = (state) => state.pageData.lastModifiedItemId;
export const getLastModifiedPropertyId = (state) => state.pageData.lastModifiedPropertyId;
export const getContentBasics = (state) => {
    const mappedContent = state?.pageData.currentPage?.content?.map(content => {
        return {
            id: content.id,
            type: content.type
        }
    });
    return mappedContent ? mappedContent : [];
}

export const getPageID = (state) => state.pageData.lastAccessedPage?.id;


export const {
    setSaved,
    setLastAccessedPage,
    addPageToState,
    removePage,
    setCurrentPageName,
    setCurrentPage,
    addCurrentPageToPages,
    updatePageContent,
    updatePageProperty,
    removePropertyFromState,
    removeContentFromState,
    addContentToState,
    addPropertyToState,
} = pageData.actions

export default pageData.reducer
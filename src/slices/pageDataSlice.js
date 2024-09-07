import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import httpHelper from "../managment/httpHelper";

export const fetchPages = createAsyncThunk('pageData/get', async ({pageID}, {getState}) => {
    const state = getState();
    if (state.pageData.currentPage?._id === pageID) {
        return {currentPage: state.pageData.currentPage, newPages: []};
    }
    let index = state.pageData.pages.findIndex(page => page._id === pageID);
    let newPages = [];
    let newPage;
    if (index !== -1) {
        newPage = state.pageData.pages[index];
    } else {
        newPage = await httpHelper.getPage(pageID);
    }
    for (const content of newPage.content) {
        if (content.type === 'page' && !state.pageData.pages.find(page => page._id === content.linkedPageID) && state.pageData.currentPage?.parent_id !== pageID) {
            let childPage = await httpHelper.getPage(content.linkedPageID);
            newPages.push(childPage);
        }
    }
    return {currentPage: newPage, newPages: newPages};

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
        setSaved(state, action) {
            state.saved = action.payload;
        },
        editLastModifiedProperty(state, action) {
            state.lastModifiedPropertyId = action.payload;
        },
        setCurrentPageName(state, action) {
            state.currentPage.page_name = action.payload;
        },
        updatePageContent(state, action) {
            let index = state.currentPage.content.findIndex(content => content.id === action.payload.id);
            state.currentPage.content[index] = action.payload;
        },
        updatePageProperty(state, action) {
            let index = state.currentPage.properties.findIndex(property => property.id === action.payload.id);
            state.currentPage.properties[index] = action.payload;
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
        setLoaded(state, action) {
            state.loaded = action.payload;
        },
        setIsClass(state, action) {
            state.isClass = action.payload;
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
            console.log('fufilled');
            state.loaded = true;
            state.lastModifiedItemId = `changed page ${action.payload.currentPage._id}`;
            state.lastModifiedPropertyId = `changed page ${action.payload.currentPage._id}`;
            state.isClass = action.payload.currentPage.isClass;
            if (state.currentPage) {
                state.pages.push(state.currentPage);
            }
            state.currentPage = action.payload.currentPage;
            state.pages.push(...action.payload.newPages);
            let preExistingPageIndex = state.pages.findIndex(page => page._id === action.payload.currentPage._id);
            if (preExistingPageIndex !== -1) {
                state.pages.splice(preExistingPageIndex, 1);
            }
            state.lastAccessedPage = {name: action.payload.currentPage.page_name, id: action.payload.currentPage._id};

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
        [state => state.pageData.currentPage?.properties, state => state.classData.classes, (state, id) => id, state => state.pageData.isClass, state => state.siteData.isLookingAtClass],
        (properties, classes, id, isClass, isLookingAtClass) => {
            if (isClass || isLookingAtClass) {
                return classes.find(classItem => classItem.id === id.classID).properties.find(item => item?.id === id.id);
            } else {
                return properties.find(item => item?.id === id.id);
            }
        })
    return selectProperty;
}
export const getPropertyBasics = (state) => {
    if (state.pageData.isClass) {
        let classItem = state.classData.classes.find(item => item.id === state.pageData.currentPage._id);
        return classItem.properties.map(property => {
            return {
                id: property.id,
                type: 'text'
            }
        });
    } else {
        return state.pageData.currentPage?.properties?.map(property => {
            return {
                id: property.id,
                type: property.type
            }
        });
    }
}
export const getDirectoryOfDocument = createSelector([state => state.pageData.pages, state => state.pageData.currentPage], (pages, currentPage) => {
    let directory = [];
    let iterPage = currentPage;
    while (iterPage) {
        directory.push({id: iterPage._id, name: iterPage.page_name});
        iterPage = pages.find(page => page._id === iterPage.parent_id);
    }
    return directory.reverse();
});

export const selectPageName = state => state.pageData.currentPage?.page_name;
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


export const {
    addPageToState,
    editLastModifiedProperty,
    removePage,
    setCurrentPageName,
    updatePageContent,
    updatePageProperty,
    removePropertyFromState,
    setLoaded,
    removeContentFromState,
    addContentToState,
    addPropertyToState,
    setIsClass
} = pageData.actions

export default pageData.reducer
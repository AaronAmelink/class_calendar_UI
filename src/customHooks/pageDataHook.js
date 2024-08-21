import {useDispatch} from "react-redux";
import {
    addPageToState,
    setCurrentPageName,
    updatePageContent, updatePageProperty,
    removePropertyFromState, removeContentFromState, addPropertyToState, addContentToState
} from "../slices/pageDataSlice";
import {addChange} from "../slices/siteDataSlice";
const { v4: uuidv4 } = require('uuid');

function usePageData() {
    const dispatch= useDispatch();

    function updateContent(content, pageId, contentId) {
        dispatch(updatePageContent({...content, id: contentId}));
        dispatch(addChange({type: "content", id: contentId, pageID: pageId, content: content}));
    }
    function addPage(referralID, pageID, name) {
        let newPage = {
            _id : pageID,
            page_name:name,
            user_id: window.sessionStorage.getItem("user_id"),
            content: [{type:"text",value:" ",id:0}],
            parent_id : referralID,
            properties : []
        };
        dispatch(addPageToState(newPage));
        dispatch(addChange({type: "page", page: newPage}));
    }

    function removeContent(id, pageID) {
        dispatch(addChange({type: "content", removal: true, id: id, pageID: pageID}));
        dispatch(removeContentFromState(id));
    }
    function removeProperty(id, pageID){
        dispatch(addChange({type: "property", removal: true, id: id, pageID: pageID}));
        dispatch(removePropertyFromState(id));
    }
    function addProperty(property, pageID) {
        const newId = uuidv4();
        dispatch(addChange({type: "property", property: {...property, id: newId}, pageID: pageID}));
        dispatch(addPropertyToState({...property, id: newId}));
    }
    function addContent(content, pageID) {
        dispatch(addChange({type: "content", content: content, pageID: pageID}));
        dispatch(addContentToState(content));
    }

    function updateName(name, pageId) {
        dispatch(setCurrentPageName(name));
        dispatch(addChange({type: "name", name: name, id: pageId}));
    }

    function updateProperty(property, pageId, propertyID) {
        dispatch(updatePageProperty(property));
        dispatch(addChange({type: "property", property: property, pageID: pageId, id: propertyID}));
    }

    return {updateContent, updateName, updateProperty, removeContent, removeProperty, addContent, addProperty};
}

export default usePageData;

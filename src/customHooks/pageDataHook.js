import {useDispatch, useSelector} from "react-redux";
import {
    addContentToState,
    addPageToState,
    addPropertyToState,
    editLastModifiedProperty,
    removeContentFromState,
    removePropertyFromState,
    setCurrentPageName,
    updatePageContent,
    updatePageProperty
} from "../slices/pageDataSlice";
import {addChange} from "../slices/siteDataSlice";
import {
    addClassToState,
    addPropertyToClass,
    removePropertyFromClass,
    updateClassName,
    updateClassProperty
} from "../slices/classDataSlice";

const {v4: uuidv4} = require('uuid');

function usePageData() {
    const dispatch = useDispatch();
    const isClass = useSelector(state => state.pageData.isClass);
    const isLookingAtClass = useSelector(state => state.siteData.isLookingAtClass);

    function updateContent(content, pageId, contentId) {
        dispatch(updatePageContent({...content, id: contentId}));
        dispatch(addChange({type: "content", id: contentId, pageID: pageId, content: content}));
    }

    function addClass(classData) {
        dispatch(addClassToState(classData));
        dispatch(addChange({type: "class", class: classData}));
        addPage(null, classData.id, classData.name, null, true);

    }

    function addPage(referralID, pageID, name, properties = [], isClass = false) {
        let newPage = {
            _id: pageID,
            page_name: name,
            user_id: window.sessionStorage.getItem("user_id"),
            content: [{type: "text", value: " ", id: 0}],
            parent_id: referralID,
            isClass: isClass,
            properties: properties
        };
        dispatch(addPageToState(newPage));
        dispatch(addChange({type: "page", page: newPage}));
    }

    function removeContent(id, pageID) {
        dispatch(addChange({type: "content", removal: true, id: id, pageID: pageID}));
        dispatch(removeContentFromState(id));
    }

    function removeProperty(id, pageID) {
        if (!isLookingAtClass && !isClass) {
            dispatch(addChange({type: "property", removal: true, id: id, pageID: pageID}));
            dispatch(removePropertyFromState(id));
        } else {
            dispatch(addChange({type: "classProperty", removal: true, id: id, classID: pageID}));
            dispatch(removePropertyFromClass({id: id, classId: pageID}));
            dispatch(editLastModifiedProperty('removing ' + id));
        }
    }

    function addProperty(property, pageID) {
        const newId = uuidv4();
        if (!isLookingAtClass && !isClass) {
            dispatch(addChange({type: "property", property: {...property, id: newId}, pageID: pageID}));
            dispatch(addPropertyToState({...property, id: newId}));
        } else {
            console.log(pageID);
            dispatch(addChange({type: "classProperty", property: {...property, id: newId}, classID: pageID}));
            dispatch(editLastModifiedProperty('editing ' + newId));
            dispatch(addPropertyToClass({property: {...property, id: newId}, classID: pageID}));
        }
    }

    function addContent(index, content, pageID) {
        console.log(content, index);
        dispatch(addChange({type: "content", content: content, pageID: pageID}));
        dispatch(addContentToState({content: content, index: index + 1}));
        if (content.type === 'page') {
            addPage(pageID, content.linkedPageID, 'New Page', null, false)
        }
    }

    function updateName(name, pageId) {
        if (!isLookingAtClass && !isClass) {
            dispatch(setCurrentPageName(name));
        } else {
            dispatch(setCurrentPageName(name));
            dispatch(updateClassName({name: name, id: pageId}));
        }
        dispatch(addChange({type: !isLookingAtClass && !isClass ? 'name' : 'className', name: name, id: pageId}));
    }

    function updateProperty(property, pageId, propertyID) {
        if (!isLookingAtClass && !isClass) {
            dispatch(updatePageProperty(property));
            dispatch(addChange({type: "property", property: property, pageID: pageId, id: propertyID}));
        } else {
            dispatch(updateClassProperty({...property, classId: pageId}));
            dispatch(addChange({type: "classProperty", property: property, classID: pageId, id: propertyID}));
        }
    }

    return {
        updateContent,
        updateName,
        updateProperty,
        removeContent,
        removeProperty,
        addContent,
        addProperty,
        addClass
    };
}

export default usePageData;

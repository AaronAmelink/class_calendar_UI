import {useDispatch, useSelector} from "react-redux";
import {
    addPageToState,
    setCurrentPageName,
    setCurrentPageProperties, updatePageContent,
} from "../slices/pageDataSlice";
import {addChange} from "../slices/siteDataSlice";

function usePageData() {
    const dispatch= useDispatch();
    const currentPage = useSelector((state) => state.pageData.currentPage);


    function updateContent(content, pageId) {
        dispatch(updatePageContent(content));
        dispatch(addChange({type: "content", content: content, pageID: pageId}));
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

    function addContent(referralIndex, content, pageId) {
        dispatch(addChange({type: "content", content: content, pageID: pageId, insertion: referralIndex}));
        if (content.type === "page") {
            addPage(pageId, content.linkedPageID, content.value);
        }
    }

    function removeContent(id) {
        dispatch(addChange({type: "content", removal: true, id: id}));

    }

    function updateName(name, pageId) {
        dispatch((setCurrentPageName(name)));
        dispatch(addChange({type: "name", name: name, pageID: pageId}));
    }

    function updateProperties(properties, pageId) {
        dispatch((setCurrentPageProperties(properties)));
        dispatch(addChange({type: "properties", properties: properties, pageID: pageId}));
    }

    function getCurrentPageContent() {
        return currentPage.content;
    }

    return {updateContent, updateName, updateProperties, getCurrentPageContent, addContent, removeContent}
}

export default usePageData;

import Divider from '@mui/material/Divider';
import DocumentManager from "../../managment/documentManager";
import * as React from 'react';
import {Button} from "@mui/material";

export default function PageButtonStackItem(props) {
    const linkedPageId = props.pageID;
    let pageName = DocumentManager.getPageName(linkedPageId);
    const handleClick = () => {
        console.log("button pressed");
        DocumentManager.maintainChanges();
        DocumentManager.setCurrentPage(linkedPageId);
        props.onPageUpdate();
    }


    return(
        <Button variant="outlined" color="secondary" onClick={handleClick}>{pageName}</Button>
    );
}

import Divider from '@mui/material/Divider';
import DocumentManager from "../../managment/documentManager";
import * as React from 'react';
import {Button} from "@mui/material";
import {useEffect, useState} from "react";

export default function PageButtonStackItem(props) {
    const linkedPageId = props.pageID;
    const name = DocumentManager.getPageName(linkedPageId);
    const [pageName, setPageName] = useState(name);
    useEffect(() => {
        setPageName(DocumentManager.getPageName(linkedPageId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DocumentManager.getPageName(linkedPageId)]);



    const handleClick = () => {
        DocumentManager.maintainChanges();
        DocumentManager.setCurrentPage(linkedPageId);
        props.onPageUpdate();
    }


    return(
        <Button variant="outlined" color="secondary" onClick={handleClick}>{pageName}</Button>
    );
}

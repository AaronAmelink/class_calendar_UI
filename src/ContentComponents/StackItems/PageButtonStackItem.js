import DocumentManager from "../../managment/documentManager";
import * as React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function PageButtonStackItem(props) {
    const linkedPageId = props.pageID;
    const navigate = useNavigate();
    const dataLoaded = useSelector((state) => state.pageData.loaded);
    const [pageName, setPageName] = useState('loading');
    useEffect(() => {
        if (dataLoaded) {
            setPageName(linkedPageId === DocumentManager.currentPage._id ? DocumentManager.currentPage.page_name : DocumentManager.pages[linkedPageId].page_name);
        }
    }, [dataLoaded]);
    const handleClick = async () => {
        navigate(`/page/${linkedPageId}`)
    }


    return(
        <Button variant="outlined" color="secondary" onClick={handleClick}>{pageName}</Button>
    );
}

import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLastAccessedPage} from "../slices/pageDataSlice";
import pageURLs from "../PageComponents/pageURLs";
import DocumentManager from "../managment/documentManager";
import {useEffect, useState} from "react";

export function PageLink({pageID, buttonVariant, overwritePageName, color}) {
    const dispatch = useDispatch();
    const dataLoaded = useSelector((state) => state.pageData.loaded);
    const [pageName, setPageName] = useState('loading');
    useEffect(() => {
        if (dataLoaded) {
            setPageName(pageID === DocumentManager.currentPage._id ? DocumentManager.currentPage.page_name : DocumentManager.pages[pageID].page_name);
        }
    }, [dataLoaded]);
    function handleClick() {
        dispatch(setLastAccessedPage({ id: pageID, name: pageName }));
    }

    return (
        <Link to={pageURLs.page + `/${pageID}`} key={pageName} onClick={handleClick}>
            <Button variant={buttonVariant} color={color ? color : 'secondary'}>
                {overwritePageName ? overwritePageName : pageName}
            </Button>
        </Link>
    )
}
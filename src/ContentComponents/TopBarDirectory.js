import DocumentManager from "../managment/documentManager";
import * as React from 'react';
import { Breadcrumbs, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {PageLink} from "./PageLink";

export default function TopBarDirectory() {
    const dataLoaded = useSelector((state) => state.pageData.loaded);


    return(
        <div>
            <Breadcrumbs seperator="›">
                {
                    dataLoaded && DocumentManager.getDirectoryOfDocument(DocumentManager.currentPage._id).slice().reverse().map((pageID) => {
                        return (
                            <PageLink pageID={pageID} buttonVariant='text' />
                        );
                    })
                }
            </Breadcrumbs>

        </div>

    );
}


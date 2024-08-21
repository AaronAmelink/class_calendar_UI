import DocumentManager from "../../managment/documentManager";
import * as React from 'react';
import {Breadcrumbs} from "@mui/material";
import {useSelector} from "react-redux";
import {PageLink} from "./PageLink";

export default function TopBarDirectory() {
    const dataLoaded = useSelector((state) => state.pageData.loaded);

    return (
        <div>
            <Breadcrumbs seperator="›">
                {
                    dataLoaded && DocumentManager.getDirectoryOfDocument(DocumentManager.currentPage._id).slice().reverse().map((pageID) => {
                        return (
                            <PageLink pageID={pageID} buttonVariant='text'/>
                        );
                    })
                }
            </Breadcrumbs>

        </div>

    );
}


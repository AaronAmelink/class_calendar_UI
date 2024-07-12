import DocumentManager from "../managment/documentManager";
import * as React from 'react';
import { Breadcrumbs, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
export default function TopBarDirectory(props) {
    const dataLoaded = useSelector((state) => state.pageData.loaded);

    return(
        <div>
            <Breadcrumbs seperator="›">
                {
                    dataLoaded && DocumentManager.getDirectoryOfDocument(props.pageID).slice().reverse().map((pageID) => {
                        let pageName = DocumentManager.pages[pageID]?.page_name ?? DocumentManager.currentPage?.page_name ?? 'error';
                        return (
                            <Link to={pageID}>
                                <Button variant="text" color="secondary">
                                    {pageName}
                                </Button>
                            </Link>
                        );
                    })
                }
            </Breadcrumbs>

        </div>

    );
}


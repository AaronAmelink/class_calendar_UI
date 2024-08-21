import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";
import {useSelector} from "react-redux";
import pageURLs from "../PageComponents/pageURLs";

export function PageLink({pageID, buttonVariant, overwritePageName, color}) {
    const pageName = useSelector((state) => state.pageData.pages.find(page => page._id === pageID))?.page_name;
    return (
        <Link to={pageURLs.page + `/${pageID}`} key={pageName}>
            <Button variant={buttonVariant} color={color ? color : 'icon'}>
                {overwritePageName ?? pageName}
            </Button>
        </Link>
    )
}
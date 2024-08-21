import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";
import {useDispatch} from "react-redux";
import pageURLs from "../PageComponents/pageURLs";
import {setLoaded} from "../../slices/pageDataSlice";

export function PageLink({pageID, buttonVariant, pageName, color}) {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setLoaded(false));
    }

    return (
        <Link to={pageURLs.page + `/${pageID}`} key={pageName} onClick={handleClick}>
            <Button variant={buttonVariant} color={color ? color : 'icon'}>
                {pageName}
            </Button>
        </Link>
    )
}
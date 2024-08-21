import * as React from 'react';
import {Breadcrumbs} from "@mui/material";
import {PageLink} from "./PageLink";
import {getDirectoryOfDocument} from "../../slices/pageDataSlice";
import {store} from "../../slices/store";

export default function TopBarDirectory() {
    const directory = getDirectoryOfDocument(store.getState());

    return (
        <div>
            <Breadcrumbs seperator="›">
                {
                    directory.map(page => {
                        return (
                            <PageLink pageID={page.id} buttonVariant='text' pageName={page.name}/>
                        );
                    })
                }
            </Breadcrumbs>

        </div>

    );
}


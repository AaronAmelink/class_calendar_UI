import * as React from 'react';
import {PageLink} from "../PageLink";
export default function PageButtonStackItem(props) {
    const linkedPageId = props.pageID;

    return(
        <PageLink pageID={linkedPageId} buttonVariant='outlined' />
    );
}

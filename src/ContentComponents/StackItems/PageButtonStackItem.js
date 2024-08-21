import * as React from 'react';
import {PageLink} from "../PageLink";
import {useMemo} from "react";
import {makeContentSelector} from "../../slices/pageDataSlice";
import {useSelector} from "react-redux";
export default function PageButtonStackItem({id}) {
    const contentSelector = useMemo(makeContentSelector, [])

    const content = useSelector(state =>
        contentSelector(state, id)
    );

    return(
        <PageLink pageID={content?.linkedPageID} buttonVariant='outlined' />
    );
}

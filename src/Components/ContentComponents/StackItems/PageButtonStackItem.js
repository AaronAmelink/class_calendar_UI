import * as React from 'react';
import {useMemo} from 'react';
import {PageLink} from "../PageLink";
import {makeContentSelector} from "../../../slices/pageDataSlice";
import {useSelector} from "react-redux";

export default function PageButtonStackItem({id}) {
    const contentSelector = useMemo(makeContentSelector, [])
    const content = useSelector(state =>
        contentSelector(state, id)
    );
    const pageName = useSelector(state => state.pageData.pages.find(page => page._id === content?.linkedPageID)?.page_name);

    if (!content) return (<div></div>);


    return (
        <PageLink pageID={content?.linkedPageID} buttonVariant='outlined' pageName={pageName}/>
    );
}

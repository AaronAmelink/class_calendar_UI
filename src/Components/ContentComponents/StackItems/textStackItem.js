import {TextField} from "@mui/material";
import {useSelector} from "react-redux";
import allThemes from "../../../theme";
import usePageData from "../../../customHooks/pageDataHook";
import {useParams} from "react-router-dom";
import {useMemo} from "react";
import {makeContentSelector} from "../../../slices/pageDataSlice";

export default function TextStackItem(props) {
    const siteTheme = useSelector((state) => state.siteData.theme);
    const id = props.id;
    const {updateContent, removeContent} = usePageData();
    const params = useParams();
    const contentSelector = useMemo(makeContentSelector, [])

    const content = useSelector(state =>
        contentSelector(state, id)
    );

    if (!content) return (<div></div>);

    const handleChange = (newValue) => {
        updateContent({
            value: newValue,
            type: "text",
        }, params.pageID, id);
    }


    const handleKeyDown = (e) => {
        if (e.target.value === 0 && e.key === "Backspace") {
            removeContent(id);
        }
    }

    return (
        <TextField
            id={id.toString()}
            multiline
            variant={"standard"}
            InputProps={{disableUnderline: true, style: {color: allThemes[siteTheme.mode].palette.text.secondary}}}
            sx={{width: '100%', textOverflow: 'clip'}}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            value={content?.value}
        />
    );
}

import {Button, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom";
import pageURLs from "../PageComponents/pageURLs";
import * as React from "react";
import Stack from "@mui/material/Stack";
import {useDispatch} from "react-redux";
import {setIsLookingAtClass} from "../../slices/siteDataSlice";

export default function ClassChip({id, code, handleClick}) {
    const dispatch = useDispatch();

    function onClick() {
        handleClick(id);
        dispatch(setIsLookingAtClass(true));
    }

    return (
        <Paper elevation={0} variant='outlined' style={{border: '2px solid'}}
               sx={{bgcolor: 'icon.main', boxShadow: 5, borderRadius: 9, p: 0.1}}>
            <Stack direction='row'>
                <IconButton onClick={onClick}>
                    <MoreVertIcon/>
                </IconButton>
                <Link to={pageURLs.page + `/${id}`}>
                    <Button sx={{color: "text.primary", mt: 0.3, ml: -1.5}}>
                        {code}
                    </Button>
                </Link>
            </Stack>
        </Paper>
    )
}
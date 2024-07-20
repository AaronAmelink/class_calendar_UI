import * as React from 'react';
import Box from '@mui/material/Box';
import DocumentManager from '../managment/documentManager';
import {useEffect, useState} from "react";
import CachedIcon from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
import {useDispatch, useSelector} from "react-redux";
import {setSaved} from "../slices/pageDataSlice";
import {useLocation} from "react-router-dom";
import pageURLs from "./pageURLs";
export default function SaveIcon(props) {
    const saved = useSelector((state) => state.pageData.saved);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(5);
    const location = useLocation();

    useEffect( () => {
        if (counter === 0) {
            setCounter(5);
            if (!saved) {
                if (location.pathname.includes(pageURLs.page)) {
                    DocumentManager.maintainChanges();
                }
                dispatch(setSaved(true));
            }
        }

        // exit early when we reach 0
        if (!counter) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {

            setCounter(counter - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [counter]);




    return (
        <Box sx={{color:"icon.main"}}>
            {saved ? <CheckIcon/> : <CachedIcon/>}
        </Box>
    );
}

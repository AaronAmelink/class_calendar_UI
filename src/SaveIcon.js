import * as React from 'react';
import Box from '@mui/material/Box';
import DocumentManager from './managment/documentManager';
import stateManager from './managment/stateManager';
import {useEffect, useState} from "react";
import CachedIcon from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
export default function SaveIcon(props) {
    const [saved, setSaved] = useState(true);
    const [counter, setCounter] = useState(5);

    useEffect( () => {
        setSaved(stateManager.saved);
        if (counter === 0) {
            setCounter(5);
            if (!saved) {
                DocumentManager.maintainChanges();
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
        <Box>
            {saved ? <CheckIcon/> : <CachedIcon/>}
        </Box>
    );
}

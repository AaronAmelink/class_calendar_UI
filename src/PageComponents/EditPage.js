import { Grid, Typography } from "@mui/material";
import PageName from "../ContentComponents/PageName";
import PropertiesMenu from "../ContentComponents/PropertiesMenu";
import Stack from "@mui/material/Stack";
import StackItem from "../ContentComponents/StackItem";
import {useEffect, useState} from "react";
import {
    getContentBasics, getPageID,
    setCurrentPage, getLastModifiedItemId
} from '../slices/pageDataSlice'
import {useDispatch, useSelector} from 'react-redux';
import {useLoaderData} from "react-router-dom";
import {store} from '../slices/store';

export default function EditPage() {
    const dispatch = useDispatch();
    const data = useLoaderData();
    const pageID = useSelector(getPageID);
    const lastModifiedItemId = useSelector(getLastModifiedItemId);
    const [idArr, setIdArr] = useState(getContentBasics(store.getState()));

    useEffect(() => {
        if (data) {
            dispatch(setCurrentPage(data));
        }
    }, [data]);

    useEffect(() => {
        console.log('lastModifiedItemId useEffect');
        setIdArr(getContentBasics(store.getState()));
    }, [lastModifiedItemId]);

    let index = -1;
    return (
    <div>
        {
            data ?
            (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h4" gutterBottom sx={{color:"text.secondary", m:3}}>
                                <PageName pageID={pageID}/>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PropertiesMenu pageID={pageID}/>
                        </Grid>
                    </Grid>
                    <Stack spacing={0} sx={{ml:3, mt:3}}>
                        {
                            (idArr && idArr.length) ? idArr.map(entry => {
                                index += 1;
                                return(<StackItem type={entry.type} id={entry.id} index={index} key={entry.id}/>);
                            }) : <span/>
                        }
                    </Stack>
                </div>
            )
            : (<h1>Loading...</h1>)
        }
    </div>
    );
}
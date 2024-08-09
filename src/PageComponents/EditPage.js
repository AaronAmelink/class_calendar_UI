import { Grid, Typography } from "@mui/material";
import PageName from "../ContentComponents/PageName";
import PropertiesMenu from "../ContentComponents/PropertiesMenu";
import Stack from "@mui/material/Stack";
import StackItem from "../ContentComponents/StackItem";
import {useEffect, useState} from "react";
import {
    getContentBasics, getPageID,
    setCurrentPage,
} from '../slices/pageDataSlice'
import {useDispatch, useSelector} from 'react-redux';
import {useLoaderData} from "react-router-dom";


export default function EditPage() {
    const dispatch = useDispatch();
    const [ignored, ] = useState(false);
    const data = useLoaderData();
    const idArr = useSelector(getContentBasics);
    const pageID = useSelector(getPageID);


    useEffect(() => {
        if (data) {
            dispatch(setCurrentPage(data));
        }
    }, [data]);

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
                            idArr.map(entry => {
                                index += 1;
                                return(<StackItem type={entry.type} id={entry.id} index={index} key={entry.id}/>);
                            })
                        }
                    </Stack>
                </div>
            )
            : (<h1>Loading...</h1>)
        }
    </div>
    );
}
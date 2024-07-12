import { Grid, Typography } from "@mui/material";
import PageName from "../ContentComponents/PageName";
import DocumentManager from "../managment/documentManager";
import PropertiesMenu from "../ContentComponents/PropertiesMenu";
import Stack from "@mui/material/Stack";
import StackItem from "../ContentComponents/StackItem";
import {useEffect, useState} from "react";
import { useLoaderData } from "react-router-dom";
import { setLoaded } from '../slices/pageDataSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function DocumentPage(props) {
    const dataLoaded = useSelector((state) => state.pageData.loaded);
    const dispatch = useDispatch();
    const data = useLoaderData();
    const [ignored, forceUpdate] = useState(false);

    useEffect(() => {
        if (data) {
            console.log(data);
            dispatch(setLoaded(true));
        }
    }, [data]);

    function removeContent(id){
        DocumentManager.removeContent(id);
        onPageUpdate();
    }
    const onPageUpdate = () => { //force a rerender. not BEST practice, but works for the scope of the project
        forceUpdate(!ignored);
    }


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
                                <PageName pageID={data._id}/>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PropertiesMenu pageID={data._id}/>
                        </Grid>
                    </Grid>
                    <Stack spacing={0} sx={{ml:3, mt:3}}>
                        {
                            data?.content?.map(entry => {
                                index += 1;
                                return(<StackItem object={entry} onPageUpdate={onPageUpdate} id={entry.id} removeContent={removeContent} index={index} key={entry.id}/>);
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
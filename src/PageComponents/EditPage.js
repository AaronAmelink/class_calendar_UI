import { Grid, Typography } from "@mui/material";
import PageName from "../ContentComponents/PageName";
import PropertiesMenu from "../ContentComponents/PropertiesMenu";
import Stack from "@mui/material/Stack";
import StackItem from "../ContentComponents/StackItem";
import {useEffect, useState} from "react";
import {
    getContentBasics,
    getLastModifiedItemId
} from '../slices/pageDataSlice'
import { useSelector} from 'react-redux';
import {store} from '../slices/store';
import {useParams} from "react-router-dom";

export default function EditPage() {
    const params = useParams();
    const lastModifiedItemId = useSelector(getLastModifiedItemId);
    const [idArr, setIdArr] = useState(getContentBasics(store.getState()));

    useEffect(() => {
        console.log('lastModifiedItemId useEffect');
        setIdArr(getContentBasics(store.getState()));
    }, [lastModifiedItemId]);


    let index = -1;
    return (
    <div>
        {
            idArr ?
            (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h4" gutterBottom sx={{color:"text.secondary", m:3}}>
                                <PageName pageID={params.pageID}/>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PropertiesMenu pageID={params.pageID}/>
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
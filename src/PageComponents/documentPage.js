import {Grid, Typography} from "@mui/material";
import PageName from "../ContentComponents/PageName";
import DocumentManager from "../managment/documentManager";
import PropertiesMenu from "../ContentComponents/PropertiesMenu";
import Stack from "@mui/material/Stack";
import StackItem from "../ContentComponents/StackItem";
import {useEffect, useState} from "react";
import httpHelper from "../managment/httpHelper";


export default function DocumentPage(props) {

    const [dataFetched, setDataFetched] = useState(false);
    const [, setError] = useState(false);

    function removeContent(id){
        DocumentManager.removeContent(id);
        props.onPageUpdate();
    }

    async function fetchPages(){

        const pages = await httpHelper.getPages();
        //console.log(pages);
        if (pages.length === 0){
            setError(true);
        }
        else{
            DocumentManager.loadPages(pages);
            DocumentManager.setCurrentPage(pages[0]._id);

            if (DocumentManager.currentPage.content.length === 0){
                //DocumentManager.addTextContent();
            }
            setDataFetched(true);
        }


    }
    useEffect(async () => {
        await fetchPages();
    }, []);

    let index = -1;
    return (
    <div>
        {
            dataFetched ?
            (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h4" gutterBottom sx={{color:"text.secondary", m:3}}>
                                <PageName pageID={DocumentManager.currentPage._id}/>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PropertiesMenu pageID={DocumentManager.currentPage._id}/>
                        </Grid>
                    </Grid>
                    <Stack spacing={0} sx={{ml:3, mt:3}}>
                        {
                            DocumentManager.currentPage?.content?.map(entry => {
                                index += 1;
                                return(<StackItem object={entry} onPageUpdate={props.onPageUpdate} id={entry.id} removeContent={removeContent} index={index} key={entry.id}/>);
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
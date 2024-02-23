import './App.css';
import Container from '@mui/material/Container';
import {CssBaseline, Grid, TextField, ThemeProvider, Typography} from "@mui/material";
import TopBar from "./TopBar";
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import allThemes from "./theme";
import DocumentManager from "./managment/documentManager";
import StackItem from "./ContentComponents/StackItem";
import PropertiesMenu from "./ContentComponents/PropertiesMenu";
import PageName from "./ContentComponents/PageName";
const httpHelperClass = require('./managment/httpHelper');
const httpHelper = new httpHelperClass();

function Document(props) {


    const [dataFetched, setDataFetched] = useState(false);
    const [error, setError] = useState(false);
    const [ignored, forceUpdate] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);




    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () =>{

        const pages = await httpHelper.getPages();
        //console.log(pages);
        if (pages === "error fetching"){
            setError(true);
        }
        else{
            DocumentManager.loadPages(pages);
            DocumentManager.setCurrentPage(pages[0]._id);

            if (DocumentManager.currentPage.content.length === 0){
                //DocumentManager.addTextContent();
            }
        }
        setDataFetched(true);

    }



    const onPageUpdate = () => { //force a rerender. not BEST practice, but works for the scope of the project
        forceUpdate(!ignored);
    }


    function removeContent(id){
        DocumentManager.removeContent(id);
        onPageUpdate();
    }

    let index = -1;
    return (
        <div>
            {!dataFetched ?
                (<h1>Loading</h1>)
                :
                (<ThemeProvider theme={allThemes.dark}>
                <CssBaseline/>
                <Container maxWidth={false} disableGutters={true}>
                    <TopBar pageID={DocumentManager.currentPage._id} onPageUpdate={onPageUpdate}/>
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
                            DocumentManager.currentPage.content.map(entry => {
                                index += 1;
                                return(<StackItem object={entry} onPageUpdate={onPageUpdate} id={entry.id} removeContent={removeContent} index={index}/>);
                            })
                        }
                    </Stack>

                </Container>
            </ThemeProvider>)
            }
        </div>

    );
}

export default Document;

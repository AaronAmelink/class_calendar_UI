import './App.css';
import Container from '@mui/material/Container';
import {CssBaseline, Grid, TextField, ThemeProvider, Typography} from "@mui/material";
import TopBar from "./TopBar";
import Stack from '@mui/material/Stack';
import {useState} from "react";
import allThemes from "./theme";
import DocumentManager from "./managment/documentManager";
import StackItem from "./ContentComponents/StackItem";
import PropertiesMenu from "./ContentComponents/PropertiesMenu";
import PageName from "./ContentComponents/PageName";


function Document() {
    const pages = [{_id:"0f785f98-5c8a-4947-8fcd-19b4300d555b", //obviously this will be removed
        page_name:"johns page",
        user_id:"c4442bac-f56e-4b05-8b6e-c1e8a10c1e68",
        content:[{type:"text",value:"hello",id:0},{type:"text",value:"hello",id:1}],
        parent_id:"null",
        properties:[{type:"text", name:"Creator", value:"Aaron", id:3},{type:"text", name:"Favourite Color", value:"Blue", id:1}]}];
        const [loaded, setLoaded] = useState(false);


    const [currentPage, setPage] = useState(DocumentManager.currentPage);

    if (!loaded){ // THIS IS A TEMPORARY LOADING SCHEME while not using backend
        DocumentManager.loadPages(pages);
        DocumentManager.setCurrentPage(pages[0]._id);
        setLoaded(true);
    }

    // DocumentManager.loadPages(pages); THE PERM LOADING SCHEME WOULD BE MORE ALONG THESE LINES.
    // if (currentPage === null && loaded === false){
    //
    //     let rootPage = DocumentManager.getRootPage();
    //     setPage(rootPage);
    //     DocumentManager.setCurrentPage(rootPage._id);
    //     setLoaded(true);
    // }

    const onPageUpdate = () => { //force a rerender. not BEST practice, but works for the scope of the project
        setPage({page_name : DocumentManager.currentPage.name,
            _id : DocumentManager.currentPage._id,
            properties: DocumentManager.currentPage.properties,
            content: DocumentManager.currentPage.content,
            user_id: DocumentManager.currentPage.user_id,
            parent_id: DocumentManager.currentPage.parent_id
        });
    }

    function removeContent(id){
        DocumentManager.removeContent(id);
        setPage({page_name : DocumentManager.currentPage.name,
            _id : DocumentManager.currentPage._id,
            properties: DocumentManager.currentPage.properties,
            content: DocumentManager.currentPage.content,
            user_id: DocumentManager.currentPage.user_id,
            parent_id: DocumentManager.currentPage.parent_id
        });
    }

    let index = -1;
    return (
      <ThemeProvider theme={allThemes.dark}>
          <CssBaseline/>
      <Container maxWidth={false} disableGutters={true}>
          <TopBar pageID={currentPage._id} onPageUpdate={onPageUpdate}/>
          <Grid container spacing={2}>
              <Grid item xs={10}>
                  <Typography variant="h4" gutterBottom sx={{color:"text.secondary", m:3}}>
                      <PageName pageID={currentPage._id}/>
                  </Typography>
              </Grid>
              <Grid item>
                  <PropertiesMenu pageID={currentPage._id}/>
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
      </ThemeProvider>

    );
}

export default Document;

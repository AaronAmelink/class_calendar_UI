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


function App() {
    const [loaded, setLoaded] = useState(false);
    const pageID = "0f785f98-5c8a-4947-8fcd-19b4300d555b";
    const pages = [{_id:"0f785f98-5c8a-4947-8fcd-19b4300d555b",
        page_name:"aarons page",
        user_id:"c4442bac-f56e-4b05-8b6e-c1e8a10c1e68",
        content:[{type:"text",value:"hello",id:0}],
        parent_id:"null",
        properties:[{type:"text", name:"Creator", value:"Aaron", id:3},{type:"text", name:"Favourite Color", value:"Blue", id:1}]}];

    if (!loaded){
        DocumentManager.loadPages(pages);
        DocumentManager.setCurrentPage(pageID);
        setLoaded(true);
    }

    const [currentPage, setPage] = useState(pages[0]);
    const onPageUpdate = () => {
        DocumentManager.setCurrentPage(pageID);
        setPage(DocumentManager.currentPage);
    }



    const renderContent = DocumentManager.currentPage.content.map(entry => {
        console.log(entry);
        if (entry.value){
            return(
                <StackItem object={entry} onPageUpdate={onPageUpdate} id={entry.id}/>
            );
        }

    })

  return (

      <ThemeProvider theme={allThemes.dark}>
          <CssBaseline/>
      <Container maxWidth={false} disableGutters={true}>
          <TopBar/>
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
              {renderContent}
          </Stack>

      </Container>
      </ThemeProvider>

  );
}

export default App;

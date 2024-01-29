import {useEffect, useState} from "react";
import Document from './document';
import LogInPage from "./LogInPage";
import httpHelper from "./managment/httpHelper";

function App(){
    const [userLogged, setUserLogged] = useState(window.sessionStorage.getItem("authToken") !== null);
    console.log("rendered");
    const RenderedPage = () => {
        if (!userLogged){

            return (<LogInPage setLoggedin={setUserLogged}/>);
        }
        else {
            return (<Document/>)
        }

    }


    return (
        <RenderedPage/>
    )
}

export default App;
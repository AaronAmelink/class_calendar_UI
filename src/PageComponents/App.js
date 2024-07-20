import {useEffect, useState} from "react";
import {Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./LogInPage";
import Document from "./document";
import ErrorPage from "./ErrorPage";
import ClassesPage from "./ClassesPage";
import EditPage from "./EditPage";
import documentManager from "../managment/documentManager";
import pageURLs from "./pageURLs";
function App(){
    const [userLogged, setUserLogged] = useState(window.sessionStorage.getItem("authToken") !== null);
    useEffect(() => {
        const authToken = window.sessionStorage.getItem("authToken");
        setUserLogged(authToken !== null);
    }, []);

    const router = createBrowserRouter([
        {
            path: pageURLs.login,
            element: <LogInPage setLoggedin={setUserLogged}/>,
            errorElement: <ErrorPage/>
        },
        {
            path: pageURLs.document,
            element: <Document/>,
            children: [
                {
                    path: pageURLs.page + '/:pageID',
                    element: <EditPage/>,
                    loader: async ({params}) => {
                        return await documentManager.changePage(params.pageID);
                    }
                },
                {
                    path: pageURLs.classes,
                    element: <ClassesPage/>
                }
            ]
        }
    ]);

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App;
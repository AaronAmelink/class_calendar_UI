import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LogInPage from "./LogInPage";
import Document from "../routes/document";
import ErrorPage from "./ErrorPage";
import ClassesPage from "../routes/ClassesPage";
import EditPage from "../routes/EditPage";
import pageURLs from "./pageURLs";

function App() {

    const router = createBrowserRouter([
        {
            path: pageURLs.login,
            element: <LogInPage/>,
            errorElement: <ErrorPage/>
        },
        {
            path: pageURLs.document,
            element: <Document/>,
            children: [
                {
                    path: pageURLs.page + '/:pageID',
                    element: <EditPage/>
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
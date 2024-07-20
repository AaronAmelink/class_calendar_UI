import { useLoaderData } from "react-router-dom";
import {useSelector} from "react-redux";
import AddAndOrganize from "./AddAndOrganize";

const tabs = {
    'Add and Organize': {
        component: (<AddAndOrganize sx={{height:1}}/>)
    },
    'View': {
        component: (<></>)
    }

}

export default function ClassesPage(props) {
    const data = useLoaderData();
    const currentTab = useSelector((state) => state.siteData.currentClassTab);

    return (
        <div>
            {tabs[currentTab].component}
        </div>
    );
}
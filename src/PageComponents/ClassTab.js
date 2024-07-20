import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import {setCurrentClassTab} from "../slices/siteDataSlice";
import allThemes from "../theme";

const tabs = ['Add and Organize', 'View']
export default function ClassTab() {
    const [selected, setSelected] = useState(0);
    const theme = useSelector((state) => state.siteData.theme);
    const dispatch = useDispatch();

    function handleChange(event, newValue) {
        setSelected(newValue);
        dispatch(setCurrentClassTab(tabs[newValue]))
    }

    return (
        <Tabs value={selected} onChange={handleChange}
              sx={{
        ".MuiTab-root.Mui-selected":
            {
                color: allThemes[theme].palette.icon.main,
            },
          "& .MuiTabs-indicator": {
              backgroundColor: 'menu.selected',
              height: 3,
          }
        }}>
            {
                tabs.map(tab => {
                    return (
                        <Tab key={tab} label={tab}/>
                    )
                })
            }
        </Tabs>
    );
}
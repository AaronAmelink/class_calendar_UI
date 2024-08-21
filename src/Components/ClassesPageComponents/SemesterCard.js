import * as React from "react";
import {useEffect, useState} from "react";
import {Card, CardContent} from "@mui/material";
import Stack from "@mui/material/Stack";
import ClassChip from "./ClassChip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function SemesterCard({semester, classes, handleClick}) {
    const [creditTotal, setCreditTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        classes.forEach(classItem => {
            let classWorth = parseFloat(classItem.creditWorth)
            total += classWorth ? classWorth : 0;
        })
        setCreditTotal(total);
    }, [classes]);

    return (
        <Card sx={{
            height: 1,
            minWidth: 1 / 5,
            border: 1,
            borderRadius: '5%',
            borderColor: 'underline.secondary',
            overflow: 'auto'
        }}>
            <CardContent>
                <Typography variant='h4' sx={{pt: 2}}>{semester}</Typography>
                <Typography variant='subtitle1'
                            sx={{pt: 2}}>{creditTotal ? 'Total Credits: ' + creditTotal : ''}</Typography>
                <Divider/>
                <Stack>
                    <Stack container spacing={2} display="flex"
                           justifyContent="center"
                           variant='outlined'
                           sx={{overflow: 'auto', my: 2}}>
                        {
                            classes.map(classItem => {
                                if (classItem.planned) {
                                    return (<ClassChip code={classItem.courseCode} id={classItem.id}
                                                       handleClick={handleClick}/>);
                                } else {
                                    return null;
                                }
                            })
                        }
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}
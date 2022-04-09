import {  Box, Typography, Divider } from "@mui/material";
import { VFC } from "react"


const Item:VFC<{
    itemTitle:string,
    itemValue:string|undefined
}>=({itemTitle,itemValue})=>{

    return (<>

        <Box>
            <Box sx={{ my: 3, mx: 2 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {itemTitle}
                </Typography>
                <Typography color="text.secondary" variant="body1" style={{whiteSpace: 'pre-line'}}>
                    {itemValue}
                </Typography>
            </Box>
        </Box>
        <Divider variant="middle" />

    </>)
}

export default Item;

//Divider Demo
//https://mui.com/components/dividers/
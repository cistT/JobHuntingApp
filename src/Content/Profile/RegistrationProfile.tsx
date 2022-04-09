import { Box, Grid, Typography } from "@mui/material";
import { VFC } from "react";

export const RegistrationProfile:VFC<{
    profileLabel:string,
    fieldValue:string,
}>=({profileLabel,fieldValue})=>{

    return (
        <Box>
            <Box sx={{ my: 3, mx: 2 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {profileLabel}
                </Typography>
                <Typography color="text.secondary" variant="body1" style={{whiteSpace: 'pre-line'}}>
                    {fieldValue}
                </Typography>
            </Box>
        </Box>

       )
}


{/* <Grid container style={{display: 'block'}}>
<h1>{profileLabel}</h1>
 <Grid sm={2}/> 
<div style={{height:"70px",paddingTop:"30px",paddingLeft:"10px"}}>{fieldValue}</div>
</Grid> */}
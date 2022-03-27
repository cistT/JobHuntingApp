import { Grid } from "@mui/material";
import { VFC } from "react";

export const RegistrationProfile:VFC<{
    profileLabel:string,
    fieldValue:string,

}>=({profileLabel,fieldValue})=>{

    return (
        <Grid container style={{display: 'block'}}>
            <h1>{profileLabel}</h1>
            <Grid sm={2}/>
            <div style={{height:"70px",paddingTop:"30px",paddingLeft:"10px"}}>{fieldValue}</div>
        </Grid>)
}
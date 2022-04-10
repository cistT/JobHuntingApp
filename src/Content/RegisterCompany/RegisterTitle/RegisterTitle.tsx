import { Typography } from "@mui/material";
import { VFC } from "react"


const RegisterTitle:VFC<{
    title:string
}>=({title})=>{

    return (
    <>
        <Typography gutterBottom variant="h5" component="div">
                {title}
        </Typography>
    </>
    )
}

export default RegisterTitle;
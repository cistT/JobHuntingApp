import { Typography } from "@mui/material";
import { VFC } from "react"


const AppTitle:VFC<{appTitle:string}>=({appTitle})=>{

    return (
        <>
            <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
            >
                {appTitle}
            </Typography>
        </>
    )
}

export default AppTitle;
import { VFC } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@mui/material";


const BackPage:VFC<{
    clickBackButton:()=>void
}>=({clickBackButton})=>{

    return (
        <IconButton style={{height:"60px"}}>
            <ArrowBackIosNewIcon
                style={{height:"60px",width:"40px"}}
                onClick={clickBackButton}
            />
        </IconButton>
    )
}

export default BackPage;
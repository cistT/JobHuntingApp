import { VFC } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@mui/material";


const BackPage:VFC<{clickBackButton:()=>void}>=({clickBackButton})=>{

    return (
        <IconButton>
            <ArrowBackIosNewIcon onClick={clickBackButton}/>
        </IconButton>
    )
}

export default BackPage;
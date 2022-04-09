import { VFC } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";

const NextPage:VFC<{clickNextButton:()=>void}>=({clickNextButton})=>{

    return (
        <>
            <IconButton>
                <ArrowForwardIosIcon onClick={()=>clickNextButton()}/>
            </IconButton>
        </>
    )
}

export default NextPage;
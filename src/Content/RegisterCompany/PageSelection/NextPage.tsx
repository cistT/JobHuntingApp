import { VFC } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";

const NextPage:VFC<{clickNextButton:()=>void}>=({clickNextButton})=>{

    return (
        <>
            <IconButton
                style={{height:"60px"}}
            >
                <ArrowForwardIosIcon
                    style={{height:"60px",width:"40px"}}
                    onClick={()=>clickNextButton()}
                />
            </IconButton>
        </>
    )
}

export default NextPage;
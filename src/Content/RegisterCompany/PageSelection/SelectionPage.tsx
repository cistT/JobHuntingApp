import { styled } from "@mui/material";
import { VFC } from "react";



const SelectionPage:VFC<{
    focusPage:number,
    title:string
}>=({focusPage,title})=>{


    return (
        <div style={{height:"600px",width:"100%",justifyContent: "center",fontSize:"20px"}}>
            <div style={{fontSize:"15px"}}>
                {`step ${focusPage+1}`}
            </div>
            <div>{title}</div>
        </div>
    )
}

export default SelectionPage;
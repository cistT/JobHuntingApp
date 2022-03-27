import { CircularProgress, styled } from "@mui/material";
import { VFC } from "react";



const SelectionPage:VFC<{focusPage:number,page:number,title:string}>=({focusPage,page,title})=>{


    return (
        <div style={{height:"600px",width:"100%",justifyContent: "center",fontSize:"20px"}}>
            <div style={{backgroundColor:focusPage===page+1?"red":"white",fontSize:"15px"}}>{`step ${page}`}</div>
            <div>{title}</div>
        </div>
    )
}

export default SelectionPage;
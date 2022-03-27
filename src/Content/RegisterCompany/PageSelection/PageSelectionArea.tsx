import { CircularProgress, styled } from "@mui/material";
import { VFC } from "react";
import BackPage from "./BackPage";
import SelectionPage from "./SelectionPage";
import NextPage from "./NextPage";


const PageSelectionArea:VFC<{
    page:number,
    titles:string[],
    setInputPage:React.Dispatch<React.SetStateAction<number>>
}>=({page,titles,setInputPage}) =>{

    return (
        <div style={{display:"flex",textAlign:"center",height:"60px"}} >
            <div style={{width:"100px"}}>{page>1&&<BackPage  clickBackButton={()=>setInputPage(page-1)}/>}</div>
            <SelectionPage focusPage={page} page={page} title={titles[page-1]}/>
            <div style={{width:"100px"}}>{page<titles.length&&<NextPage clickNextButton={()=>setInputPage(page+1)} />}</div>
        </div>
    )
}

export default PageSelectionArea;
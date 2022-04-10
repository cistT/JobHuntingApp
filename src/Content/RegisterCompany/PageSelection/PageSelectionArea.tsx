import { CircularProgress, styled } from "@mui/material";
import { VFC } from "react";
import BackPage from "./BackPage";
import SelectionPage from "./SelectionPage";
import NextPage from "./NextPage";


const PageSelectionArea:VFC<{
    page:number,
    titles:string[],
    selectInputPage:(page:number)=> void
}>=({page,titles,selectInputPage}) =>{

    return (
        <div style={{display:"flex",textAlign:"center",height:"60px"}} >

            <div style={{width:"100px",height:"60px"}}>
                {page>0&&(
                    <BackPage
                        clickBackButton={()=>selectInputPage(page-1)}
                    />
                )}
            </div>

            <SelectionPage
                focusPage={page}
                title={titles[page]}
            />

            <div style={{width:"100px",height:"60px"}}>
                {page<titles.length-1&&(
                    <NextPage
                        clickNextButton={()=>selectInputPage(page+1)}
                    />
                )}
            </div>
            
        </div>
    )
}

export default PageSelectionArea;
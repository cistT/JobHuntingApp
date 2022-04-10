import { Button } from "@mui/material"
import { VFC } from "react"


const PageSelectionButtonArea:VFC<{
    focusPage:number,
    lastPage:number,
    selectInputPage:(page:number)=>void,
    onClick:()=>void
}>=({focusPage,lastPage,selectInputPage,onClick})=>{

    return (
    <>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            {focusPage>0?(
                <Button
                    variant="outlined"
                    onClick={()=>selectInputPage(focusPage-1)}
                >
                    戻る
                </Button>):
                <div></div>
            }
   
            {focusPage<lastPage?(
                <Button
                    variant="outlined"
                    onClick={()=>selectInputPage(focusPage+1)}
                >
                    進む
                </Button>):
                <div></div>
            }
        </div>
    </>)
}

export default PageSelectionButtonArea;

//         {focusPage===lastPage?<Button style={{justifyContent:"center"}}  type="submit" onClick={()=>undefined}>決定</Button>:<div></div>}
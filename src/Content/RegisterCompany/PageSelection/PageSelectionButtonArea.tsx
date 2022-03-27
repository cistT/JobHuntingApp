import { Button } from "@mui/material"
import { VFC } from "react"


const PageSelectionButtonArea:VFC<{
    focusPage:number,
    focusLastPage:number,
    setFocus:React.Dispatch<React.SetStateAction<number>>,
    onClick:()=>void
}>=({focusPage,focusLastPage,setFocus,onClick})=>{

    return (
    <>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            {focusPage>1?<Button onClick={()=>setFocus(focusPage-1)}>戻る</Button>:<div></div>}
   
            {focusPage<focusLastPage?<Button onClick={()=>setFocus(focusPage+1)}>進む</Button>:<div></div>}
        </div>
    </>)
}

export default PageSelectionButtonArea;

//         {focusPage===focusLastPage?<Button style={{justifyContent:"center"}}  type="submit" onClick={()=>undefined}>決定</Button>:<div></div>}
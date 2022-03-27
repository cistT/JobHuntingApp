import { Button } from "@mui/material";
import { VFC } from "react"


const List:VFC<{
    title:string,
    num:number,
    set:React.Dispatch<React.SetStateAction<number | null>>
}>=({title,num,set})=>{
    return (<>
        <h1>{title}</h1>
        <Button onClick={()=>set(num)}>閲覧</Button>
    </>)
}


export default List;

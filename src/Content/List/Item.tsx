import { ListItem,List,ListItemText } from "@mui/material";
import { VFC } from "react"


const Item:VFC<{
    itemTitle:string,
    itemValue:string[]|undefined
}>=({itemTitle,itemValue})=>{

    return (<>
        <List>
            <ListItem >
                <ListItemText primary={itemTitle} secondary={itemValue}
                             />
            </ListItem>
        </List>
    </>)
}

export default Item;
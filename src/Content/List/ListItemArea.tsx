import { useState, VFC } from "react"
import {ListItemField} from "./ListItemField"
import { CompanyInformationType } from "../TypeDefinitionFiles/CompanyInformationType";
import List from "./List";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';


export const ListItemArea:VFC<{
    companyRegistrationInfo:CompanyInformationType[]
}>=({companyRegistrationInfo})=>{

    const [c,setC]=useState<number|null>(null);
    const clickCloseButton=()=>setC(null);
    console.log(companyRegistrationInfo)

    return (
        <>{
            c===null? companyRegistrationInfo!==null&&
            companyRegistrationInfo.map((item,i)=>{
                return(
                    <ListItemButton key={i}>
                        <ListItemText primary={item.companyName} onClick={()=>(setC(i))}/>
                        <IconButton>
                            <DeleteOutlineTwoToneIcon />
                        </IconButton>
                    </ListItemButton>
                    // <div key={i}>{item.companyName}
                    //     <button onClick={()=>(setC(i))}>閲覧する</button>
                    // </div>
                )
            }):<ListItemField 
                    printRegistrationItem={companyRegistrationInfo[c]} 
                    clickCloseButton={clickCloseButton} />


        }
        </>
    )
}
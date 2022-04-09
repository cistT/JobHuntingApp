import { useState, VFC } from "react"
import {ListItemField} from "./ListItemField"
import { CompanyInformationType } from "../TypeDefinitionFiles/CompanyInformationType";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';


export const ListItemArea:VFC<{
    companyRegistrationInfo:CompanyInformationType[],
    deletePrintRegistrationItem:(registerId:string) => void
}>=({deletePrintRegistrationItem,companyRegistrationInfo})=>{

    const [c,setC]=useState<number|null>(null);
    const clickCloseButton=()=>setC(null);

    return (
        <>{
            c===null? companyRegistrationInfo!==null&&(
            companyRegistrationInfo
            .map((item,i)=>{
                return(
                    <ListItemButton key={i} style={{display:"flex",height:"100px"}}>
                        <ListItemText primary={item.companyName} onClick={()=>(setC(i))}/>
                        <IconButton>
                            <DeleteOutlineTwoToneIcon
                                onClick={()=>deletePrintRegistrationItem(item.registerId)}
                            />
                        </IconButton>
                    </ListItemButton>
                )
            })):(
            <ListItemField
                printRegistrationItem={companyRegistrationInfo[c]}
                clickCloseButton={clickCloseButton}
            />)
        }
        </>
    )
}


//Lists Demo
//https://mui.com/components/lists/
import { useState, VFC } from "react"
import {ListItemField} from "./ListItemField"
import { CompanyInformationType } from "../TypeDefinitionFiles/CompanyInformationType";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { UseFormRegisterReturn } from "react-hook-form";


export const ListItemArea:VFC<{
    companyRegistrationInfo:CompanyInformationType[],
    deletePrintRegistrationItem:(registerId:string) => void,
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
    registerObj: {
        registerLabel: string;
        register: UseFormRegisterReturn;
    }[]
}>=({deletePrintRegistrationItem,companyRegistrationInfo,onSubmit,registerObj})=>{

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
                onSubmit={onSubmit}
                registerObj={registerObj}
            />)
        }
        </>
    )
}


//Lists Demo
//https://mui.com/components/lists/
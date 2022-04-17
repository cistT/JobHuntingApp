import { useState, VFC } from "react"
import {ListItemField} from "./ListItemField"
import { CompanyInformationType } from "../TypeDefinitionFiles/CompanyInformationType";
import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { UseFormRegisterReturn } from "react-hook-form";


export const ListItemArea:VFC<{
    registeredCompanies:CompanyInformationType[],
    deletePrintRegistrationItem:(registerId:string) => void,
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
    registerObj: {
        registerLabel: string;
        register: UseFormRegisterReturn;
    }[]
}>=({deletePrintRegistrationItem,registeredCompanies,onSubmit,registerObj})=>{

    const [c,setC]=useState<number|null>(null);
    const clickCloseButton=()=>setC(null);

    return (
        <>{
            c===null? registeredCompanies!==null&&(
            registeredCompanies
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
                printRegistrationItem={registeredCompanies[c]}
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
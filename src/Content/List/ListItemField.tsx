import styled from "@emotion/styled";
import { VFC } from "react";
import { CompanyInformationType } from "../TypeDefinitionFiles/CompanyInformationType";
import { Button, ListItemText } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import Item from "./Item";
import RewriteDialog from "../../RewriteDialog/RewriteDialog";
import { UseFormRegisterReturn } from "react-hook-form";

const MyStylePrintArea=styled("div")({
    height:"100px",
});

export const ListItemField:VFC<{
    printRegistrationItem:CompanyInformationType,
    clickCloseButton:()=>void,
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
    registerObj: {
        registerLabel: string;
        register: UseFormRegisterReturn;
    }[]
}>=({printRegistrationItem,onSubmit,clickCloseButton,registerObj})=>{
    const title=["企業名","住所","電話番号",
                    "メールアドレス","URL","提出物","提出物期限",
                    "インターン日程","先行日程","メモ",];

    return (
        <>
            <h1>企業情報</h1>
            {/* <RewriteDialog
                onSubmit={onSubmit}
                registerObj={registerObj}
            /> */}
            {Object
                .values(printRegistrationItem)
                .filter((_,i)=>i!==0)
                .map((item,i)=>(
                    <div key={item}>
                        <Item itemTitle={title[i]}  itemValue={item} />
                    </div>
                ))}
          
            <Button onClick={clickCloseButton}>閉じる</Button>
        </>
    )
}

//Divider
//https://mui.com/components/dividers/
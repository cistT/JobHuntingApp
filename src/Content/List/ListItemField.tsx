import styled from "@emotion/styled";
import { VFC } from "react";
import { CompanyInformationType } from "../TypeDefinitionFiles/CompanyInformationType";
import List from '@mui/material/List';
import { Button, ListItemText } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import Item from "./Item";

const MyStylePrintArea=styled("div")({
    height:"100px",
});

export const ListItemField:VFC<{
    printRegistrationItem:CompanyInformationType,
    clickCloseButton:()=>void
}>=({printRegistrationItem,clickCloseButton})=>{
    const title=["企業名","住所","電話番号",
                    "メールアドレス","URL","提出物","提出物期限",
                    "インターン日程","先行日程","メモ",];

    return (
        <>
            <h1>企業情報</h1>
            {Object
                .values(printRegistrationItem)
                .map((item,i)=><Item itemTitle={title[i]}  itemValue={item} />)}
          
            <Button onClick={clickCloseButton}>閉じる</Button>
        </>
    )
}

//Divider
//https://mui.com/components/dividers/
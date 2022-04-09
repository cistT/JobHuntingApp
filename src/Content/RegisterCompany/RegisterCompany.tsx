import {  useState, VFC } from "react"
import PageSelectionArea from "./PageSelection/PageSelectionArea";
import PageSelectionButtonArea from "./PageSelection/PageSelectionButtonArea";
import CompanyInputForm from "./CompanyInput/CompanyInputForm";
import { UseFormRegisterReturn } from "react-hook-form";
import { Typography } from "@mui/material";
import useEffectCustom from "../../CustomHook/useEffectCustom";

export const RegisterCompany:VFC<{
    contentTitle?:string,
    register: UseFormRegisterReturn[][],
    titles:string[],
    labels:string[][],
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}>=({contentTitle="No Title",register=[],titles,onSubmit,labels})=>{

    const [inputPage,setInputPage]=useState<number>(1);
    useEffectCustom(()=>{
        window.scrollTo(0, 0)
    },[inputPage])

    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                    {contentTitle}
                </Typography>

            <PageSelectionArea
                page={inputPage}
                titles={titles}
                setInputPage={setInputPage}
            />

            <CompanyInputForm
                labels={labels[inputPage-1]}
                register={register[inputPage-1]}
                onSubmit={onSubmit}
            />

            <PageSelectionButtonArea
                focusPage={inputPage} 
                focusLastPage={register.length}
                setFocus={setInputPage}
                onClick={onSubmit}
            />
        </>
    )
}

import {  useState, VFC } from "react"
import PageSelectionArea from "./PageSelection/PageSelectionArea";
import PageSelectionButtonArea from "./PageSelection/PageSelectionButtonArea";
import CompanyInputForm from "./CompanyInput/CompanyInputForm";
import { UseFormRegisterReturn } from "react-hook-form";
import { Typography } from "@mui/material";
import useEffectCustom from "../../CustomHook/useEffectCustom";
import RegisterTitle from "./RegisterTitle/RegisterTitle";

export const RegisterCompany:VFC<{
    contentTitle?:string,
    register: UseFormRegisterReturn[][],
    titles:string[],
    labels:string[][],
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}>=({contentTitle="No Title",register=[],titles,onSubmit,labels})=>{

    const [inputPage,setInputPage]=useState<number>(0);

    const selectInputPage=(page:number)=>{
        setInputPage(page);
    }

    useEffectCustom(()=>{
        window.scrollTo(0, 0)
    },[inputPage])

    return (
        <>
            <RegisterTitle title={contentTitle} />

            <PageSelectionArea
                page={inputPage}
                titles={titles}
                selectInputPage={selectInputPage}
            />

            <CompanyInputForm
                labels={labels[inputPage]}
                register={register[inputPage]}
                onSubmit={onSubmit}
            />

            <PageSelectionButtonArea
                focusPage={inputPage}
                lastPage={register.length-1}
                selectInputPage={selectInputPage}
                onClick={onSubmit}
            />
        </>
    )
}

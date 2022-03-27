import {  useState, VFC } from "react"
import PageSelectionArea from "./PageSelection/PageSelectionArea";
import PageSelectionButtonArea from "./PageSelection/PageSelectionButtonArea";
import CompanyInputForm from "./CompanyInput/CompanyInputForm";
import { UseFormRegisterReturn } from "react-hook-form";

export const RegisterCompany:VFC<{
    contentTitle?:string,
    register: UseFormRegisterReturn[][],
    titles:string[],
    labels:string[][],
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}>=({contentTitle="No Title",register=[],titles,onSubmit,labels})=>{

    const [inputPage,setInputPage]=useState<number>(1);

    return (
        <>
            <h1>{contentTitle}</h1>

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


            // {/* {
            //     register.map((item,i)=>(
            //         <div key={i}>
            //             <h3>{item.fieldName}</h3>
            //             <Tooltip
            //                 title="自由に記入することができます"
            //                 placement="top-start"
            //                 arrow
            //                 >
            //                 <TextField 
            //                     name={item.fieldName}
            //                     multiline
            //                     margin="normal"
            //                     placeholder={`${item.fieldName}を入力してください(任意)`}
            //                     style={{width:"90vw",height:"100px"}}
            //                     onChange={(e)=>{item.set([e.target.value])}}
            //                 />
            //             </Tooltip>
            //         </div>
            //     ))
            // }/*}
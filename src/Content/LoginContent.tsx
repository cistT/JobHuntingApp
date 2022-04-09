import {  useLayoutEffect, useReducer, useState, VFC } from "react";
import { ListItemArea } from "./List/ListItemArea";
import Profile from "./Profile/Profile"
import { RegisterCompany } from "./RegisterCompany/RegisterCompany";
import { CompanyInformationType } from "./TypeDefinitionFiles/CompanyInformationType";
import { useForm } from 'react-hook-form';
import useEffectCustom from "../CustomHook/useEffectCustom";
import UUID from 'uuidjs';

const LoginContent:VFC<{
    userId:string,
    content:number
}>=({userId,content})=>{

       //Profile コンポーネント
       const [userName,setUserName]=useState("");
       const [appeal,setAppeal]=useState("");
       const [memo,setMemo]=useState("");
       const [profile,togleProfile]=useReducer(profile=>!profile,false);

       useLayoutEffect(()=>{
           //ログイン時に保存されているプロフィールを取得
            (async ()=>{
                const res=await fetch(`${process.env.REACT_APP_CONNECT_DB}/profile/userId=${userId}`);
                const json=await res.json();
                setUserName(json.userName||"");
                setAppeal(json.appeal||"");
                setMemo(json.memo||"");
            })();
           },[])

       useEffectCustom(()=>{
        (async ()=>{
            const url = "http://localhost:8080/test";
            const response =fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    userId: userId,
                    userName: userName,
                    appeal:appeal,
                    memo:memo
                })
            })
            window.alert("登録が完了しました");
        })()
       },[profile])

       const {register,handleSubmit,reset}=useForm<{
        userName:string,
        appeal:string,
        userMemo:string,
        name:string,
        address:string,
        telephoneNumber:string,
        mailAddress:string,
        url:string,
        deliverables:string,
        deliverablesTerm:string,
        internship:string,
        selection:string,
        memo:string}>();

       const clickDecisionProfile=(data:any)=>{
       
           setUserName(data.userName);
           setAppeal(data.appeal);
           setMemo(data.userMemo);
           togleProfile()
       }

    //Registrationコンポーネント 要改善
  
    const [companyRegistrationInfo,setPrintRegistrationItems,]=useState<CompanyInformationType[]>([]);
    const [registerFlag,toggleRegisterFlag]=useReducer(registerFlag=>!registerFlag,false);
    useEffectCustom(()=>{
        const company=companyRegistrationInfo[companyRegistrationInfo.length-1];

        (async ()=>{
            const url = "http://localhost:8080/registerCompany";
            const res=fetch(url,{
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    userId: userId,
                    registerId:company.registerId,
                    companyName:company.companyName,
                    companyAddress:company.companyAddress,
                    companyTelephoneNumber:company.companyTelephoneNumber,
                    companyMailAddress:company.companyMailAddress,
                    companyUrl:company.companyUrl,
                    companyDeliverables:company.companyDeliverables,
                    companyDeliverablesTerm:company.companyDeliverablesTerm,
                    companyInternship:company.companyInternship,
                    companySelection:company.companySelection,
                    companyMemo:company.companyMemo,
                })
            })
        })()
    },[registerFlag])

    const clickDecisionCompany=(data:any)=>{
        
        setPrintRegistrationItems([...companyRegistrationInfo,{
            registerId:UUID.generate(),
            companyName:data.name,
            companyAddress:data.address,
            companyTelephoneNumber:data.telephoneNumber,
            companyMailAddress:data.mailAddress,
            companyUrl:data.url,
            companyDeliverables:data.deliverables,
            companyDeliverablesTerm:data.deliverablesTerm,
            companyInternship:data.internship,
            companySelection:data.selection,
            companyMemo:data.memo,
        }]);
        window.alert("登録が完了しました");
        reset({
            userName:data.userName,
            appeal:data.appeal,
            userMemo:data.userMemo,
            name:"",
            address:"",
            telephoneNumber:"",
            mailAddress:"",
            url:"",
            deliverables:"",
            deliverablesTerm:"",
            internship:"",
            selection:"",
            memo:""
        });
        toggleRegisterFlag();
    }

    const [deleteId,setDeleteId]=useState("");
    const [deleteFlag,toggleDeleteFlag] =useReducer(deleteFlag=>!deleteFlag,false);
    useEffectCustom(()=>{
        //エラー
        (async ()=>{
            const url = "http://localhost:8080/deleteRegisterId";
            const response =await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    deleteRegisterId:deleteId
                })
            })
        })()
        
    },[deleteFlag])
    const deletePrintRegistrationItem=(registerId:string)=>{
        setDeleteId(registerId);
        toggleDeleteFlag();
        setPrintRegistrationItems(
            companyRegistrationInfo
            .filter((item)=>item.registerId!==registerId)
        )
    }

    return (

        <>
            {content===0&&(
                <Profile
                    profile={[
                        {profileLabel:"名前",prfileInformation:userName},
                        {profileLabel:"アピール",prfileInformation:appeal},
                        {profileLabel:"メモ",prfileInformation:memo},
                    ]}
                    register={[register("userName"),register("appeal"),register("userMemo")]}
                    onSubmit={handleSubmit(clickDecisionProfile)}
                />
            )}

            {content===1&&(
                <ListItemArea
                    companyRegistrationInfo={companyRegistrationInfo}
                    deletePrintRegistrationItem={deletePrintRegistrationItem}
                />
            )}
            {content===2&&(
                <RegisterCompany
                    contentTitle="企業登録"
                    register={[
                        [register("name"),register("address"),register("telephoneNumber"),register("mailAddress"),register("url")],
                        [register("deliverables"),register("deliverablesTerm")],
                        [register("internship"),register("selection")],
                        [register("memo")]
                    ]}
                    labels={[
                        ["企業名","住所","電話番号","メールアドレス","URL"],
                        ["提出物","提出物期限"],
                        ["インターンシップ日程","先行日程"],
                        ["メモ"]
                    ]}
                    onSubmit={handleSubmit(clickDecisionCompany)} 
                    titles={["企業情報","提出物","インターン・選考","メモ"]}
                />
            )}
        </>
    )
}

export default LoginContent;














    // // useEffect(()=>{
    // //     const f=async ()=>{
    // //         const res=await fetch("http://localhost:8080/profile");
    // //         const json=await res.json();
    // //         setUserName({before:json.userName,after:json.userName});
    // //         setAppeal({before:json.appeal,after:json.appeal});
    // //         setMemo({before:json.memo,after:json.memo});
            
    // //     }   

    // //         f();
    // // },[])



    // const [companyName,setCompanyName]=useState<string[]>([""]);
    // const [companyAddress,setCompanyAdress]=useState<string[]>([""]);
    // const [companyTelephoneNumber,setCompanyTelephoneNumber]=useState<string[]>([" "]);
    // const [companyMailAddress,setCompanyMailAdress]=useState<string[]>([""]);
    // const [companyUrl,setCompanyUrl]=useState<string[]>([""]);
    // const [companyDeliverables,setCompanyDeliverables]=useState<string[]>([""]);
    // const [companyDeliverablesTerm,setCompanyDeliverablesTerm]=useState<string[]>([" "]);
    // const [companyInternship,setCompanyInternship]=useState<string[]>([""]);
    // const [companySelection,setCompanySelection]=useState<string[]>([""]);
    // const [companyMemo,setCompanyMemo]=useState<string[]>([""]);

    // const registrationItems:{fieldName:string,set:React.Dispatch<React.SetStateAction<string[]>>}[][]=[
    //     [
    //         {fieldName:"企業名",set:setCompanyName},
    //         {fieldName:"住所",set:setCompanyAdress},
    //         {fieldName:"電話番号",set:setCompanyTelephoneNumber},
    //         {fieldName:"メールアドレス",set:setCompanyMailAdress},
    //         {fieldName:"URL",set:setCompanyUrl}
    //     ],
    //     [
    //         {fieldName:"提出物",set:setCompanyDeliverables},
    //         {fieldName:"提出物期限",set:setCompanyDeliverablesTerm}
    //     ],
    //     [
    //         {fieldName:"インターン日程",set:setCompanyInternship},
    //         {fieldName:"選考日程",set:setCompanySelection}
    //     ],
    //     [
    //         {fieldName:"メモ",set:setCompanyMemo}
    //     ]
    // ];





    // const registerCompanyInformation=()=>{

    //     if(companyRegistrationInfo===null){
    //         setPrintRegistrationItems([{
    //             companyName,
    //             companyAddress,
    //             companyTelephoneNumber,
    //             companyMailAddress,
    //             companyUrl,
    //             companyDeliverables,
    //             companyDeliverablesTerm,
    //             companyInternship,
    //             companySelection,
    //             companyMemo,
    //         }]);
    //     }else{
    //         setPrintRegistrationItems([...companyRegistrationInfo,{
    //             companyName,
    //             companyAddress,
    //             companyTelephoneNumber,
    //             companyMailAddress,
    //             companyUrl,
    //             companyDeliverables,
    //             companyDeliverablesTerm,
    //             companyInternship,
    //             companySelection,
    //             companyMemo,
    //         }]);
    //     }
    //     registrationItems.forEach((items) => {items.forEach((item) =>item.set([""]))})//初期化
    // }




    // const renderFlgRef = useRef(false);
    // useEffect(() => {
    //     if(renderFlgRef.current){
    //      (async ()=>{
    //          const url = "http://localhost:8080/test";
    //          const response =fetch(url,{
    //              method: "POST",
    //              headers: {
    //                  'Content-Type': 'application/json'
    //                },
    //              body:JSON.stringify({
    //                  userId: userId,
    //                  userName: userName,
    //                  appeal:appeal,
    //                  memo:memo
    //              })
    //          })
    //          window.alert("登録が完了しました");
    //      })()
   
    //     }else{
    //      renderFlgRef.current = true;
    //      window.alert("third");
    //     }
        
    // },[profile])

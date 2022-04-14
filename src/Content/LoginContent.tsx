import {  useLayoutEffect, useReducer, useState, VFC } from "react";
import { ListItemArea } from "./List/ListItemArea";
import Profile from "./Profile/Profile"
import { RegisterCompany } from "./RegisterCompany/RegisterCompany";
import { CompanyInformationType } from "./TypeDefinitionFiles/CompanyInformationType";
import { useForm } from 'react-hook-form';
import useEffectCustom from "../CustomHook/useEffectCustom";
import UUID from 'uuidjs';
import { InputLoginContent } from "./TypeDefinitionFiles/InputLoginContent";

const LoginContent:VFC<{
    userId:string,
    content:number
}>=({userId,content})=>{

       //Profile コンポーネント
       const [userName,setUserName]=useState("");
       const [profileAppeal,setProfileAppeal]=useState("");
       const [profileMemo,setProfileMemo]=useState("");
       const [profile,togleProfile]=useReducer(profile=>!profile,false);

       useLayoutEffect(()=>{
           //ログイン時に保存されているプロフィールを取得
            (async ()=>{
                const res=await fetch(`${process.env.REACT_APP_CONNECT_DB}/profile/userId=${userId}`);
                const json=await res.json();
                setUserName(json.userName||"");
                setProfileAppeal(json.appeal||"");
                setProfileMemo(json.memo||"");
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
                    appeal:profileAppeal,
                    memo:profileMemo
                })
            })
            window.alert("登録が完了しました");
        })()
       },[profile])

       const {register,handleSubmit,reset}=useForm<InputLoginContent>();

       const clickDecisionProfile=(data:any)=>{
           setUserName(data.userName||"");
           setProfileAppeal(data.profileAppeal||"");
           setProfileMemo(data.profileMemo||"");
           togleProfile()
       }

    //Registrationコンポーネント 要改善
  
    const [companyRegistrationInfo,setPrintRegistrationItems]=useState<CompanyInformationType[]>([]);
    const [registerFlag,toggleRegisterFlag]=useReducer(registerFlag=>!registerFlag,false);

    useLayoutEffect(()=>{
        //ログイン時に保存されているプロフィールを取得
         (async ()=>{
             const res=await fetch(`${process.env.REACT_APP_CONNECT_DB}/fetchCompany/userId=${userId}`);
             const json=await res.json();
             setPrintRegistrationItems(json);
         })()
        },[])


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
            profileAppeal:data.profileAppeal,
            profileMemo:data.profileMemo,
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
    const deletePrintRegistrationItem=(registerId:string)=>{
        setDeleteId(registerId);
        toggleDeleteFlag();
        setPrintRegistrationItems(
            companyRegistrationInfo
            .filter((item)=>item.registerId!==registerId)
        )
    }
    useEffectCustom(()=>{
        (async ()=>{
            const url = "http://localhost:8080/deleteRegisterId";
            window.alert(deleteId)
            const response =await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    userId:userId,
                    deleteRegisterId:deleteId
                })
            })
        })()
        
    },[deleteFlag])
   

    return (
        <>
            {content===0&&(
                <Profile
                    profile={[
                        {profileLabel:"名前",prfileInformation:userName},
                        {profileLabel:"アピール",prfileInformation:profileAppeal},
                        {profileLabel:"メモ",prfileInformation:profileMemo},
                    ]}
                    registerProfile={[
                        {registerLabel:"名前",register:register("userName")},
                        {registerLabel:"アピール",register:register("profileAppeal")},
                        {registerLabel:"メモ",register:register("profileMemo")},
                    ]}
                    onSubmit={handleSubmit(clickDecisionProfile)}
                />
            )}

            {content===1&&(
                <ListItemArea
                    companyRegistrationInfo={companyRegistrationInfo}
                    deletePrintRegistrationItem={deletePrintRegistrationItem}
                    onSubmit={handleSubmit(clickDecisionCompany)}
                    registerObj={[
                        {registerLabel:"企業名",register:register("name")},
                        {registerLabel:"住所",register:register("address")},
                        {registerLabel:"電話番号",register:register("telephoneNumber")},
                        {registerLabel:"メールアドレス",register:register("mailAddress")},
                        {registerLabel:"URL",register:register("url")},
                        {registerLabel:"提出物",register:register("deliverables")},
                        {registerLabel:"提出物期限",register:register("deliverablesTerm")},
                        {registerLabel:"インターンシップ日程",register:register("internship")},
                        {registerLabel:"先行日程",register:register("selection")},
                        {registerLabel:"メモ",register:register("memo")},
                    ]}
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


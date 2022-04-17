import {  useLayoutEffect, useReducer, useState, VFC } from "react";
import { ListItemArea } from "./List/ListItemArea";
import Profile from "./Profile/Profile"
import { RegisterCompany } from "./RegisterCompany/RegisterCompany";
import { CompanyInformationType } from "./TypeDefinitionFiles/CompanyInformationType";
import { useForm } from 'react-hook-form';
import useEffectCustom from "../CustomHook/useEffectCustom";
import UUID from 'uuidjs';
import { InputLoginContent } from "./TypeDefinitionFiles/InputLoginContent";
import fetchData from "./fetchData";
import sendData from "./sendData";
import { FetchProfile, UpdateProfile } from "./TypeDefinitionFiles/ProfileType";
import deleteData from "./deleteData";

const LoginContent:VFC<{
    userId:string,
    content:number
}>=({userId,content})=>{
    const {register,handleSubmit,reset}=useForm<InputLoginContent>();

    //Profile コンポーネント
    const [userName,setUserName]=useState("");
    const [profileAppeal,setProfileAppeal]=useState("");
    const [profileMemo,setProfileMemo]=useState("");
    const [postProfile,toglePostProfile]=useReducer(postProfile=>!postProfile,false);
    const fetchProfile=(json:FetchProfile)=>{
            setUserName(json.userName||"");
            setProfileAppeal(json.appeal||"");
            setProfileMemo(json.memo||"");
    }

    useLayoutEffect(()=>{
        fetchData(
            `${process.env.REACT_APP_CONNECT_DB}/profile/userId=${userId}`,
            fetchProfile
        );
    },[userId])

    useEffectCustom(()=>{
        const sendProfile={
            userId: userId,
            userName: userName,
            appeal:profileAppeal,
            memo:profileMemo
        }
        sendData(
            "http://localhost:8080/test",
            sendProfile
        );
    },[postProfile])

    const clickDecisionProfile=(data:UpdateProfile)=>{
        setUserName(data.userName||"");
        setProfileAppeal(data.profileAppeal||"");
        setProfileMemo(data.profileMemo||"");
        toglePostProfile()
    }

    //Registrationコンポーネント 要改善
    const [registeredCompanies,setRegisteredCompanies]=useState<CompanyInformationType[]>([]);
    const [registerFlag,toggleRegisterFlag]=useReducer(registerFlag=>!registerFlag,false);

    useLayoutEffect(()=>{
        //ログイン時に保存されているプロフィールを取得
        const fetchRegisteredCompanies=(json:CompanyInformationType[])=>setRegisteredCompanies(json);
        fetchData(
            `${process.env.REACT_APP_CONNECT_DB}/fetchCompany/userId=${userId}`,
            fetchRegisteredCompanies
        );
    },[userId])

    useEffectCustom(()=>{
        const company=registeredCompanies[registeredCompanies.length-1];
        const newRegisteredCompany= {
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
        }
        sendData(
            "http://localhost:8080/registerCompany",
            newRegisteredCompany
        );
    },[registerFlag])

    const clickDecisionCompany=(data:any)=>{
        setRegisteredCompanies([...registeredCompanies,{
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
        setRegisteredCompanies(
            registeredCompanies
            .filter((item)=>item.registerId!==registerId)
        )
    }
    useEffectCustom(()=>{
        deleteData(
            "http://localhost:8080/deleteRegisterId",
            {
                userId:userId,
                deleteRegisterId:deleteId
            }
        );
    },[deleteFlag])

    const [changeCompany,toggleChangeCompany]=useReducer(changeCompany=>!changeCompany,false);
    const changeRegisteredCompany=(data:any,registerId:string)=>{
        setRegisteredCompanies(
            registeredCompanies.map((company)=>{
                if(company.registerId===registerId){
                    return (
                        {
                            registerId:registerId,
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
                        }
                    )
                }else{
                    return company;
                }
            })
        )
        toggleChangeCompany();
    }

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
                        {registerLabel:"名前",register:register("userName"),defaultValue:userName},
                        {registerLabel:"アピール",register:register("profileAppeal"),defaultValue:profileAppeal},
                        {registerLabel:"メモ",register:register("profileMemo"),defaultValue:profileMemo},
                    ]}
                    onSubmit={handleSubmit(clickDecisionProfile)}
                />
            )}

            {content===1&&(
                <ListItemArea
                    registeredCompanies={registeredCompanies}
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


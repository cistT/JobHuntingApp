import { Button, styled } from "@mui/material";
import { VFC } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import RegisterProfileItem from "./RegisterProfileItem"

export const RegisterProfileForm:VFC<{
    registerProfile:{
        profileLabel: string;
        register: UseFormRegisterReturn;
    }[],
    onSubmit:()=>void,
}>=({registerProfile,onSubmit})=>{

    return (
    <>

        <form onSubmit={onSubmit}>
            {registerProfile.map((item)=>(
                <RegisterProfileItem
                    label={item.profileLabel}
                    register={item.register}
                    key={item.profileLabel}
                />))
            }
            <Button type="submit">送信</Button>
        </form>

    </>)
}
//Grid API
//https://mui.com/api/grid/

// TextField API
// https://mui.com/api/text-profileLabel/

// Button API
// https://mui.com/api/button/

//Tooltip API
//https://mui.com/api/tooltip/
import { VFC } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import RegisterProfileItem from "./RegisterProfileItem"

export const RegisterProfileForm:VFC<{
    profileLabels:string[],
    onSubmit:()=>void,
    register:UseFormRegisterReturn[],
}>=({profileLabels,onSubmit,register})=>{

    return (
    <>

        <form onSubmit={onSubmit}>
            {profileLabels.map((label,i)=>
                    <RegisterProfileItem
                        label={label}
                        register={register[i]}
                        key={i}
                    />
              
            )}
            <input type="submit" />
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
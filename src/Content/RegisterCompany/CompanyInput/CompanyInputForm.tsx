import { VFC } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import InputField from "./InputField"



const CompanyInputForm:VFC<{
    labels:string[],
    register:UseFormRegisterReturn[],
    onSubmit:()=>void

}>=({labels,register,onSubmit})=>{

    return (
        <form onSubmit={onSubmit}>
            {
                labels.map((label,i)=>{
                    return (
                        <div key={label}>
                            <InputField
                                label={label}
                                register={register[i]}
                         />
                        </div>
                    )
                })
            }
            <div style={{display:"flex",justifyContent:"center"}}>
              <input type="submit" style={{justifyContent: 'center'}}/>
            </div>
            
        </form>
    )
}

export default CompanyInputForm;
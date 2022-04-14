import { useState, VFC } from "react"
import { useFieldArray, useForm } from "react-hook-form";


const InputTest:VFC<{}>=()=>{

    const {register,handleSubmit,control,}=useForm({defaultValues:{
        name:"",
        input:""
       }});
       const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: "demo"
    });
    const [datas,setDatas]=useState<string[]>([]);
    const onSubmit=(data:any)=>{
        setDatas([data.input])
        
    }
    return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register(`input`)} />
        <input {...register("input")} />
        <input {...register("input")} />
            <button type='submit' onClick={()=>window.alert(datas)}>sousin</button>
        </form>
    </>
    )
}

export default InputTest;
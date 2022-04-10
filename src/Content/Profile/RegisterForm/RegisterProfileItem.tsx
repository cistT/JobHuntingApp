import {TextField, Tooltip, Typography } from "@mui/material"
import { VFC } from "react"
import { UseFormRegisterReturn } from "react-hook-form"


const RegistrationProfileItem:VFC<{
    label:string,
    register:UseFormRegisterReturn,
}>=({
    label,register
})=>{

    return (
    <div>
        <Typography gutterBottom variant="h5" component="div">
                {label}
            </Typography>
            <Tooltip
                title="自由に記入することができます"
                placement="top-start"
                arrow
            >
                <TextField
                    multiline
                    margin="normal"
                    {...register}
                    placeholder={`${label}を入力してください(任意)`}
                    style={{width:"90vw",height:"100px"}}
                    fullWidth
                    rows={4}
                />
            </Tooltip>
    </div>
    )
}

export default RegistrationProfileItem;


//Text Field Demo
//https://mui.com/components/text-fields/
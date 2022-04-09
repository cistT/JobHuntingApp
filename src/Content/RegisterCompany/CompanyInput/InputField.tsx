import { Box, TextField, Tooltip, Typography } from "@mui/material"
import { VFC } from "react"
import { UseFormRegisterReturn } from "react-hook-form";


const InputField:VFC<{
    label:string,
    register: UseFormRegisterReturn
}>=({label,register})=>{

    return(
        <>
            <Box>
            <Box sx={{ my: 3, mx: 2 }}>
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
                    placeholder={`${label}を入力してください(任意)`}
                    style={{width:"90vw",height:"100px"}}
                    {...register}
                    rows={4}
                />
            </Tooltip>
            </Box>
            </Box>

{/* 
            <h1>{label}</h1>
            <Tooltip
                title="自由に記入することができます"
                placement="top-start"
                arrow
                >
                <TextField 
                    multiline
                    margin="normal"
                    placeholder={`${label}を入力してください(任意)`}
                    style={{width:"90vw",height:"100px"}}
                    {...register}
                />
            </Tooltip> */}
            
        </>
    )
}

export default InputField;
import { VFC } from "react"
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { UseFormRegisterReturn } from 'react-hook-form';


const NewRegistration:VFC<{
    registerForm:{
        title: string,
        register: UseFormRegisterReturn,
    }[]
    handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}>=({
    registerForm,
    handleSubmit
})=>{
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0',marginTop:"20px"}
    return (
    <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                     {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                    <h2>新規登録</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    {
                        registerForm.map((reg,i)=>
                            <TextField
                                key={i}
                                label={reg.title}
                                placeholder={`${reg.title} を入力してください`}
                                {...reg.register}
                                fullWidth
                                required
                            />
                        )
                    }
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        新規登録
                    </Button>

                </form>
            </Paper>
        </Grid>
    </>
    )
}

export default NewRegistration;
import React, { VFC } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Card } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { UseFormRegisterReturn } from 'react-hook-form';

const Login:VFC<{
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
    const btnstyle={margin:'8px 0'}
    return(
        <Grid  >
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                     {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                    <h2>ログイン</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    {
                        registerForm.map((reg,i)=>
                            <TextField
                                key={reg.title}
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
                        fullWidth>
                            Sign in
                    </Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Login;

// ログイン画面は
// https://github.com/vikas62081/YT/tree/loginPage 参考
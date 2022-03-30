import { VFC } from "react";
import {AppBar, Button, Toolbar} from '@mui/material';
import styled from "@emotion/styled";


const MyStyleAppBar=styled(AppBar)({
    height:"60px",
    width:"100vw"
})

const MyStyleToolbar=styled(Toolbar)({
    display:"flex",
    height:"60px",
    width:"100vw",
    justifyContent:"space-between"
})

const MyStyleButton=styled(Button)({
    height:"60px",
    width:"100%",
    // border:"blue solid"
})


export const  Header:VFC<{
    appTitle?:string,
    login?:boolean,
    setLogin:React.Dispatch<React.SetStateAction<boolean>>,
    openLogin?:()=>void,
    openNewRegistration?:()=>void,
}>=({
    appTitle="デモアプリ",
    login=false,
    setLogin,
    openLogin=()=>undefined,
    openNewRegistration=()=>undefined,
})=>{

    return(
        <div style={{height:"100px"}}>
            <MyStyleAppBar>
                <MyStyleToolbar>
                    {/* タイトルを切り分けたほうがいいかもしれない */}
                    <div style={{display: 'flex',marginLeft:"10px"}}>
                        <h1>{appTitle}</h1>
                    </div>
                    {/* ログアウトorログイン+新規登録を切り分けたほうがいいかもしれない */}
                    <div style={{display: 'flex',marginRight:"5%"}}>
                        {login?
                            <MyStyleButton
                                onClick={()=>setLogin(false)}
                                variant="contained" >
                                    ログアウト
                            </MyStyleButton>:
                            <>
                                <MyStyleButton
                                    variant="contained"
                                    onClick={openNewRegistration}>
                                        新規登録
                                </MyStyleButton>
                                <MyStyleButton
                                    onClick={openLogin}
                                    variant="contained">
                                        ログイン
                                </MyStyleButton>
                            </>}
                    </div>
                </MyStyleToolbar>
            </MyStyleAppBar>
        </div>
    )
}
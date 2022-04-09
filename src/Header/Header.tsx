import { VFC } from "react";
import {AppBar, Button, ButtonGroup, Toolbar} from '@mui/material';
import styled from "@emotion/styled";
import AppTitle from "./Title/AppTitle";

// const MyStyleAppArea=styled("div")({
//     height:'80px',
// })

const MyStyleAppBar=styled(AppBar)({
    height:'60px',
    backGroundColor:'white'
})

const MyStyleToolbar=styled(Toolbar)({
    height:'60px',
    width:'100vw',
    justifyContent:'space-between',
})

const MyStyleButtonGroup = styled(ButtonGroup)({
    paddingRight:'5%',
})

const MyStyleButton=styled(Button)({
    color:"primal",
    height:'60px',
    width:'100px',
})

const Header:VFC<{
    appTitle?:string,
    isLogin?:boolean,
    logout:()=>void,
    openLoginScreen:()=>void,
    openNewRegistration?:()=>void,
}>=({
    appTitle="デモアプリ",
    isLogin=false,
    openLoginScreen,
    logout,
    openNewRegistration=()=>undefined,
})=>{

    return(
        <div style={{height:"80px"}}>
            <MyStyleAppBar sx={{bgcolor:"white"}}>
                <MyStyleToolbar>
                    <AppTitle appTitle={appTitle} />
                        {isLogin?(
                            <MyStyleButtonGroup
                                variant="text"
                                aria-label="text button group"
                            >
                                <MyStyleButton onClick={logout}>
                                    ログアウト
                                </MyStyleButton>
                            </MyStyleButtonGroup>
                        ):(
                            <MyStyleButtonGroup
                                variant="text"
                                aria-label="text button group"
                            >
                                <MyStyleButton
                                    onClick={openNewRegistration}>
                                        新規登録
                                </MyStyleButton>
                                <MyStyleButton
                                    onClick={openLoginScreen}
                                    >
                                        ログイン
                                </MyStyleButton>
                            </MyStyleButtonGroup>
                        )}
                </MyStyleToolbar>
            </MyStyleAppBar>
        </div>
    )
}

export default Header;
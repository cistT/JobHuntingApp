import { Button, styled } from "@mui/material";
import { VFC } from "react";

const MenuBarGroup=styled("div")({
    display:"flex",
    justifyContent:"space-between",
    margin:"10px 5px"
})

const MenuBarButton=styled(Button)({
    height:"50px",
    width:"100%",
    justifyContent:"center",
    margin:"5px",
    border:"1px solid blue"
});

const MenuBar:VFC<{
    loginMenuBarLabel:string[],
    selectFocusPage:(i:number)=>void
}>= ({loginMenuBarLabel,selectFocusPage})=>{
    return (
        <MenuBarGroup>
            {loginMenuBarLabel.map((label,i)=>
                <MenuBarButton
                    onClick={()=>selectFocusPage(i)}
                    key={label}>
                        {label}
                </MenuBarButton>)}
        </MenuBarGroup>
    )
}

export  default MenuBar;
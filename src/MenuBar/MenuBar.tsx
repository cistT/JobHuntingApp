import { Button, ButtonGroup, styled } from "@mui/material";
import { VFC } from "react";

const MystyleButtonGroup=styled(ButtonGroup)({
    display:'flex',
    justifyContent:'space-between',
    margin:'10px 5px'
})

const MenuBarButton=styled(Button)({
    height:'50px',
    width:'100%',
    justifyContent:'center',
    margin:'5px',
    border:'1px solid blue'
});

const MenuBar:VFC<{
    menuBarLabel:string[],
    focusContent:(i:number)=>void
}>= ({menuBarLabel,focusContent})=>{
    return (
        <MystyleButtonGroup variant="outlined" aria-label="outlined button group">
            {menuBarLabel.map((label,i)=>(
                <MenuBarButton
                    onClick={()=>focusContent(i)}
                    key={label}
                >
                        {label}
                </MenuBarButton>
            ))}
        </MystyleButtonGroup>
    )
}

export  default MenuBar;


//Button group Demo
//https://mui.com/components/button-group/

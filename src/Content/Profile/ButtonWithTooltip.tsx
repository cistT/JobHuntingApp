import { IconButton, styled, Tooltip } from "@mui/material";
import { VFC } from "react";

const buttonSize='60px';

const MyStyledButton=styled(IconButton)({
    height:buttonSize,
    width:buttonSize,
})

const ButtonWithTooltip:VFC<{
    title:string,
    iconButton:any,
    onClick:()=>void
}>=({title,iconButton,onClick})=>{

    return (
        <Tooltip
            title={title}
            placement="right"
            arrow
        >
            <MyStyledButton onClick={onClick}>
                {iconButton}
            </MyStyledButton>
        </Tooltip>
    )

}

export default ButtonWithTooltip;
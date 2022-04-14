import { IconButton, styled, Tooltip } from "@mui/material";
import { VFC } from "react"
import EditIcon from '@mui/icons-material/Edit';

const buttonSize='60px';

const MyStyledButton=styled(IconButton)({
    height:buttonSize,
    width:buttonSize,
})


const RewriteButton:VFC<{
    handleClickOpen:()=>void
}>=({handleClickOpen})=>{


    return (
    <>
         <Tooltip
            title="編集"
            placement="right"
            arrow
        >
            <MyStyledButton onClick={handleClickOpen} >
                <EditIcon />
            </MyStyledButton>
        </Tooltip>
    </>
    )
}

export default RewriteButton;
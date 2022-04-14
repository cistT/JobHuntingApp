import { Button } from "@mui/material";
import { VFC } from "react";


const SaveButton:VFC<{
    handleClose:()=>void
}>=({handleClose})=>{


    return (
    <>
         <Button
            autoFocus
            color="inherit"
            onClick={handleClose}
            type="submit"
        >
            保存
        </Button>
    </>
    )
}
export default SaveButton;
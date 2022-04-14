import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { VFC } from "react"


const CloseButton:VFC<{
    handleClose:()=>void
}>=({handleClose})=>{


    return (
    <>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
    </>
    )
}

export default CloseButton;
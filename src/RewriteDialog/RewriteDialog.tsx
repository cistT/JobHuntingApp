import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Slide, styled, Toolbar, Tooltip, Typography } from "@mui/material";
import { forwardRef, useState, VFC } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Transition from "./Transition";
import RewriteButton from "./RewriteDialogButtons/RewriteButton";
import CloseButton from "./RewriteDialogButtons/CloseButton";
import SaveButton from "./RewriteDialogButtons/SaveButton";
import { UseFormRegisterReturn } from "react-hook-form";


const RewriteDialog:VFC<{
  onSubmit:(e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
  registerObj:{
    registerLabel: string;
    register: UseFormRegisterReturn;
    defaultValue:string
}[],
}>=({onSubmit,registerObj})=> {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
    <>
    <div>
      <RewriteButton handleClickOpen={handleClickOpen} />

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={onSubmit}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <CloseButton handleClose={handleClose} />
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                編集
              </Typography>
              <SaveButton handleClose={handleClose} />
            </Toolbar>
          </AppBar>
          <List>
            {
              registerObj.map((reg)=>{
                return (
                  <div key={reg.registerLabel}>
                    <ListItem style={{display: 'inline-block'}}>
                      <ListItemText
                        primary={reg.registerLabel}
                        // secondary="Titania"
                      />
                      <input
                        defaultValue={reg.defaultValue}
                        {...reg.register}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                )
              })
            }
          </List>
        </form>
      </Dialog>
    </div>
    </>
    )
}

export default RewriteDialog;
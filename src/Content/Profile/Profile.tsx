import { useReducer, VFC } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { RegistrationProfile } from "./RegistrationProfile";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";
import { Typography } from "@mui/material";
import RewriteDialog from "../../RewriteDialog/RewriteDialog";



const ProfileErea=styled("div")({
    height:'70vh',
    width:'100vh',
})

const Profile:VFC<{
    profile: {profileLabel:string,prfileInformation:string}[],
    onSubmit:(e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
    registerProfile:{
        registerLabel: string;
        register: UseFormRegisterReturn;
        defaultValue:string;
    }[],
   
}>=({profile,onSubmit,registerProfile})=>{

    return (
        <ProfileErea>
            <Typography gutterBottom variant="h5" component="div">
                プロフィール
            </Typography>
            <RewriteDialog
                onSubmit={onSubmit}
                registerObj={registerProfile}
            />

            <>
                {profile.map((item)=>(
                    <RegistrationProfile
                        profileLabel={item.profileLabel}
                        fieldValue={item.prfileInformation}
                        key={item.profileLabel}
                    />))
                }
            </>

        </ProfileErea>
    )
}

export default Profile;


// const MyStyleEditIcon=styled(EditIcon)({
//     height:'60px',
//     width:'60px',
// })

// const MyStyleArrowBackIcon=styled(ArrowBackIcon)({
//     height:'60px',
//     width:'60px',
// })



//    const [isRewritable,toggleRewritable]=useReducer(isRewritable=>!isRewritable,false);


//  {/* {isRewritable?(
//                     <ButtonWithTooltip
//                         title="プロフィール一覧に戻ります"
//                         iconButton={<MyStyleArrowBackIcon />}
//                         onClick={toggleRewritable}
//                      />):(
//                     <ButtonWithTooltip
//                         title="プロフィールの編集をすることができます"
//                         iconButton={<MyStyleEditIcon />}
//                         onClick={toggleRewritable}
//                     />)
//                 } */}


                
//             {/* {isRewritable?(
//                 <RegisterProfileForm
//                     registerProfile={registerProfile}
//                     onSubmit={onSubmit}
//                 />):(
//                 <>
//                     {profile.map((item)=>(
//                         <RegistrationProfile
//                             profileLabel={item.profileLabel}
//                             fieldValue={item.prfileInformation}
//                             key={item.profileLabel}
//                         />))
//                     }
//                 </>)
//             } */}

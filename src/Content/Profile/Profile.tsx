import { useReducer, VFC } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { RegistrationProfile } from "./RegistrationProfile";
import { RegisterProfileForm } from "./RegisterForm/RegisterProfileForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from "@emotion/styled";
import ButtonWithTooltip from "./ButtonWithTooltip";
import { UseFormRegisterReturn } from "react-hook-form";
import { Typography } from "@mui/material";

const MyStyleEditIcon=styled(EditIcon)({
    height:'60px',
    width:'60px',
})

const MyStyleArrowBackIcon=styled(ArrowBackIcon)({
    height:'60px',
    width:'60px',
})

const ProfileErea=styled("div")({
    height:'70vh',
    width:'100vh',
})

const Profile:VFC<{
    profile: {profileLabel:string,prfileInformation:string}[],
    onSubmit:(e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
    registerProfile:{
        profileLabel: string;
        register: UseFormRegisterReturn;
    }[],
   
}>=({profile,onSubmit,registerProfile})=>{

    const [isRewritable,toggleRewritable]=useReducer(isRewritable=>!isRewritable,false);

    return (
        <ProfileErea>
                <Typography gutterBottom variant="h5" component="div">
                    プロフィール
                </Typography>
                {isRewritable?(
                    <ButtonWithTooltip
                        title="プロフィール一覧に戻ります"
                        iconButton={<MyStyleArrowBackIcon />}
                        onClick={toggleRewritable}
                     />):(
                    <ButtonWithTooltip
                        title="プロフィールの編集をすることができます"
                        iconButton={<MyStyleEditIcon />}
                        onClick={toggleRewritable}
                    />)
                }

            {isRewritable?(
                <RegisterProfileForm
                    registerProfile={registerProfile}
                    onSubmit={onSubmit}
                />):(
                <>
                    {profile.map((item)=>(
                        <RegistrationProfile
                            profileLabel={item.profileLabel}
                            fieldValue={item.prfileInformation}
                            key={item.profileLabel}
                        />))
                    }
                </>)
            }
        </ProfileErea>
    )
}

export default Profile;
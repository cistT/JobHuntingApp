import {Header} from './Header/Header'
import LoginContent from './Content/LoginContent';
import { useReducer,useState, VFC } from 'react';
import MenuBar from './MenuBar/MenuBar';
import { useForm } from 'react-hook-form';
import Login from './Login';
import NewRegistration from './NewRegistration';
import useEffectCustom from './CustomHook/useEffectCustom';

const App:VFC<{}>=()=> {

  //ログイン状態かどうか
  const [login,setLogin]=useState(false);

  //ログイン画面を表示するかどうか
  const [loginScreen,setLoginScreen]=useState(false);
  //新規画面を登録するかどうか
  const [newRegistrationScreen,setNewRegistrationScreen]=useState(false);

  const openLogin=()=>{
    newRegistrationScreen&&setNewRegistrationScreen(false);
    loginScreen?setLoginScreen(false):setLoginScreen(true);
  }

  const openNewRegistration=()=>{
    loginScreen&&setLoginScreen(false);
    newRegistrationScreen?setNewRegistrationScreen(false):setNewRegistrationScreen(true);
  }

  //ログイン用
  const [id,setId]=useState("");
  const [password,setPassword]=useState("");
  const [userId,setUserId]=useState("");

  const {register,handleSubmit}=useForm({defaultValues:{
    id:"",
    password:"",
    newId:"",
    newPassword:"",
    newUserName:"",
   }});
  const onSubmitLogin =(data:any)=>{
    setId(data.id);
    setPassword(data.password);
  }
  useEffectCustom(()=>{
    //要改善 ログインできなかった時の処理を書く必要がある
    //初回レンダリング時に動作が発生してしまう
    //ログイン画面で入力したid及びパスワードを基に、
    //該当ユーザーの情報を取得するためのuserIdを取得する
    (async ()=>{
        const res=await fetch(`http://localhost:8080/User/Login/id=${id}password=${password}`);
        const json=await res.json();
        setUserId(json.userId||null);
        json.userId&&setLoginScreen(false);
        json.userId&&setNewRegistrationScreen(false);
        //json.userId&&reset();
        json.userId&&setLogin(true);
    })()
   },[password])

   //新規登録用
   const [newId,setNewId]=useState("");
   const [newPassword,setNewPassword]=useState("");
   const [newUserName,setNewUserName]=useState("");
   const [play,toggolePlay]=useReducer(play=>!play,false);

   const onSubmitNewRegistration = (data:any)=>{
      setNewId(data.newId);
      setNewPassword(data.newPassword);
      setNewUserName(data.newUserName);
      window.alert("新規登録ありがとう！");
      toggolePlay();
   }
   useEffectCustom(()=>{
    (async ()=>{
      const url = "http://localhost:8080/NewUser";
      const response =fetch(url,{
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
            },
          body:JSON.stringify({
              id:newId,
              password:newPassword
          })
          })})();
    (async ()=>{
      const res=await fetch(`http://localhost:8080/User/Login/id=${newId}password=${newPassword}`);
      const json=await res.json();
      setUserId(json.userId||null);
      json.userId&&setLoginScreen(false);
      json.userId&&setNewRegistrationScreen(false);
      //json.userId&&reset();
      json.userId&&setLogin(true);
  })();
  },[play]);
  

   //変数名を変更したほうがいいかもしれない
  const [content,setContent]=useState(0);
  const loginMenuBarLabel=["プロフィール","一覧","登録"];
  const selectFocusPage=(i:number)=>{
    setContent(i);
  }

  return (
    <>
    <div style={{height: "100"}}>
    <Header
        appTitle="就活管理サイト"
        login={login}
        setLogin={setLogin}
        openLogin={openLogin}
        openNewRegistration={openNewRegistration}
      />
    </div>
    

        {newRegistrationScreen&&<NewRegistration
        registerForm={[
          {title:"新しいID(変更不可)",register:register("newId")},
          {title:"新しいパスワード(変更不可)",register:register("newPassword")},
          {title:"ユーザーネーム",register:register("newUserName")},
        ]}
        handleSubmit={handleSubmit(onSubmitNewRegistration)}
         />}
      

      {
        loginScreen&&<Login
        registerForm={[
          {title:"id",register:register("id")},
          {title:"password",register:register("password")}
        ]}
        handleSubmit={handleSubmit(onSubmitLogin)}
      />
      }
    

      {/* ログアウト状態の時の画面を作成する必要がある */}
      {login&&userId&&
        <>
          <MenuBar
            loginMenuBarLabel={loginMenuBarLabel}
            selectFocusPage={selectFocusPage}
          />
          <LoginContent
            userId={userId}
            content={content}
          />
        </>
      }
    </>
  );
}

export default App;

































// useEffect(()=>{
//   if(renderFlgRef.current){
//   (async ()=>{
//     const url = "http://localhost:8080/NewUser";
//     const response =fetch(url,{
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//           },
//         body:JSON.stringify({
//             id:newId,
//             password:newPassword
//         })
//         })})();
//   (async ()=>{
//     const res=await fetch(`http://localhost:8080/User/Login/id=${newId}password=${newPassword}`);
//     const json=await res.json();
//     setUserId(json.userId||null);
//     json.userId&&setLoginScreen(false);
//     json.userId&&setNewRegistrationScreen(false);
//     json.userId&&reset();
//     json.userId&&setLogin(true);
// })();
// }else{
// renderFlgRef.current = true;
// }

//  },[play])
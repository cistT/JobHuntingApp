import Header from './Header/Header'
import LoginContent from './Content/LoginContent';
import { useReducer,useState, VFC } from 'react';
import MenuBar from './MenuBar/MenuBar';
import { useForm } from 'react-hook-form';
import Login from './Login/Login';
import NewRegistration from './NewRegistration/NewRegistration';
import useEffectCustom from './CustomHook/useEffectCustom';

const App:VFC<{}>=()=> {

  const [isLogin,setIsLogin]=useState(false);
  const [isLoginScreen,setIsLoginScreen]=useState(false);
  const [isNewRegistrationScreen,setIsNewRegistrationScreen]=useState(false);

  const openLoginScreen=()=>{
    isNewRegistrationScreen&&setIsNewRegistrationScreen(false);
    isLoginScreen?setIsLoginScreen(false):setIsLoginScreen(true);
  }

  const openNewRegistration=()=>{
    isLoginScreen&&setIsLoginScreen(false);
    isNewRegistrationScreen?setIsNewRegistrationScreen(false):setIsNewRegistrationScreen(true);
  }

  const logout=()=>{
    setIsLogin(false);
  }

  const [id,setId]=useState("");
  const [password,setPassword]=useState("");
  const [userId,setUserId]=useState("");

  const {register,handleSubmit}=useForm<{
    id:string,
    password:string,
    newId:string,
    newPassword:string
  }>({defaultValues:{
    id:"",
    password:"",
    newId:"",
    newPassword:"",
   }});

  //ToDo 変数名を変える必要がある
  //ログイン画面の送信ボタンを押したときの処理
  //ログイン画面に入力されたデータを保存
  const loginInput =(data:{id:string,password:string})=>{
    setId(data.id);
    setPassword(data.password);
  }

  const loginProcess=()=>{
    setIsLoginScreen(false);
    setIsNewRegistrationScreen(false);
    setIsLogin(true);
  }

  useEffectCustom(()=>{
    //ToDo ログインできなかった時の処理を書く必要がある
    (async ()=>{
        const res=await fetch(`${process.env.REACT_APP_CONNECT_DB}/User/Login/id=${id}password=${password}`);
        const json=await res.json();
        setUserId(json.userId||null);
        json.userId&&loginProcess();
    })()
   },[password])

   //新規登録用
   const [newId,setNewId]=useState("");
   const [newPassword,setNewPassword]=useState("");
   const [play,toggolePlay]=useReducer(play=>!play,false);

   const onSubmitNewRegistration = (data:{newId:string,newPassword:string})=>{
      setNewId(data.newId);
      setNewPassword(data.newPassword);
      window.alert("新規登録ありがとう！");
      toggolePlay();
   }

   const newRegistrationProcess=()=>{
    setIsLoginScreen(false);
    setIsNewRegistrationScreen(false);
    setIsLogin(true);
   }

   useEffectCustom(()=>{
     //要改善
     //新規登録したときの処理
     //DBに新しいパスワードとユーザーIDを登録
    (async ()=>{
      const url = `${process.env.REACT_APP_CONNECT_DB}/NewUser`;
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
      const res=await fetch(`${process.env.REACT_APP_CONNECT_DB}/User/Login/id=${newId}password=${newPassword}`);
      const json=await res.json();
      setUserId(json.userId||null);
      json.userId&&newRegistrationProcess();
  })();
  },[play]);
  

  //変数名を変更したほうがいいかもしれない
  //メニュー選択画面
  const [content,setContent]=useState(0);
  const menuBarLabel=["プロフィール","一覧","登録"];
  const focusContent=(i:number)=>{
    setContent(i);
  }

  return (
    <>
      <Header
        appTitle="就活管理サイト"
        isLogin={isLogin}
        openLoginScreen={openLoginScreen}
        openNewRegistration={openNewRegistration}
        logout={logout}
      />

      {isNewRegistrationScreen&&(
        <NewRegistration
          registerForm={[
            {title:"新しいID(変更不可)",register:register("newId")},
            {title:"新しいパスワード(変更不可)",register:register("newPassword")},
          ]}
          handleSubmit={handleSubmit(onSubmitNewRegistration)}
        />
      )}

      {isLoginScreen&&(
        <Login
          registerForm={[
            {title:"id",register:register("id")},
            {title:"password",register:register("password")}
          ]}
          handleSubmit={handleSubmit(loginInput)}
        />
      )}

      {/*ToDo ログアウト状態の時の画面を作成する必要がある */}
      {isLogin&&(
        <>
          <MenuBar
            menuBarLabel={menuBarLabel}
            focusContent={focusContent}
          />
          <LoginContent
            userId={userId}
            content={content}
          />
        </>
      )}
    </>
  );
}

export default App;

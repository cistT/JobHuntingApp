import {Header} from './Header/Header'
import LoginContent from './Content/LoginContent';
import { useReducer, useState, VFC } from 'react';
import MenuBar from './MenuBar/MenuBar';

const App:VFC<{}>=()=> {

  const [isLoggedIn,toggleLogin]=useReducer(login=>!login,false);
  //変数名を変更したほうがいいかもしれない
  const [content,setContent]=useState(0);
  const loginMenuBarLabel=["プロフィール","一覧","登録"];
  return (
    <>
      <Header
        appTitle="就活管理サイト"
        isLoggedIn={isLoggedIn}
        clickIsLoggedInButton={toggleLogin}
      />

      {/* ログアウト状態の時の画面を作成する必要がある */}
      {isLoggedIn&&
        <>
          <MenuBar
            loginMenuBarLabel={loginMenuBarLabel}
            selectFocusPage={setContent}
          />
          <LoginContent
            content={content}
          />
        </>
      }
    </>
  );
}

export default App;

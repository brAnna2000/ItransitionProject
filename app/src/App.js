import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import { AdminPage, AuthPage, CreateReview, MainPage, TagPage, UserPage, View } from './pages';

function App() {
  const [name, setName] = useState("Катя");
  const [password, setPassword] = useState("1604april");
  const [data, setData] = useState(null);
  const [back, setBack] = useState(true);
  const [theme, setTheme] = useState('dark')

  const Send=()=>{
    let enter = {
      username: name,
      password: password
    }
    enter = JSON.stringify(enter)
    fetch('/auth/login',{
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      mode: 'same-origin',
      body: enter
    }).then(res =>{
        if(res.url.indexOf('/userpage/')==-1){
          alert('Неправильное имя или пароль')
        }
        else{
          window.location.href = res.url
        }
      }
    )
  }

  useEffect(() => {
    if(back==true){
      setTheme('dark')
    }
    else{
      setTheme('light')
    }  
  },[back])
  const Click=()=>{
    setBack(!back)
  }

const routes = useRoutes(true);
  return (
    <Router>
      <div className={theme}>
        <header>
        {back == true ? <i className="fas fa-sun" onClick={()=>{Click()}}></i> : <i className="fas fa-moon" onClick={()=>{Click()}}></i>}
          {routes}
          <div>
            <div><label htmlFor="name">Имя123</label><input id="name" type="text" onChange={(event)=>{setName(event.target.value)}} value={name}/></div>
            <div><label htmlFor="name">Пароль</label><input id="name" type="text" onChange={(event)=>{setPassword(event.target.value)}} value={password}/></div>
            <button onClick={()=>{Send()}}>Авторизация</button>
          </div>
        </header>
    </div>
    </Router>
  );
}

export default App;

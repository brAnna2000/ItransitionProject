import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes'

function App() {
  const [name, setName] = useState("Катя");
  const [password, setPassword] = useState("1604april");
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
      if(res.redirected){
        // alert(res.url)
        console.log(res)
        window.location.href = res.url;
      }
    })
  }
const routes = useRoutes(true);
  return (
    <Router>
      <div className="App">
        <header>
          {routes}
          <div>
            <div><label htmlFor="name">Имя</label><input id="name" type="text" onChange={(event)=>{setName(event.target.value)}} value={name}/></div>
            <div><label htmlFor="name">Пароль</label><input id="name" type="text" onChange={(event)=>{setPassword(event.target.value)}} value={password}/></div>
            <button onClick={()=>{Send()}}>Авторизация</button>
          </div>
        </header>
    </div>
    </Router>
  );
}

export default App;
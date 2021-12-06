import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

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
          localStorage.setItem('loggedIn', true)
          window.location.href = res.url
        }
      }
    )
  }

  const Exit=()=>{
    localStorage.removeItem('loggedIn')
    if(localStorage.getItem('loggedIn')===null){
      window.location.href = '/'
    }
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
          {localStorage.getItem('loggedIn') ? <button onClick={()=>{Exit()}} type="button" className="btn btn-primary">Выйти</button> :
          <div className='authorization'>
            <div className="input-group mb-3">
              <span className="input-group-text">Имя</span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(event)=>{setName(event.target.value)}} value={name}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Пароль</span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(event)=>{setPassword(event.target.value)}} value={password}/>
            </div>
            <button onClick={()=>{Send()}} type="button" className="btn btn-primary">Войти</button>
          </div>
          }
        </header>
        {routes}
    </div>
    </Router>
  );
}

export default App;
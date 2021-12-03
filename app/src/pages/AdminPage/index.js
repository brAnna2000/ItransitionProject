import './AdminPage.css';
import logo from '../../logo.svg';
import React, {useState, useEffect} from 'react';
import UsersPages from '../../components/UsersPages/index'

function AdminPage(props){ 
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/adminpage')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
  console.log(data)
  return (
    <div className="App">
      {!data ? "Loading..." :
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <UsersPages names={data}/>
      </header>
      }
  </div>
  );
}

export default AdminPage;
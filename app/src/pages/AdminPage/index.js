import './AdminPage.css';
import React, {useState, useEffect} from 'react';
import UsersPages from '../../components/UsersPages/index'
import Loader from '../../components/Loader/index';

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
      {!data ? <Loader/> :
      <div>
        <UsersPages names={data}/>
      </div>
      }
  </div>
  );
}

export default AdminPage;
import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
  console.log(data)
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <div className='review'>
          <span className='reviewName'>{ !data ? "Loading...": data.name}</span>
          <span>#{ !data ? "Loading...": data.group}</span>
          <span>{ !data ? "Loading...": data.tags}</span> 
          <p>{ !data ? "Loading...": data.grade}</p> 
          <p>{ !data ? "Loading...": data.text}</p>
          <div>Картинки</div><span>Лайки</span>
        </div>
      </header>
    </div>
  );
}

export default App;
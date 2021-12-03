import './MainPage.css';
import logo from '../../logo.svg';
import React, {useState, useEffect} from 'react';
import TagsCloud from '../../components/TagsCloud/index';

function MainPage(props){ 
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/mainpage')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
  // console.log(data)
  let a = '';
  if(data !== null){
    a=data[0]
  }
    return (
      <div className="App">
        {!data ? "Loading..." :
        <header>
         <img src={logo} className="App-logo" alt="logo" />
          <TagsCloud names={a}/>
          <div className='review'>
            Самый популярный обзор
            <span className='reviewName'>{data[1].name}</span>
            <span>#{data[1].tags}</span>
            <span>{data[1].group}</span> 
            <p>{data[1].grade}</p> 
            <p>{data[1].text}</p>
            <div>Картинки</div><span>{data[1].likes}</span>
          </div>
          <div className='review'>
            Последний обзор
            <span className='reviewName'>{data[2].name}</span>
            <span>#{data[2].tags}</span>
            <span>{data[2].group}</span> 
            <p>{data[2].grade}</p> 
            <p>{data[2].text}</p>
            <div>Картинки</div><span>{data[2].likes}</span>
          </div>
        </header>
        }
    </div>
    );
}

export default MainPage;
import './MainPage.css';
import logo from '../../logo.svg';
import React, {useState, useEffect} from 'react';
import TagsCloud from '../../components/TagsCloud/index';
import Stars from '../../components/Stars/index';
import Loader from '../../components/Loader/index';
import Search from '../../components/Search/index';

function MainPage(props){ 
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/mainpage')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
  let a = '';
  if(data !== null){
    a=data[0]
  }
console.log(data)
  return (
    <div className="App">
      {!data ? <Loader/> :
      <header>
        <TagsCloud names={a}/>
        <Search reviews={data[1]}/>
        <p className='reviewP'>Самый популярный обзор</p>
        <div className='review'>
          <span className='reviewName'>{data[1].name}</span>
          {data[1].tags ? <span>#{data[1].tags}</span>: <span></span>}
          <span>{data[1].group}</span> 
          <Stars grade = {data[1].grade}/>
          <p>{data[1].text}</p>
          <div>Картинки</div><span>{data[1].likes}</span>
        </div>
        <p className='reviewP'>Последний обзор</p>
        <div className='review'>
          <span className='reviewName'>{data[2].name}</span>
          {data[2].tags ? <span>#{data[2].tags}</span>: <span></span>}
          <span>{data[2].group}</span> 
          <Stars grade = {data[2].grade}/>
          <p>{data[2].text}</p>
          <div>Картинки</div><span>{data[2].likes}</span>
        </div>
      </header>
      }
  </div>
  );
}

export default MainPage;
import './MainPage.css';
import React, {useState, useEffect} from 'react';
import TagsCloud from '../../components/TagsCloud/index';
import Loader from '../../components/Loader/index';
import Search from '../../components/Search/index';
import Reviews from '../../components/Reviews/index';

function MainPage(props){ 
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/mainpage')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
console.log(data)
  return (
    <div className="App">
      {!data ? <Loader/> :
      <div>
        <TagsCloud tagsNames={data[0]}/>
        <Search reviews={data[1]}/>
        <p className='reviewP'>Самый популярный обзор</p>
        <Reviews data={data[1]}/>
        <p className='reviewP'>Последний обзор</p>
        <Reviews data={data[2]}/>
      </div>
      }
  </div>
  );
}

export default MainPage;
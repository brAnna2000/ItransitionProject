import './TagPage.css';
import React, {useState, useEffect} from 'react';
// import Stars from '../../components/Stars/index';
import Loader from '../../components/Loader/index';
import Reviews from '../../components/Reviews/index';

function TagPage(props){ 
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/tagpage'+window.location.search)
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
  console.log(data)
  return (
    <div className="App">
      {!data ? <Loader/> :
      <div>
        {data.map((review) =><Reviews data={review}/>)}
      </div>
      }
  </div>
  );
}

export default TagPage;
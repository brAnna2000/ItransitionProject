import './TagPage.css';
import React, {useState, useEffect} from 'react';
import Stars from '../../components/Stars/index';
import Loader from '../../components/Loader/index';

function TagPage(props){ 
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/tagpage')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
console.log(data)

const Reviews = ''
if (data !== null){
  Reviews = data.map((review) =>
  <div className='review' key={data.indexOf(review).toString()}>
    <span className='reviewName'>{review.name}</span>
    <span>{review.group}</span> 
    <span>#{review.tags[0]}</span> 
    <Stars grade={review.grade}/>
    <p className='text'>{review.text}</p>
    <div>Картинки</div><span>{review.likes}</span>
  </div>
  );
}
  return (
    <div className="App">
      {!data ? <Loader/> :
      <header>
        {Reviews}
      </header>
      }
  </div>
  );
}

export default TagPage;
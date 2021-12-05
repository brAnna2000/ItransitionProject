import './View.css';
import Stars from '../../components/Stars/index';
import {React, useState, useEffect} from 'react';

function View(props){
    // const data = props.data

    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/view')
        .then(responce=>responce.json())
        .then(responce=>setData(responce))
      },[])
      console.log(data)
    let View = 'a';
    if (data !== null){
        View =
        <div className='review'>
          <div className='fusion'>
            <span className='reviewName'>{data.name}</span>
          </div>
          <span>{data.group}</span> 
          <Stars grade={data.grade}/>
          <p className='text'>{data.text}</p>
          <div>Картинки</div><span>{data.likes}</span>
        </div>
      }
    return (
        <div>
          {View}
        </div>
    );
}

export default View;
import {React, useState, useEffect} from 'react';
import './UserPage.css';
import Stars from '../../components/Stars/index';
import Loader from '../../components/Loader/index';
import ReviewTags from '../../components/ReviewTags/index';
import {Link} from 'react-router-dom';

function UserPage(props){ 
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState([]);
  const [search, setSearch] = useState("");
  const [text, setText] = useState('');
  const [post, setPost] = useState([]);
  const userId = window.location.pathname; 
  
  useEffect(() => {
    fetch(userId)
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[userId])
  console.log(data)
  const Edit=(ev)=>{
    let sometext = '';
    if(data !=null & data.length >0){
      sometext=data[ev].text
      setText(sometext);
    } 
    let massiv = [];
    if(flag.length===0){
      for(let i=0;i<data.length;i++){
        i == ev ? massiv.push(true) : massiv.push(false)
      }
      setFlag(massiv)
    }
    else if (flag.length>0){
      for(let i=0;i<data.length;i++){
        i == ev ? massiv.push(!flag[i]) : massiv.push(false)
      }
      setFlag(massiv)
      data[ev].text = text;
      setData(data)
      fetch('/userpage/change',{
        method: 'POST',
        headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }),
        mode: 'same-origin',
        body: JSON.stringify(data[ev])
      })
    }
  }

  const Delete=(ev)=>{
    let deleteArr = data.concat();
    let deletePost = data[ev]
    deleteArr.splice(ev,1);
    setData(deleteArr)
    fetch('/userpage/delete',{
      method: 'POST',
      headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
      }),
      mode: 'same-origin',
      body: JSON.stringify(deletePost)
    })
  }
  useEffect(() => {
    if(post.name ==null){
      return
    }
    else{
        let info = JSON.stringify(post)
        fetch('/view',{
          method: 'POST',
          headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
          }),
          mode: 'same-origin',
          body: info
        }).then(res =>{
          window.location.href = '/view';
        })
    }   
  },[post])
  const View=(ev)=>{
    setPost(data[ev])
    console.log(post)
  }

  const Sort=(field)=>{
    const duplicate = data.concat();
    if(field === 'name'){
      const sortData = duplicate.sort(
      (a,b)=>{return a[field] > b[field] ? 1 : -1}
    )
    setData(sortData)
    }
    else{
      const sortData = duplicate.sort(
        (a,b)=>{return a[field] > b[field] ? -1 : 1}
      )
      setData(sortData)  
    }
  }
  
  const Filter=(text)=>{
    if(!search){
      setData(data)
    }
    else{
      setData(data.filter(el=>{
        return el['name'].toLowerCase().includes(search.toLowerCase()) || el['group'].toLowerCase().includes(search.toLowerCase());
      }))
    }
  }
  const ButtonClick=()=>{
    window.location.href='/createreview'
  }
 
  let Reviews = '';

  if (data !== null){
    
    Reviews = data.map((review) =>
    <div className='review' key={data.indexOf(review).toString()}>
      <div className='fusion'>
        <span className='reviewName'>{review.name}</span>
        <div className='icons'>
          <i className="fas fa-pen" id={data.indexOf(review).toString()} onClick={(event)=>{Edit(event.target.id)}}></i>
          <Link style={{color:'white'}} to={'/viewpage?view='+review.id} ><i className="far fa-eye"></i></Link>
          <i className="fas fa-trash" id={data.indexOf(review).toString()} onClick={(event)=>{Delete(event.target.id)}}></i>
        </div>
      </div>
      <span>{review.group}</span> 
      {review.tags[0]=="" ? <span></span> : <ReviewTags tags={review.tags}/>}
      <Stars grade={review.grade}/>
      {flag[data.indexOf(review).toString()] !== true ? <p className='text'>{review.text}</p>: <textarea id="textarea-review" className="form-control" aria-label="With textarea" value={text} onChange={(event)=>{setText(event.target.value)}}></textarea>}
      <div className='likes'>{review.likes}<i className="far fa-heart"></i></div>
    </div>
  );
  }
    return (
      <div className="App">
        {!data ? <Loader/> :
        <div>
          <div className='filter'>
            <span>Фильровать по:</span>
            <span>Названию</span>
            <span>Группе</span>
            <span>Тегам</span>
            <div className="input-group mb-3" id='searchButton'>
              <input id='search-input' type="text" className="form-control" placeholder="Найти обзор" aria-label="Найти обзор" aria-describedby="basic-addon2" onChange={(event)=>{setSearch(event.target.value)}} value={search}/>
              <span className="input-group-text" id="basic-addon2" onClick={()=>{Filter(search)}}>Поиск</span>
            </div>
          </div>
          <div className='sort'>
            <span>Сортировать по:</span>
            <span onClick={()=>{Sort('name')}}>Названиям</span>
            <span onClick={()=>{Sort('grade')}}>Оценкам</span>
            <span onClick={()=>{Sort('likes')}}>Лайкам</span>
            <button id='new'onClick={()=>{ButtonClick()}} type="button" className="btn btn-primary">Создать обзор</button>
          </div>
          {Reviews}
        </div>
        }
    </div>
    );
}

export default UserPage;
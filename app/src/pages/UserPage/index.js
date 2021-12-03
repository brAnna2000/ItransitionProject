import {React, useState, useEffect} from 'react';
import './UserPage.css';
import logo from '../../logo.svg';
import Stars from '../../components/Stars/index';

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
  },[])

  const Edit=(ev)=>{
    let sometext = '';
    if(data !=null & data.length >0){
      sometext=data[ev].text
      setText(sometext);
    } 
    let massiv = [];
    if(flag.length===0){
      for(let i=0;i<data.length;i++){
        i === ev ? massiv.push(true) : massiv.push(false)
      }
      setFlag(massiv)
    }
    else if (flag.length>0){
      for(let i=0;i<data.length;i++){
        i === ev ? massiv.push(!flag[i]) : massiv.push(false)
      }
      setFlag(massiv)
      data[ev].text = text;
      setData(data)
    }
  }

  const Delete=(ev)=>{
    let deleteArr = data.concat();
    deleteArr.splice(ev,1);
    setData(deleteArr)
  }
  useEffect(() => {
    console.log(post)
    if(post.name ==null){
      return
    }
    else{
      console.log('tut')
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
          <i className="far fa-eye" id={data.indexOf(review).toString()} onClick={(event)=>{View(event.target.id)}}></i>
          <i className="fas fa-trash" id={data.indexOf(review).toString()} onClick={(event)=>{Delete(event.target.id)}}></i>
        </div>
      </div>
      <span>{review.group}</span> 
      <Stars grade={review.grade}/>
      {flag[data.indexOf(review).toString()] !== true ? <p className='text'>{review.text}</p>: <textarea value={text} onChange={(event)=>{setText(event.target.value)}}></textarea>}
      <div>Картинки</div><span>{review.likes}</span>
    </div>
  );
  }
    return (
      <div className="App">
        {!data ? "Loading..." :
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <div className='new'>
            <button onClick={()=>{ButtonClick()}}>Создать обзор</button>
          </div>
          <div className='filter'>
            <span>Фильровать по:</span>
            <span>Названию</span>
            <span>Группе</span>
            <span>Тегам</span>
            <input onChange={(event)=>{setSearch(event.target.value)}} value={search}></input>
            <button onClick={()=>{Filter(search)}}>Найти</button>
          </div>
          <div className='sort'>
            <span>Сортировать по:</span>
            <span onClick={()=>{Sort('name')}}>Названиям</span>
            <span onClick={()=>{Sort('grade')}}>Оценкам</span>
            <span onClick={()=>{Sort('likes')}}>Лайкам</span>
          </div>
          {/* {props.match.params.id}!!! */}
          {Reviews}
        </header>
        }
    </div>
    );
}

export default UserPage;
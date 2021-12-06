import './Search.css';
import React, {useState} from 'react';

function Search(props){
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const reviews = props.reviews;

  const Filter=(text)=>{
    if(!search){
      return
    }
    else{
      let a = [];
      a.push(search)
      fetch('/search',{
        method: 'POST',
        headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }),
        mode: 'same-origin',
        body: JSON.stringify(a)
      }).then(res =>{
        console.log(res)
        if(res.status==200){
          window.location.href = res.url
        }
        else{
          alert('Обзор не найден')
        }
      }
    )
    }
  }
  return (
      <div className="input-group mb-3 search" id='search-block'>
        <input id='search-input' type="text" className="form-control" placeholder="Найти обзор" aria-label="Найти обзор" aria-describedby="basic-addon2" onChange={(event)=>{setSearch(event.target.value)}} value={search}/>
        <span className="input-group-text" id="basic-addon2" onClick={()=>{Filter(search)}}>Поиск</span>
      </div>
  );
}

export default Search;
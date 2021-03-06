import {React, useState, useEffect} from 'react';
import './CreateReview.css';
import Loader from '../../components/Loader/index';

function CreateReview() {
let starsObj = {
    1: "fa fa-star",
    2: "fa fa-star",
    3: "fa fa-star",
    4: "fa fa-star",
    5: "fa fa-star",
    6: "fa fa-star",
    7: "fa fa-star",
    8: "fa fa-star",
    9: "fa fa-star",
    10: "fa fa-star",
}
const [data, setData] = useState(null);
const [result, setResult] = useState("");
const [stars, setStars] = useState(starsObj);
const [search, setSearch] = useState("");
const [name, setName] = useState("");
const [text, setText] = useState("");
const [select, setSelect] = useState("Кино");
const [grade, setGrade] = useState("");

useEffect(() => {
    fetch('/createreview')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
},[])
useEffect(() => {
    review = {
    usersId: 2,
    group: select,
    name: name,
    tags: result,
    grade: grade,
    text: text
    }
    if(review.text !=="" && review.name !=="" && review.grade !==""){
    let info = JSON.stringify(review)
    fetch('/createreview',{
        method: 'POST',
        headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }),
        mode: 'same-origin',
        body: info
    })
    }
},[grade])
let review = {};
console.log(data)
const Rating=(value)=>{
    for (var key in starsObj) {
        Number(value) >= Number(key) ? starsObj[key]="fa fa-star checked" : starsObj[key]="fa fa-star"
    }
    setStars(starsObj)
}
const Filter=(text)=>{
    if(!search){
        setResult(null)
    }
    else{
        setResult(data.tags.filter(el=>{
        return el.toLowerCase().includes(search.toLowerCase());
    }))
    }
}
const Send=()=>{
    let a = 0;
    for (var key in stars) {
        stars[key] === "fa fa-star checked" ? a++ : a=a;
    }
    setGrade(a)
}
let OptionGroups = ''
if (data !== null){
    OptionGroups = data.groups.map((option) =>
    <option value={option} key={data.groups.indexOf(option)}>{option}</option>
  );
}
return (
    
<div className="App">
    {!data ? <Loader/> :
    <div className='review'>
        <div className="input-group mb-3" id="input-name">
            <span className="input-group-text" id="inputGroup-sizing-default">Название обзора</span>
            <input type="text" id='review-name'className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(event)=>{setName(event.target.value)}} value={name}/>
        </div>
        <div className="input-group mb-3" id="input-tags">
            <span className="input-group-text" id="inputGroup-sizing-default2">Теги</span>
            <input type="text" id='review-tags' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(event)=>{setSearch(event.target.value); Filter(search)}} value={search}/>
        </div>
        <div>
            {!result ? '': result.map((el)=>el+' ')}
        </div>
        <span>Группа</span>
        <select className="form-select" multiple aria-label="multiple select example" defaultValue={data.groups[0]} size={data.groups.length} onChange={(event)=>{setSelect(event.target.value)}}>
            {OptionGroups}
        </select>           
        <div>Оценка</div>
        <div>
            <span value='1' className={stars[1]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='2' className={stars[2]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='3' className={stars[3]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='4' className={stars[4]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='5' className={stars[5]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='6' className={stars[6]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='7' className={stars[7]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='8' className={stars[8]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='9' className={stars[9]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
            <span value='10' className={stars[10]} onClick={(event)=>{Rating(event.nativeEvent.target.attributes[0].value)}}></span>
        </div>
        <div>Оставить отзыв</div>
        <textarea id="textarea-review" className="form-control" aria-label="With textarea" onChange={(event)=>{setText(event.target.value)}} value={text}></textarea>
        <button onClick={()=>{Send()}} type="button" className="btn btn-primary userButton">Сохранить</button>
    </div>
    }
</div>
);
}

export default CreateReview;
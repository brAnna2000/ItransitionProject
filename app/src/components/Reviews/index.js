import React from 'react';
import Stars from '../Stars/index';
import ReviewTags from '../ReviewTags/index';

function Reviews(props){
    const data = props.data;
    console.log(data)
    return (
    <div className='review'>
        <span className='reviewName'>{data.name}</span>
        <span>{data.group}</span> 
        {data.tags ? <ReviewTags tags={data.tags}/>: <span></span>}
        <Stars grade={data.grade}/>
        <p className='text'>{data.text}</p>
        <div className='likes'>{data.likes}<i className="far fa-heart"></i></div>
    </div>    
    );
}

export default Reviews;
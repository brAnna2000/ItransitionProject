import {Link} from 'react-router-dom';
import './TagsCloud.css';

function TagsCloud(props){
    const numbersLink = '/modules';
    const numbersLectures = props.names;
    const SearchTags=(number)=>{
      let tag = [];
      tag.push(number)
      tag = JSON.stringify(tag)
      console.log(tag)
      fetch('/searchtag',{
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }),
        mode: 'same-origin',
        body: tag
      })
      // .then(res =>{
      //   if(res.redirected){
      //     // alert(res.url)
      //     console.log(res)
      //     // window.location.href = res.url;
      //   }
      // })
      console.log(number)
    }
    const Tags = numbersLectures.map((number) =>
    <span className = 'tagsSpan' key={number.toString()}>
      <Link to={numbersLink} onClick={()=>{SearchTags(number)}}>#{number}</Link>
    </span>);
    return (
      <div className="tags">
        <p>Облако тегов</p>
        <div>
          {Tags}
        </div>
      </div>
    );
}

export default TagsCloud;
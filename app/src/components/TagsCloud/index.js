import {Link} from 'react-router-dom';
import './TagsCloud.css';

function TagsCloud(props){
    const numbersLectures = props.names;
    const SearchTags=(number)=>{
      let tag = [];
      tag.push(number)
      tag = JSON.stringify(tag)
      fetch('/searchtag',{
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }),
        mode: 'same-origin',
        body: tag
      }).then(res=>{
        window.location.href = res.url
      })
    }
    const Tags = numbersLectures.map((number) =>
    <span className = 'tagsSpan' key={number.toString()}>
      <Link to='/tagpage' onClick={()=>{SearchTags(number)}}>#{number}</Link>
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
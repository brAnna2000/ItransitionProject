import {Link} from 'react-router-dom';
import './TagsCloud.css';

function TagsCloud(props){
    const tag = props.tagsNames;
    const Tags = tag.map((el) =>
    <span className = 'tagsSpan' key={el.toString()}>
      <Link to={'/tagpage?tag='+el} >#{el}</Link>
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
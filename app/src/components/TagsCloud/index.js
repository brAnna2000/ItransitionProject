import {Link} from 'react-router-dom';

function TagsCloud(props){
    const numbersLink = '/modules';
    const numbersLectures = props.names;
    const Tags = numbersLectures.map((number) =>
    <div className = 'coursesLectures' key={number.toString()}>
      <Link to={numbersLink}>{number}</Link>
    </div>);
    return (
      <div>
        <p>Облако тегов</p>
        <div>
          {Tags}
        </div>
      </div>
    );
}

export default TagsCloud;
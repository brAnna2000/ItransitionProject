import {React} from 'react';

function ReviewTags(props){
    const propsTags = props.tags;
    const Tags = propsTags.map((el) =>
    <span key={propsTags.indexOf(el)}>#{el}</span>);
    return (
      <div>
          {Tags}
      </div>
    );
}

export default ReviewTags;
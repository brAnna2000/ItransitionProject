import './Stars.css';

function Stars(props){
    const grade = props.grade;
    let starsObj = [1,2,3,4,5,6,7,8,9,10]
    const Stars = starsObj.map((number) =>
    {if(Number(grade) >= Number(number)){
        return <span className = "fa fa-star checked" key={number.toString()}></span>
    }
    else{
        return <span className = "fa fa-star" key={number.toString()}></span>
    }});
    return (
        <div>
          {Stars}
        </div>
    );
}

export default Stars;
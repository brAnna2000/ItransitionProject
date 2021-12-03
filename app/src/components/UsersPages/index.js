import {Link} from 'react-router-dom';
import './UsersPages.css';

function UsersPage(props){
    const user=`/userpage/`;
    const numbersLectures=props.names;
    const Users=numbersLectures.map((number) =>
    <div className="usersList" key={numbersLectures.indexOf(number)}>
      <Link className='usersLink' to={user+`${number.id}`} key={numbersLectures.indexOf(number)+1}>{number.name} {number.surname}</Link>
      <span className='usersSpan' key={numbersLectures.indexOf(number)+2}>{number.email}</span>
    </div>
    );
    return (
      <div className="users">
        <p>Пользователи</p>
        {Users}
      </div>
    );
}

export default UsersPage;
// import './MainPage.css';
// import TagsCloud from '../../components/TagsCloud';
// import React, {useState, useEffect} from 'react';

// function MainPage(props){ 
//     const [data, setData] = useState(null);
//     useEffect(() => {
//       fetch('/')
//       .then(responce=>responce.json())
//       .then(responce=>setData(responce.message))
//     },[])
//     return (
//       <div className='mainPage'>
//         <TagsCloud names={ !data ? ["Load", "Test"]: data}/>
//         <div>Самый популярный обзор</div>
//         <div>Последний обзор</div>
//       </div>
//     );
// }

// export default MainPage;
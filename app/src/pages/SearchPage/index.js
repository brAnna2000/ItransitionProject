import {React, useState, useEffect} from 'react';
import Loader from '../../components/Loader/index';
function SearchPage(props){
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/search')
    .then(responce=>responce.json())
    .then(responce=>setData(responce))
  },[])
  console.log(data)
return (
  <div>
    <Loader/>
  </div>
);
}

export default SearchPage;
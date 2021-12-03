import TagsCloud from '../../components/TagsCloud';
import React from 'react';

function AuthPage(props){ 

  return (
    <div className='mainPage'>
      <TagsCloud names={["Load", "Test"]}/>
      <div>Тестовая страница</div>
    </div>
  );
}

export default AuthPage;
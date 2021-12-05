import React from 'react'
import {Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage/index.js'
import UserPage from './pages/UserPage/index.js'
import AuthPage from './pages/AuthPage/index.js'
import CreateReview from './pages/CreateReview/index.js'
import AdminPage from './pages/AdminPage/index.js'
import View from './pages/View/index.js'
import TagPage from './pages/TagPage/index.js'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<MainPage/>} exact></Route>
        <Route path="/userpage/" element={<UserPage />} exact></Route>
        <Route path="/userpage/:id" element={<UserPage />} exact></Route>
        <Route path="/adminpage" element={<AdminPage />} exact></Route>
        <Route path="/createreview" element={<CreateReview />} exact></Route>
        <Route path="/view" element={<View />} exact></Route>
        <Route path="/tagpage" element={<TagPage />} exact></Route>
      </Routes>
    )
  }
  else{
    return (
    <Routes>
      <Route path="/" element={<AuthPage />} exact></Route>
      <Route to="/" />
    </Routes>
  )
  }
}
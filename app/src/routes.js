import React from 'react'
import {Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import UserPage from './pages/UserPage'
import AuthPage from './pages/AuthPage'
import CreateReview from './pages/CreateReview'
import AdminPage from './pages/AdminPage'
import View from './pages/View'
import TagPage from './pages/TagPage'
import SearchPage from './pages/SearchPage'

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
        <Route path="/search" element={<SearchPage />} exact></Route>
      </Routes>
    )
  }
  else{
    return (
    <Routes>
      <Route path="/" element={<AuthPage />} exact></Route>
      <Route path="/tagpage" element={<TagPage />} exact></Route>
      <Route path="/search" element={<SearchPage />} exact></Route>
      <Route to="/" />
    </Routes>
  )
  }
}
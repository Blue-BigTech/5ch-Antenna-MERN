import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import './scss/style.scss'
import { PrivateRoute } from './privateRoute';
import { history } from './history';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const Layout = React.lazy(() => import('./layout/Layout'))
const Login = React.lazy(() => import('./views/login/Login'))


function App() {
  
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="/login" name="Login" element={<Login />} />
        <Route path="/" name="Dashboard" element={<PrivateRoute><Layout child={'Genre'} /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/genre" name="Genre" element={<PrivateRoute><Layout child={'Genre'} /></PrivateRoute>} />
        <Route path="/urls" name="Urls" element={<PrivateRoute><Layout child={'Urls'} /></PrivateRoute>} />
        <Route path="/blogs" name="Blogs" element={<PrivateRoute><Layout child={'Blog'} /></PrivateRoute>} />
      </Routes>
    </Suspense>
  )
}

export default App

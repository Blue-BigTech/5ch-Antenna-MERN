import React from 'react'
import PrivateRoute from './privateRoute';

// const Login = React.lazy(() => import('./views/login/Login'))

const Genre = React.lazy(() => import('./views/genre/Genre'))
const Urls = React.lazy(() => import('./views/urls/Urls'))
const Blogs = React.lazy(() => import('./views/blogs/Blogs'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/genre', name: 'Genre', element: Genre },
  { path: '/urls', name: 'URLs', element: Urls },
  { path: '/blogs', name: 'Blogs', element: Blogs },
]

export default routes

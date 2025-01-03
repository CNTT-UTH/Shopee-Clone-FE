import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductList from '../pages/ProductList'
import AuthLayout from '../layouts/AuthLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductList />
  },
  {
    path: '/login',
    element: ( 
      <AuthLayout>
        <Login />
      </AuthLayout>
    )
  },
  {
    path: '/register',
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    )
  }
])

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App

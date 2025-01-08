import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductList from '../pages/ProductList'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/AuthLayout/MainLayout'
import { ProtectedRoute, PublicRoute } from '../Components/Routes/ProtectedRoute'
import Profile from '../pages/Profie'

const router = createBrowserRouter([
  {
    path: '',
    index: true,
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    )
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'profile',
        element: (
          <MainLayout>
            <Profile />
          </MainLayout>
        )
      }
    ]
  },
  {
    path: '',
    element: <PublicRoute />,
    children: [
      {
        path: 'login',
        element: ( 
          <AuthLayout>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: 'register',
        element: (
          <AuthLayout>
            <Register />
          </AuthLayout>
        )
      }
    ]
  },
  
])

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductList from '../pages/ProductList'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import { ProtectedRoute, PublicRoute } from '../components/Routes/ProtectedRoute'
import Profile from '../pages/Profie'
import { ToastContainer } from 'react-toastify'
import VerifyEmail from '../pages/Register/VerifyEmail'

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
      },
      {
        path: 'verify-email',
        element: (
          <AuthLayout>
            <VerifyEmail />
          </AuthLayout>
        )
      }
    ]
  },
  
])

const App: React.FC = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.Fragment>
  )

}

export default App

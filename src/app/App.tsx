import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductList from '../pages/ProductList'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import { ProtectedRoute, PublicRoute } from '../components/Routes/ProtectedRoute'
import Profile from '../pages/Profile'
import { ToastContainer } from 'react-toastify'
import path from '../constants/path'
import { EventTargetLS } from '../utils/auth.http'
import { useAuth } from '../contexts/auth.context'

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
        path: path.profile,
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
        path: path.login,
        element: ( 
          <AuthLayout>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: path.register,
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
  const { clearMethod } = useAuth()
  useEffect(() => {
    EventTargetLS.addEventListener('clear', clearMethod)
    
    //optimizing
    return () => { EventTargetLS.removeEventListener('clear', clearMethod) } 
  },[clearMethod])

  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000}/>
    </React.Fragment>
  )

}

export default App

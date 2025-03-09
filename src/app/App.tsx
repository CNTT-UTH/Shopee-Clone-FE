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
import UserLayout from '../layouts/UserLayout'
import ChangePassword from '../pages/ChangePassword'
import InfoPurchase from '../pages/InfoPurchase'
import { PublicSellerCentre, SellerRoute } from '@uth/components/Routes/ShopRoute'
import SellerCentre from '@uth/pages/SellerCentre'
import RegisterSeller from '@uth/components/RegisterSeller'
import RegisterShopLayout from '@uth/layouts/RegisterShopLayout'
import SellerLayout from '@uth/layouts/SellerLayout/SellerLayout'
import ProductDetail from '@uth/pages/ProductDetail'
import SearchPage from '@uth/pages/SearchPage/SearchPage'
import Cart from '@uth/pages/Cart'

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
    path: `${path.product}${path.productDetail}`,
    element: (
      <MainLayout>
        <ProductDetail />
      </MainLayout>
    )
  },
  {
    path: path.search,
    element: (
      <MainLayout>
        <SearchPage />
      </MainLayout>
    )
  },
  {
    path: '',
    element: <SellerRoute />,
    children: [
      {
        path: path.sellerCentre,
        element: (
          <SellerLayout>
            <SellerCentre />
          </SellerLayout>
        )
      }
    ]
  },
  {
    path: '',
    element: <PublicSellerCentre />,
    children: [
      {
        path: path.registerSeller,
        element: (
          <RegisterShopLayout>
            <RegisterSeller />
          </RegisterShopLayout>
        )
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: path.user,
        element: (
          <MainLayout>
            <UserLayout />
          </MainLayout>
        ),
        children: [
          {
            path: path.profile,
            element: <Profile />
          },
          {
            path: path.changePassword,
            element: <ChangePassword />
          },
          {
            path: path.infoPurchase,
            element: <InfoPurchase />
          }
        ]
      },
      {
        path: path.cart,
        element: (
        <MainLayout>
          <Cart />
        </MainLayout>)
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

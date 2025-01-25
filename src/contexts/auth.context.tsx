import { User } from "../types/user.type"
import { getAccessTokenFromLS, getUserProfileFromLS } from "../utils/auth.http"
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface AuthContextInterface {
  isAuthenticated: boolean,
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  user: User | null
  setUser : React.Dispatch<React.SetStateAction<User | null>>
}
 
const initialAppContext: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {},
  user: getUserProfileFromLS(),
  setUser: () => {}
} 

export const AuthContext = createContext<AuthContextInterface>(initialAppContext)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<User | null>(initialAppContext.user)
  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

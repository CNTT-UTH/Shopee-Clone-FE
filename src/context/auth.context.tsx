import { getAccessTokenFromLS } from "../utils/auth.http"
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface AuthContextInterface {
  isAuthenticated: boolean,
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const initialAppContext: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {}
} 

export const AuthContext = createContext<AuthContextInterface>(initialAppContext)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

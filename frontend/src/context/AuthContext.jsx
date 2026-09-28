import { createContext, useState } from "react";

export const AuthContext = createContext();

const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(getStoredUser);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    
    const login = (userData, newToken) => {
        setUser(userData);
        setToken(newToken);
        localStorage.setItem("token", newToken); 
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      setUser(null);
      setToken(null);
    };

    return (
        <AuthContext.Provider value={{user, login, token, logout}}>
            {children}
        </AuthContext.Provider>
    );
}   

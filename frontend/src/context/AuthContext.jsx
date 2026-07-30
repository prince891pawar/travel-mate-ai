import {createContext,useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    const login = (userData, newToken) => {
        setUser(userData);
        setToken(newToken);
        localStorage.setItem("token", newToken); 
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    useEffect(() => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    setToken(token);
    setUser(user);
  }
}, []);

    return (
        <AuthContext.Provider value={{user, login, token, logout}}>
            {children}
        </AuthContext.Provider>
    );
}   

import React, { createContext, useState, useEffect } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Initialize user with roles
    const initializeUser = async (user, ) => {
        console.log("Initializing user in UserContext!");
        console.log("User:", user);
        setUser(user);
        setIsAuthenticated(true);
       
        const currentDate = new Date();
            console.log(currentDate.toString());    
    };

    

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
       
    };

  

    return (
        <UserContext.Provider value={{ user, isAuthenticated, logout, initializeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;

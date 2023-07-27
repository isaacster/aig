// AuthContext.js

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

{/*This is a functional component that acts as a provider for the AuthContext so we can share data . */}
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {/* The AuthProvider is making the isLoggedIn state and setIsLoggedIn function available to all components that consume the AuthContext. App.js and login.js in our case... */}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// UserRoleContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [userPageName, setPageName] = useState("Log-In");
  console.log(userPageName);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setPageName(savedUsername);
    }
  }, []);
  return (
    <UserNameContext.Provider value={{ userPageName, setPageName }}>
      {children}
    </UserNameContext.Provider>
  );
};

// export const useUserName = () => {
//   return useContext(UserNameContext);
// };

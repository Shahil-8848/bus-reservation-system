// UserRoleContext.js
import React, { createContext, useState } from "react";

export const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [userPageName, setPageName] = useState("Log-In");
  console.log(userPageName);
  return (
    <UserNameContext.Provider value={{ userPageName, setPageName }}>
      {children}
    </UserNameContext.Provider>
  );
};

// export const useUserName = () => {
//   return useContext(UserNameContext);
// };

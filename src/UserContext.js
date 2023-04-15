import axios from "axios";
import React, { useState } from "react";
export const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [ready, setReady] = useState(false);
  React.useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
        setReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}

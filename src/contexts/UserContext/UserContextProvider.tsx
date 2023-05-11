import { UserContext } from "./UserContext.ts";
import { useState } from "react";

export const UserContextProvider = (props) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  return (
    <UserContext.Provider
      value={{
        username,
        role,
        setUsername,
        setRole,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

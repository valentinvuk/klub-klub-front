import { useContext } from "react";
import { UserContextState } from "./UserContextState.ts";
import { UserContext } from "./UserContext.ts";

export const useUserContext = (): UserContextState => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be within UserContextProvider");
  }

  return context;
};

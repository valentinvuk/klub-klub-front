import { createContext } from "react";
import { UserContextState } from "./UserContextState.ts";

export const UserContext = createContext<UserContextState | undefined>(
  {} as UserContextState
);

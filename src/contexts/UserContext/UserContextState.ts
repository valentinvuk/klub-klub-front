import { Dispatch, SetStateAction } from "react";

export interface UserContextState {
  username: string;
  role: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<string>>;
}

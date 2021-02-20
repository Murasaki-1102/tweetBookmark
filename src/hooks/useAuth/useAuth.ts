import { useContext } from "react";
import {
  AuthActionContext,
  AuthStateContext,
} from "../../components/contexts/AuthContext";

export const useAuthState = () => useContext(AuthStateContext);

export const useAuthAction = () => useContext(AuthActionContext);

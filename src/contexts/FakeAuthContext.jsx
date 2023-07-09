/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer } from "react";

const AuthoContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Invalid action");
  }
}
const FAKE_USER = {
  name: "sparkz",
  email: "sparkz@worldwise.com",
  password: "qwerty",
  avatar:
    "https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-xpFPtqbv9Y5-c6iJTXZPQxebhtTJJlZbICFUBJFJ_8YMJQT7hjXyA5YK2Gked1DnyuoF72z90ozafZD8TvnOXT1qrBDw=w1366-h667",
};
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthoContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthoContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthoContext);
  if (context === undefined)
    throw new Error(" AuthoContext was used outside the AuthProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };

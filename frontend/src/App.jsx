import { AppRouter } from "./routes";
import "./assets/global.css";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

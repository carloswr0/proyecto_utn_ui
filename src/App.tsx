import { Route, Routes } from "react-router";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RequestResetPasswordScreen from "./screens/RequestResetPasswordScreen.tsx";
import VerifyEmailScreen from "./screens/VerifyEmailScreen.tsx";
import ResetPasswordScreen from "./screens/ResetPasswordScreen.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import AuthMiddleware from "./middlewares/AuthMiddleware.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/verify-email" element={<VerifyEmailScreen />} />
      <Route
        path="/request-reset-password"
        element={<RequestResetPasswordScreen />}
      />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route element={<AuthMiddleware />}>
        <Route path="/home" element={<HomeScreen />} />
      </Route>
    </Routes>
  );
};

export default App;

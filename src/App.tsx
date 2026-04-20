import DashboardPage from "./pages/DashboardPage";
import useAuthentication from "./hooks/useAuthentication";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { isLoggedIn, isLoading, loginWithGoogle, logout } =
    useAuthentication();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginPage onGoogleLogin={loginWithGoogle} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardPage onLogout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="*"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import DashboardPage from "./pages/DashboardPage";
import useAuthentication from "./hooks/useAuthentication";
import LoginPage from "./pages/LoginPage";

function App() {
  const { isLoggedIn, loginWithGoogle, logout } = useAuthentication();

  if (!isLoggedIn) {
    return <LoginPage onGoogleLogin={loginWithGoogle} />;
  }

  return <DashboardPage onLogout={logout} />;
}

export default App;

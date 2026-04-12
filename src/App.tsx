import DashboardPage from "./pages/DashboardPage";
import useAuthentication from "./hooks/useAuthentication";
import LoginPage from "./pages/LoginPage";

function App() {
  const { isLoggedIn, isLoading, loginWithGoogle, logout } =
    useAuthentication();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <LoginPage onGoogleLogin={loginWithGoogle} />;
  }

  return <DashboardPage onLogout={logout} />;
}

export default App;

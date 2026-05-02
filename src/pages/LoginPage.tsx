import Button from "../components/shared/Button";
import GoogleIcon from "../components/GoogleIcon";

interface LoginPageProps {
  onGoogleLogin: () => void;
}

const LoginIntro = () => {
  return (
    <div className="mb-6 space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
        Welcome
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Sign in to Job Tracker
      </h1>
      <p className="text-sm text-slate-500">
        Continue with Google to access your application dashboard.
      </p>
    </div>
  );
};

const LoginPage = ({ onGoogleLogin }: LoginPageProps) => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <section className="w-full rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-sm">
        <LoginIntro />
        <Button
          type="button"
          icon={<GoogleIcon />}
          text="Login with Google"
          onClick={onGoogleLogin}
          className="mb-3 w-full gap-3 rounded-xl px-4 py-2.5"
        />
      </section>
    </main>
  );
};

export default LoginPage;

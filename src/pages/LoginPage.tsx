interface LoginPageProps {
  onGoogleLogin: () => void;
}

function LoginPage({ onGoogleLogin }: LoginPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <section className="w-full rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-sm">
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

        <button
          type="button"
          onClick={onGoogleLogin}
          className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.231 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.28 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 13 24 13c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.28 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.168 0 9.86-1.977 13.409-5.191l-6.191-5.238C29.146 35.091 26.715 36 24 36c-5.21 0-9.619-3.316-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.081 5.571h.001l6.191 5.238C36.972 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-xs text-slate-500">
          OAuth is mocked for now. This button directly signs in for UI flow
          testing.
        </p>
      </section>
    </main>
  );
}

export default LoginPage;

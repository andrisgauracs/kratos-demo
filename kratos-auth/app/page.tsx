import { getLogoutFlow, getServerSession } from "@ory/nextjs/app";

export default async function Home() {
  const session = await getServerSession();
  const logoutFlow = session ? await getLogoutFlow() : null;
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center px-8 py-16 sm:px-16">
        {session && logoutFlow ? (
          <div className="flex flex-col items-center w-full">
            <h1 className="mb-12 text-5xl font-bold text-black">
              Welcome Back
            </h1>
            <div className="w-full bg-gray-50 rounded-lg border border-gray-200 p-8 mb-12 overflow-auto max-h-64">
              <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap wrap-break-word">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
            <div className="flex gap-6 w-full sm:w-auto flex-col sm:flex-row">
              <a
                href="/settings"
                className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Settings
              </a>
              <a
                href={logoutFlow.logout_url}
                className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <h1 className="mb-6 text-5xl font-bold text-black text-center">
              Authentication
            </h1>
            <p className="mb-12 text-gray-600 text-lg text-center max-w-2xl">
              Sign in to your account or create a new one to get started
            </p>
            <div className="flex gap-6 flex-col sm:flex-row w-full sm:w-auto">
              <a
                href="/login"
                className="flex-1 sm:flex-none px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="flex-1 sm:flex-none px-8 py-3 bg-white text-black font-semibold rounded-lg border-2 border-black hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Create Account
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

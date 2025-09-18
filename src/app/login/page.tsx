export default function LoginPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo: imagem/hero (placeholder) */}
      <section
        className="hidden lg:block"
        style={{
          background:
            "linear-gradient(0deg, rgba(16,45,71,0.35), rgba(16,45,71,0.35)), url('/hero.jpg') center/cover no-repeat",
        }}
      />

      {/* Lado direito: formulário */}
      <section className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Logo + título */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-md"
                style={{ background: "rgb(var(--brand-500))" }}
                aria-hidden
              />
              <div className="text-2xl font-semibold" style={{ color: "rgb(var(--brand-700))" }}>
                Aquapor Platform
              </div>
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-slate-900">Welcome Back</h1>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to the Marketing & Digital Transformation Platform
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Username or Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(var(--brand-500))]"
                placeholder="Enter your username or email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(var(--brand-500))]"
                placeholder="Enter your password"
              />
              <div className="mt-2 text-right">
                <a href="#" className="text-sm" style={{ color: "rgb(var(--brand-700))" }}>
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="size-4 rounded border-slate-300" />
                Remember me
              </label>
            </div>

            <button type="submit" className="btn w-full">Sign In</button>

            <p className="text-center text-sm text-slate-500">
              Having trouble accessing your account?{" "}
              <a href="#" className="font-medium" style={{ color: "rgb(var(--brand-700))" }}>
                Contact Support
              </a>
            </p>
          </form>

          {/* rodapé */}
          <div className="mt-8 h-px bg-slate-200" />
          <p className="mt-3 text-xs text-slate-400 text-center">
            © 2025 Aquapor. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}

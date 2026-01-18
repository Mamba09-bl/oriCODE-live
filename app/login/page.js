"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Code2,
  Terminal,
  Activity,
  ShieldCheck,
  Globe,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- MOCKS FOR STANDALONE PREVIEW ---
const toast = {
  error: (msg) => console.error("Toast Error:", msg),
  success: (msg) => console.log("Toast Success:", msg),
};

// ------------------------------------

const App = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Required";
    if (!formData.password) newErrors.password = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setErrorMsg("");
    e.preventDefault();

    if (!validate()) return;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const result = await res.json();
    console.log("i am result", result);

    if (result.success) {
      // In a real Next.js app, this would be router.push("/login")
      router.push("/dashboard");
      console.log("login done");
    } else {
      setErrorMsg("Email already exists");
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account created successfully");
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center p-4 md:p-8 font-mono overflow-hidden selection:bg-emerald-500/30">
      {/* --- COMPLEX BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#10b981 0.5px, transparent 0.5px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="relative z-10 w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-12 gap-0 border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-900/40 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]">
        {/* Left Panel: Branding & Stats */}
        <div className="lg:col-span-5 p-8 md:p-12 bg-zinc-900/50 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Terminal className="text-emerald-400 w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold tracking-widest text-white">
                CODESYNC.OS
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">
                Initialize <br />
                <span className="text-emerald-500 italic">Session.</span>
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">
                Deploy your collaborative environment. Join 2,000+ engineers
                building the future.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-4 relative z-10">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <Activity className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-300 uppercase">
                  Real-Time Sync
                </p>
                <p className="text-[10px] text-zinc-500 italic">
                  Edge Node Connected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                <ShieldCheck className="w-4 h-4 text-zinc-400 group-hover:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-300 uppercase">
                  Secure Shell
                </p>
                <p className="text-[10px] text-zinc-500 italic">
                  End-to-End Encrypted
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full" />
        </div>

        {/* Right Panel: Form Logic */}
        <div className="lg:col-span-7 p-8 md:p-12 bg-black/20 relative flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-xs font-bold tracking-[0.4em] text-emerald-500 uppercase mb-2">
              Registration Portal
            </h3>
            <div className="h-px w-12 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
          </div>
          {errorMsg && (
            <div className="w-full mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 text-center">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {/* <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="IDENTIFIER (USERNAME)"
                  className="block w-full bg-zinc-800/30 border border-zinc-800 rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 placeholder:text-zinc-700 transition-all font-mono"
                />
                {errors.username && (
                  <span className="absolute right-4 top-4 text-[10px] text-red-500 uppercase font-bold">
                    MISSING
                  </span>
                )}
              </div> */}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="AUTHORIZATION_EMAIL"
                  className="block w-full bg-zinc-800/30 border border-zinc-800 rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 placeholder:text-zinc-700 transition-all font-mono"
                />
                {errors.email && (
                  <span className="absolute right-4 top-4 text-[10px] text-red-500 uppercase font-bold">
                    ERR
                  </span>
                )}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="ACCESS_KEY (PASSWORD)"
                  className="block w-full bg-zinc-800/30 border border-zinc-800 rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 placeholder:text-zinc-700 transition-all font-mono"
                />
                {errors.password && (
                  <span className="absolute right-4 top-4 text-[10px] text-red-500 uppercase font-bold">
                    SEC_ERR
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative py-5 bg-white text-black font-black text-xs tracking-[0.3em] uppercase rounded-xl hover:bg-emerald-400 transition-all active:scale-[0.98] overflow-hidden group shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)]"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? "AUTHENTICATING..." : "LOG IN"}

                {!isSubmitting && (
                  <Zap size={14} className="group-hover:animate-bounce" />
                )}
              </div>
              <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </form>

          {/* New Login Redirection Link */}
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={() => router.push("/")}
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                Make a account?
              </span>
              <span className="text-xs font-black text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                SignUp <ArrowRight size={12} />
              </span>
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-between items-center opacity-30 border-t border-zinc-800 pt-6">
            <div className="flex items-center gap-2">
              <Globe size={12} />
              <span className="text-[10px] uppercase font-bold tracking-widest">
                US-EAST-1
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest">
                System Optimal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 uppercase tracking-[0.4em] pointer-events-none">
        © 2026 CodeSync.OS // Terminal Interface v4.0.1
      </div>
    </div>
  );
};

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import { useTheme } from "../../../context/ThemeContext";
import {
  FaKey,
  FaLock,
  FaCopy,
  FaClock,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";


const BcryptGenerator = () => {
  const { dark } = useTheme();

  const [password, setPassword] = useState("");
  const [cost, setCost] = useState(10);

  const [hash, setHash] = useState("");
  const [generationTime, setGenerationTime] = useState("");

  const [verifyText, setVerifyText] = useState("");
  const [verifyHash, setVerifyHash] = useState("");

  const [match, setMatch] = useState(null);

  const generateHash = () => {
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    try {
      const start = performance.now();

      const generated = bcrypt.hashSync(
        password,
        cost
      );

      const end = performance.now();

      setHash(generated);

      setGenerationTime(
        (end - start).toFixed(2)
      );

      toast.success(
        "Bcrypt hash generated"
      );
    } catch {
      toast.error(
        "Failed to generate hash"
      );
    }
  };

  const verifyPassword = () => {
    if (!verifyText || !verifyHash) {
      toast.error(
        "Fill all fields"
      );

      return;
    }

    try {
      const result = bcrypt.compareSync(
        verifyText,
        verifyHash
      );

      setMatch(result);

      if (result) {
        toast.success("Match found");
      } else {
        toast.error("No match");
      }
    } catch {
      toast.error(
        "Invalid bcrypt hash"
      );
    }
  };

  const copyHash = async () => {
    if (!hash) return;

    try {
      await navigator.clipboard.writeText(
        hash
      );

      toast.success(
        "Hash copied"
      );
    } catch {
      toast.error(
        "Copy failed"
      );
    }
  };

  const clearAll = () => {
    setPassword("");
    setHash("");
    setGenerationTime("");

    setVerifyText("");

    setVerifyHash("");

    setMatch(null);

    setCost(10);
  };

  const theme = {
    light: {
      wrapper: "bg-[#F8F9FA] text-zinc-900",
      heading: "text-zinc-900",
      subtext: "text-zinc-500",
      card: "bg-white border-zinc-200/85 shadow-sm",
      input:
        "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 focus:outline-none",
      select:
        "bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400 focus:outline-none",
      buttonPrimary: "bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-sm",
      buttonSecondary: "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 transition-colors",
      label: "text-zinc-500 font-semibold tracking-wider text-xs uppercase",
      result: "bg-zinc-50 border-zinc-200 text-zinc-700",
      infoCard: "bg-zinc-50/55 border-zinc-150/85 text-zinc-600",
      badge: "bg-zinc-100 text-zinc-700",
    },
    dark: {
      wrapper: "bg-[#090A0F] text-zinc-100",
      heading: "text-zinc-100",
      subtext: "text-zinc-400",
      card: "bg-zinc-900/50 border-zinc-800/85 backdrop-blur-md shadow-lg",
      input:
        "bg-zinc-950/70 border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:ring-2 focus:ring-white/5 focus:outline-none",
      select:
        "bg-zinc-950/70 border-zinc-800 text-zinc-100 focus:border-zinc-750 focus:outline-none",
      buttonPrimary: "bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shadow-sm",
      buttonSecondary: "bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors",
      label: "text-zinc-400 font-semibold tracking-wider text-xs uppercase",
      result: "bg-zinc-950/80 border-zinc-800 text-zinc-300",
      infoCard: "bg-zinc-900/40 border-zinc-800/60 text-zinc-400",
      badge: "bg-zinc-800/50 text-zinc-300",
    },
  };

  const t = dark ? theme.dark : theme.light;

  return (
    <div className={`min-h-screen ${t.wrapper} px-4 sm:px-6 py-10 transition-colors duration-300 relative overflow-x-hidden`}>
      <title>Bcrypt Hash Generator & Verifier — DevTasks</title>
      <meta
        name="description"
        content="Securely generate, tune, and verify bcrypt hashes for passwords and tokens."
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/devutilities"
            className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0 ${
              dark
                ? "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
                : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-350"
            }`}
            title="Back to Workspace"
          >
            <svg
              className="w-4.5 h-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${t.heading}`}>
              Bcrypt Generator & Verifier
            </h1>
            <p className={`mt-1 text-sm ${t.subtext}`}>
              Securely generate, tune, and verify bcrypt hashes for passwords and tokens.
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Hash Generator */}
          <div className="space-y-6">
            <div className={`rounded-3xl border ${t.card} p-6 sm:p-8 space-y-6 relative overflow-hidden`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <FaKey className="text-zinc-500 w-4.5 h-4.5" />
                  <h2 className={`font-bold text-lg tracking-tight ${t.heading}`}>Hash Generator</h2>
                </div>
                <button
                  onClick={clearAll}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer ${t.buttonSecondary}`}
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2.5">
                <label className={t.label}>Password / Plain Text</label>
                <textarea
                  rows={4}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter text to hash..."
                  className={`w-full p-4 rounded-2xl border transition-all duration-200 text-sm ${t.input}`}
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className={t.label}>Cost Factor (Rounds)</label>
                  <span className={`text-xs font-medium ${t.subtext}`}>
                    Iterations: {Math.pow(2, cost).toLocaleString()}
                  </span>
                </div>
                <select
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className={`w-full p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-sm ${t.select}`}
                >
                  {[...Array(13)].map((_, i) => {
                    const value = i + 4;
                    let label = `${value}`;
                    if (value === 10) label += " (Default)";
                    else if (value >= 12) label += " (Slow / Secure)";
                    else if (value <= 6) label += " (Fast / Low Security)";
                    return (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                onClick={generateHash}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${t.buttonPrimary}`}
              >
                <FaLock className="w-4 h-4" />
                Generate Bcrypt Hash
              </button>

              {hash && (
                <div className="space-y-3 pt-2">
                  <label className={t.label}>Generated Hash</label>
                  <div
                    className={`w-full p-4 rounded-2xl border font-mono text-sm break-all select-all relative group ${t.result}`}
                  >
                    {hash}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={copyHash}
                      className={`px-4 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer ${t.buttonSecondary}`}
                    >
                      <FaCopy className="w-3.5 h-3.5" />
                      Copy Hash
                    </button>
                    {generationTime && (
                      <div className={`text-xs font-semibold flex items-center gap-1.5 ${t.subtext}`}>
                        <FaClock className="w-3.5 h-3.5" />
                        Time taken: <span className={`${t.heading} font-mono`}>{generationTime} ms</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Hash Verifier */}
          <div className="space-y-6">
            <div className={`rounded-3xl border ${t.card} p-6 sm:p-8 space-y-6`}>
              <div className="flex items-center gap-2.5">
                <FaShieldAlt className="text-zinc-500 w-4.5 h-4.5" />
                <h2 className={`font-bold text-lg tracking-tight ${t.heading}`}>Verify Hash</h2>
              </div>

              <div className="space-y-2.5">
                <label className={t.label}>Plain Text / Candidate Password</label>
                <input
                  type="text"
                  value={verifyText}
                  onChange={(e) => setVerifyText(e.target.value)}
                  placeholder="Enter candidate text..."
                  className={`w-full p-4 rounded-2xl border transition-all duration-200 text-sm ${t.input}`}
                />
              </div>

              <div className="space-y-2.5">
                <label className={t.label}>Bcrypt Hash</label>
                <textarea
                  rows={3}
                  value={verifyHash}
                  onChange={(e) => setVerifyHash(e.target.value)}
                  placeholder="Paste bcrypt hash to compare..."
                  className={`w-full p-4 rounded-2xl border font-mono transition-all duration-200 text-sm ${t.input}`}
                />
              </div>

              <button
                onClick={verifyPassword}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${t.buttonPrimary}`}
              >
                Verify Match
              </button>

              {match !== null && (
                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                    match
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-450"
                  }`}
                >
                  <div className={`p-1.5 rounded-xl text-lg ${match ? "bg-emerald-500/20" : "bg-rose-500/20"}`}>
                    {match ? "✅" : "❌"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">
                      {match ? "Comparison Successful" : "Comparison Failed"}
                    </h4>
                    <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                      {match
                        ? "The candidate password matches the provided bcrypt hash."
                        : "The candidate password does NOT match the provided bcrypt hash."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Info & FAQ Card */}
            <div className={`rounded-3xl border ${t.card} p-6 sm:p-8 space-y-4`}>
              <div className="flex items-center gap-2.5">
                <FaInfoCircle className="text-zinc-500 w-4.5 h-4.5" />
                <h3 className={`font-bold text-md tracking-tight ${t.heading}`}>What is bcrypt?</h3>
              </div>

              <div className="space-y-3.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                <p>
                  Bcrypt is a robust, adaptive password-hashing function designed by Niels Provos and David Mazières. It utilizes a key derivation function based on the Blowfish cipher and features a configurable iteration count (cost factor) to scale security levels over time.
                </p>
                <div className={`p-4 rounded-2xl border ${t.infoCard} space-y-3`}>
                  <div className="font-bold text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Key Characteristics</div>
                  <ul className="list-disc pl-4 space-y-2 text-xs">
                    <li><strong className={t.heading}>Adaptive Security:</strong> The cost factor can be increased as hardware speed improves, keeping it highly resistant to brute-force attacks.</li>
                    <li><strong className={t.heading}>Built-in Salting:</strong> Bcrypt automatically generates a unique 128-bit salt for each password, defending against rainbow table attacks.</li>
                    <li><strong className={t.heading}>Safe Limits:</strong> Bcrypt supports input passwords up to 72 bytes. Any characters beyond 72 bytes are ignored by standard implementations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BcryptGenerator;
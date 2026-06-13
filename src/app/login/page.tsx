"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) setError("بيانات الدخول غير صحيحة");
    else window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">🔐 دخول لوحة التحكم</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input type="email" placeholder="البريد الإلكتروني" className="w-full mb-3 p-2 border" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="كلمة المرور" className="w-full mb-4 p-2 border" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">دخول</button>
      </form>
    </div>
  );
}
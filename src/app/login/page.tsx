'use client';

import { Suspense, FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

function LoginInner() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Se veio ?redirectTo=... (do middleware), guarda para usar no pós-login
  const redirectTo = searchParams.get('redirectTo') || '/area-secreta';

  useEffect(() => {
    // Se o usuário já estiver logado, redireciona de imediato
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace(redirectTo);
    };
    checkSession();
  }, [supabase, router, redirectTo]);

  const onSubmitPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.replace(redirectTo);
    } else {
      setMessage('Login realizado, redirecionando...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <div className="mx-auto mb-4 flex justify-center">
          <Image src="/logo.png" alt="Logo" width={128} height={64} priority />
        </div>

        {error && (
          <p className="mb-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-3 text-sm text-green-600" role="status">
            {message}
          </p>
        )}

        <form onSubmit={onSubmitPassword} className="mt-2 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">E-mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="voce@exemplo.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Senha</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
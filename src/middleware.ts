// middleware.ts (na raiz do projeto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  // Clona os headers para o Supabase poder atualizar cookies (refresh de sessão)
  const res = NextResponse.next({
    request: { headers: new Headers(req.headers) },
  });

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Se não houver sessão, redireciona para /login mantendo a URL de retorno
  if (!session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set(
      'redirectTo',
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  // Se autenticado, segue o fluxo normal
  return res;
}

// Aplica o middleware apenas na área secreta
export const config = {
  matcher: ['/area-secreta', '/area-secreta/:path*'],
};
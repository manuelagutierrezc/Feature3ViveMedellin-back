import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Solo manejar peticiones a /api
  if (request.nextUrl.pathname.startsWith('/api')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Si es una petición OPTIONS, responder inmediatamente
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: requestHeaders,
      });
    }

    // Para otras peticiones, continuar con el proxy
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 
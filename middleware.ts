import { NextRequest, NextResponse } from "next/server";
import { verificarSesion } from "./lib/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const esRutaApi = request.nextUrl.pathname.startsWith("/api/");

  if (!token) {
    if (esRutaApi) {
      return NextResponse.json(
        { exito: false, error: "No autorizado." },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await verificarSesion(token);
    return NextResponse.next();
  } catch (error) {
    if (esRutaApi) {
      return NextResponse.json(
        { exito: false, error: "Sesión inválida o expirada." },
        { status: 401 }
      );
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

export const config = {
  matcher: [
    "/facturas/:path*",
    "/gestion-usuarios/:path*",
    "/api/facturas/:path*",
  ],
};

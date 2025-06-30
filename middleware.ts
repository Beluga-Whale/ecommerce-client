import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  // NOTE - ถ้า admin login แล้ว ไม่สามารเข้าหน้า admin/login ได้อีก
  if (req.nextUrl.pathname === "/admin/login" && token) {
    try {
      const decoded = jwtDecode<{ exp: number; role?: string }>(token ?? "");
      if (
        decoded &&
        (!decoded.exp || decoded.exp * 1000 > Date.now()) &&
        decoded.role === "admin"
      ) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } catch (error) {
      console.error("Invalid token:", error);
      redirectToHome(req);
    }
    return NextResponse.next();
  } else if (req.nextUrl.pathname === "/admin/login" && !token) {
    return NextResponse.next();
  }

  // NOTE -ถ้าไม่มี token จะไม่สามารเข้า route /admin ได้
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return redirectToHome(req);
  }

  if (!token && req.nextUrl.pathname.match("/shop/order")) {
    return redirectToHome(req);
  }

  if (!token && req.nextUrl.pathname.startsWith("/payment")) {
    return redirectToHome(req);
  }

  if (!token && req.nextUrl.pathname.match("/payment-success")) {
    return redirectToHome(req);
  }

  if (!token && req.nextUrl.pathname.startsWith("/myorder")) {
    return redirectToHome(req);
  }

  if (!token && req.nextUrl.pathname.startsWith("/profile")) {
    return redirectToHome(req);
  }

  try {
    const decoded = jwtDecode<{ exp: number; role?: string }>(token ?? "");

    if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) {
      const response = redirectToHome(req);
      response.cookies.delete("jwt");
      return response;
    }

    // NOTE - เช็คว่าจะเข้า path admin ต้องมี role เป็น admin เท่านั้น
    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
      const response = redirectToHome(req);
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return redirectToHome(req);
  }
}

function redirectToHome(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}

//NOTE - Apply middleware เฉพาะหน้า /tasks
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/shop/order",
    "/myorder/:path*",
    "/payment",
    "/payment-success",
    "/myorder",
    "/myorder/:path*",
    "/profile",
    "/profile/:path*",
  ],
};

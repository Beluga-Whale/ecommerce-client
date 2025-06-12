import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
    return redirectToHome(req);
  }

  try {
    //NOTE- ตรวจสอบว่า token หมดอายุหรือไม่
    const decoded = jwtDecode<{ exp: number; role?: string }>(token ?? "");
    if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) {
      //NOTE - Token หมดอายุ → ลบ cookie แล้ว redirect ไปหน้า login
      const response = redirectToHome(req);
      response.cookies.delete("jwt"); //NOTE - ลบ token ที่หมดอายุ
      return response;
    }

    // NOTE - เช็คว่าถ้า user ไม่มี role admin จะะไม่สามารเข้า path url /admin ได้
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      decoded?.role !== "admin"
    ) {
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
  matcher: ["/tasks/:path*"],
};

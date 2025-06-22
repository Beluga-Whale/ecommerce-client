import Header from "@/components/Header";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt")?.value;
  return (
    <main>
      <Header cookie={cookie} />
      {children}
    </main>
  );
}



"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";

export default function AreaSecretaLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? "");
    };
    fetchUser();
  }, [supabase]);

  const isActive = (href: string) =>
    pathname === href ? "bg-gray-800" : "hover:bg-gray-800";

  const go = (href: string) => {
    if (pathname !== href) router.push(href);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-4 border-b border-gray-800">
          <span className="font-semibold">Área Restrita</span>
        </div>
        <nav className="p-3 space-y-1">
          <button
            className={`w-full text-left rounded-md px-3 py-2 ${isActive("/area-secreta")}`}
            onClick={() => go("/area-secreta")}
          >
            Notícias
          </button>
          <button
            className={`w-full text-left rounded-md px-3 py-2 ${isActive("/area-secreta/agenda")}`}
            onClick={() => go("/area-secreta/agenda")}
          >
            Agenda Tributária
          </button>
        </nav>
        <div className="mt-auto p-3 border-t border-gray-800">
          <div className="mb-2 px-3 text-xs text-gray-300">
            {userEmail || "usuário@exemplo.com"}
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 bg-gray-50">{children}</div>
    </div>
  );
}
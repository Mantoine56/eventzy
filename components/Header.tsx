"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCustomSession } from "@/hooks/useCustomSession";
import { useEffect, useState } from "react";

export default function Header() {
  const { session, status } = useCustomSession();
  const [businessName, setBusinessName] = useState<string | null>(null);

  useEffect(() => {
    console.log("Session in Header:", session);
    setBusinessName(session?.user?.businessName || null);
  }, [session]);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {businessName ? `${businessName} Dashboard` : "Eventzy Dashboard"}
        </h1>
        <p className="text-sm text-gray-500">Session status: {status}</p>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
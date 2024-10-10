"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, ArrowRight } from 'lucide-react';
import { AuroraBackground } from "@/components/ui/aurora-background";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    router.push('/dashboard');
    return null;
  }

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 text-center space-y-6 max-w-md w-full px-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">Welcome to Eventzy</h1>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Get Started</h2>
          <Button onClick={handleSignIn} className="w-full bg-white text-gray-900 hover:bg-gray-100">
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="relative z-10 mt-12 text-center">
        <p className="text-sm text-gray-300">
          Powered by <a href="https://clickboost.ca" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">ClickBoost</a>
        </p>
      </div>
    </div>
  );
}
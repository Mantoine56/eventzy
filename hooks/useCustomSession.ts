import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

export function useCustomSession() {
  const { data: session, status, update } = useSession();
  const [customSession, setCustomSession] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('customSession');
      return saved ? JSON.parse(saved) : session;
    }
    return session;
  });

  useEffect(() => {
    if (session && JSON.stringify(session) !== JSON.stringify(customSession)) {
      setCustomSession(session);
      localStorage.setItem('customSession', JSON.stringify(session));
    }
  }, [session]);

  const updateCustomSession = useCallback(async (newData: any) => {
    await update(newData);
    const updatedSession = { ...customSession, ...newData };
    setCustomSession(updatedSession);
    localStorage.setItem('customSession', JSON.stringify(updatedSession));
  }, [customSession, update]);

  return { session: customSession, status, update: updateCustomSession };
}
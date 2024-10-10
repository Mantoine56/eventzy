"use client";

import { useState, useCallback, useEffect } from "react";
import { useCustomSession } from "@/hooks/useCustomSession";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Notification {
  type: 'success' | 'error';
  message: string;
}

export default function ProfilePage() {
  const { session, update } = useCustomSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    console.log("Current session in ProfilePage:", session);
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setBusinessName(session.user.businessName || "");
    }
  }, [session]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, businessName }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Profile update result:", result);
        
        await update({ user: { ...session?.user, name, email, businessName } });
        setNotification({ type: 'success', message: "Profile updated successfully" });
        
        // Force a hard reload of the page
        window.location.reload();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setNotification({ type: 'error', message: "Failed to update profile. Please try again." });
    }
  }, [name, email, businessName, session, update]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {notification && (
        <div className={`p-4 mb-4 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
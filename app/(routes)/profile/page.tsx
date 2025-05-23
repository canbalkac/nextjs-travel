"use client";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div className="text-red-500">Login required.</div>;
  if (session) {
    return null;
  }
  return (
    <div className="p-6 max-w-md mx-auto mt-24 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4"> Profile Information</h1>
      <p>
        <strong>ID:</strong> {session.user?.id}
      </p>
      <p>
        <strong>First Name:</strong> {session.user?.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {session.user?.lastName}
      </p>
      <p>
        <strong>Email:</strong> {session.user?.email}
      </p>
      <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
        {JSON.stringify(session.user.token, null, 2)}
      </pre>
      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="cursor-pointer"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default ProfilePage;

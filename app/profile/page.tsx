"use client";

import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  if (!user) return <p className="text-center mt-10">Not logged in</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
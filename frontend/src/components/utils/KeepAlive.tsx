"use client";

import { useEffect } from "react";

export default function KeepAlive() {
  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          console.log("Backend keep-alive ping sent");
        }
      } catch (error) {
        console.log("Keep-alive ping failed (backend may be sleeping):", error);
      }
    };

    pingBackend();
    const interval = setInterval(pingBackend, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

export default function KeepAlive() {
  useEffect(() => {
    // Ping backend every 5 minutes to keep it awake
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/health`,
          { method: "GET", cache: "no-store" }
        );
        if (response.ok) {
          console.log("✓ Backend keep-alive ping sent");
        }
      } catch (error) {
        console.log("Keep-alive ping failed (backend may be sleeping):", error);
      }
    }, 5 * 60 * 1000); // 5 minutes

    // Initial ping on mount
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, {
        method: "GET",
        cache: "no-store",
      });
    } catch (error) {
      console.log("Initial keep-alive ping failed");
    }

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}

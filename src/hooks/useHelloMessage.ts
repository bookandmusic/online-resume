"use client";

import { useEffect, useState } from "react";

import { HelloData } from "@/types/helloMessage";

export function useHelloMessage() {
  const [data, setData] = useState<HelloData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHello() {
      try {
        const res = await fetch("/api/hello");
        if (!res.ok) throw new Error(`状态码 ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("未知错误");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchHello();
  }, []);

  return { data, loading, error };
}

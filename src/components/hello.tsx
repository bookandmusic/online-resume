"use client";
import { CircleAlert,LoaderIcon } from "lucide-react";

import { useHelloMessage } from "@/hooks/useHelloMessage";

export function HelloMessage() {
  const { data, loading, error } = useHelloMessage();
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <LoaderIcon className="animate-spin text-green-500" size={128} />
        </div>
      )}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <CircleAlert className="text-red-500 mx-auto mb-4" size={128} />
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="text-center py-8">
          <div className="text-xl font-semibold">
            Message from API: {data?.message}
          </div>
        </div>
      )}
    </div>
  );
}

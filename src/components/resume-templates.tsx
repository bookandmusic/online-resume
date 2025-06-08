"use client";

import Image from "next/image";
import Link from "next/link";

import { useTemplates } from "@/hooks/useTemplates";

export default function ResumeTemplates() {
  const { currentItems, page, setPage, totalPages } = useTemplates(6);

  return (
    <main className="flex-1 flex flex-col p-6">
      <div className="flex  flex-col flex-1 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto ">
          {currentItems.map((t) => (
            <Link
              key={t.id}
              href={t.previewUrl}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="aspect-[5/6] relative w-[180px] dark:bg-gray-400">
                {t.coverUrl ? (
                  <Image
                    src={t.coverUrl}
                    alt={t.name}
                    fill
                    sizes="180px"
                    priority
                    className="object-center dark:bg-gray-400"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm dark:bg-gray-400">
                    无封面
                  </div>
                )}
              </div>
              <div className="p-2 text-center font-medium dark:bg-gray-400">
                {t.name}
              </div>
            </Link>
          ))}
        </div>
        {currentItems.length === 0 && (
          <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
            暂无数据
          </div>
        )}
      </div>

      {/* 分页器 */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-3 py-1 rounded border ${
                n === page ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </main>
  );
}

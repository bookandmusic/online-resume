"use client";

import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserProfile({ session }: { session: Session | null }) {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            {session.user?.name?.slice(0, 2).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>退出</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Avatar onClick={() => router.push("/auth/signin")}>
      <AvatarFallback>登录</AvatarFallback>
    </Avatar>
  );
}

export default function Header({ session }: { session: Session | null }) {
  return (
    <>
      {/* 顶部导航栏 */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        {/* 左侧标题 */}
        <h1 className="text-xl font-bold">在线简历</h1>

        {/* 右侧区域：ModeToggle 和 UserProfile */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserProfile session={session} />
        </div>
      </header>
    </>
  );
}

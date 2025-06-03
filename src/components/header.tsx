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
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="secondary" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}> 
      {
        theme === "light" ? <Moon /> : <Sun />
      }
    </Button>
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
        <DropdownMenuItem onClick={()=>{router.push("/admin")}}>后台</DropdownMenuItem>
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
  const router = useRouter();
  return (
    <>
      {/* 顶部导航栏 */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        {/* 左侧标题 */}
        
        <Button variant="link" onClick={() => router.push("/")}><h1 className="text-xl font-bold">在线简历</h1></Button>

        {/* 右侧区域：ModeToggle 和 UserProfile */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserProfile session={session} />
        </div>
      </header>
    </>
  );
}

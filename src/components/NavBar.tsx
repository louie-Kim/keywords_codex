"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Moon, Sun, User, Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, setTheme } = useTheme();
  // const { toggleSidebar } = useSidebar();

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`/api?keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();

      alert(`프론트에서 데이터 확인: ${JSON.stringify(data)}`);

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.related || []);
      }
    } catch (err: unknown) {
      let message = "검색 중 오류 발생";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-2 flex items-center justify-end sticky top-0 bg-background z-10 shadow-sm">
        <div className="flex flex-col items-start justify-between p-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {/* <Link href="/">Dashboard</Link> */}
              {/* THEME MENU */}
            </div>

            {/* USER MENU */}
            {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          </div>

          <div className="flex gap-4 mt-2">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="네이버 연관검색어 입력하세요"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-64"
            />
            <Button onClick={handleSearch}>검색</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
          </div>

          {loading && <Skeleton className="w-96 h-10 mb-4" />}
          {error && (
            <Alert className="w-96 mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && results.length > 0 && (
            <Card className="w-90 mt-6">
              <CardHeader>검색 결과</CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <ul className="space-y-2">
                    {results.map((r, i) => (
                      <li key={i} className="border-b py-2 last:border-none">
                        {r}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

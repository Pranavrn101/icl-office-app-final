"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://192.168.1.7:3005/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`Login successful for user: ${username}`);
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        // Log and show specific messages based on backend response
        if (data.message === "User does not exist") {
          console.warn(`Login failed: User does not exist: ${username}`);
          toast({
            title: "Login Failed",
            description: "User does not exist.",
            variant: "destructive",
          });
        } else if (data.message === "Invalid credentials") {
          console.warn(`Login failed: Wrong credentials for user: ${username}`);
          toast({
            title: "Login Failed",
            description: "Incorrect username or password.",
            variant: "destructive",
          });
        } else {
          console.warn(`Login failed: ${data.message || "Unknown error"}`);
          toast({
            title: "Login Failed",
            description: data.message || "Unknown error occurred.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Login request error:", error);
      toast({
        title: "Login Failed",
        description: "Network or server error. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-[360px] shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-lg">Office Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full bg-[#142d6a] text-white">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


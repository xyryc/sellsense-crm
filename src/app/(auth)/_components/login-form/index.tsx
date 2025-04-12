"use client";

import { useRef } from "react";
import useLoginHandler from "./hooks/useLoginHandler";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUserRound } from "lucide-react";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { error, handleFormSubmit } = useLoginHandler();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleGuestLogin = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "admin@gmail.com";
      passwordRef.current.value = "admin123";
      // Trigger form submission
      emailRef.current.form?.requestSubmit();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sellsense</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="grid gap-6">
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your Email"
                required
                ref={emailRef}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your Password"
                required
                ref={passwordRef}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="relative text-center my-4 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="*:w-full">
            <Button variant="outline" onClick={handleGuestLogin}>
              <CircleUserRound className="mr-2" /> Guest Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

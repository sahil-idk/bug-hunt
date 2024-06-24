"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Button } from "./ui/button";
import { Loader2, Loader2Icon } from "lucide-react";

export function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <Button>
        <SignInButton />
        </Button>
      
      </Unauthenticated>

      <Authenticated>
        <UserButton />
      </Authenticated>

      <AuthLoading>
        <Button>
        <Loader2Icon/>
        </Button>
      </AuthLoading>
    </>
  );
}
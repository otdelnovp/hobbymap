"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function AuthenticationError({ error }: { error?: string }) {
  useEffect(() => {
    if (error) {
      setTimeout(
        () =>
          toast.error(
            `Auth error: ${
              error === "OAuthAccountNotLinked"
                ? "You already have an account linked to this mail through another authorization method"
                : error
            }`,
          ),
        1,
      );
    }
  });
  return null;
}

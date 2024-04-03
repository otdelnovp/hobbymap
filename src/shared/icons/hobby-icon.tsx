"use client";

import { getProfileDisplayHobbyIcon } from "@/entities/user/profile";
import { Hobby } from "@/kernel/domain/user";
import { type ClassValue } from "clsx";
import { cn } from "../ui/utils";

export const HobbyIcon = ({
  hobby,
  className,
}: {
  hobby: Hobby;
  className?: string;
}) => {
  return getProfileDisplayHobbyIcon(
    hobby,
    cn("w-5 h-5 mr-1.5 inline-block align-[-0.3em]", className),
  );
};

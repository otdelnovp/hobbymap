"use client";

import { Hobby } from "@/kernel/domain/user";
import { Car, Webhook, Plane } from "lucide-react";

const iconComponents = {
  RCCAR: Car,
  DRONE: Webhook,
  RCPLANE: Plane,
};

export const getProfileDisplayHobbyIcon = (
  iconName: Hobby,
  props: { className?: string } = {
    className: "w-5 h-5 mr-1.5 inline-block align-[-0.3em]",
  },
) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent {...props} />;
};

"use client";

import { Hobby } from "@/kernel/domain/user";
import { DroneIcon } from "@/shared/icons/drone-icon";
import { RCCarIcon } from "@/shared/icons/rccar-icon";
import { Plane } from "lucide-react";

const iconComponents = {
  RCCAR: RCCarIcon,
  DRONE: DroneIcon,
  RCPLANE: Plane,
};

export const getProfileDisplayHobbyIcon = (
  iconName: Hobby,
  className?: string,
) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent className={className} />;
};

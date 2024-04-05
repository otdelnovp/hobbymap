"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { Switch } from "@/shared/ui/switch";
import { Label } from "@/shared/ui/label";

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </Switch>
      <Label htmlFor="airplane-mode">
        {theme === "dark" ? "Dark" : "Light"} theme
      </Label>
    </div>
  );
}

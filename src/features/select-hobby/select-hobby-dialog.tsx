"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import {
  getLocalStorage,
  setLocalStorage,
} from "@/shared/hooks/useLocalStorage";

import { SelectHobby } from "./select-hobby";
import { useUpdateHobby } from "./_vm/use-update-hobby";

export const SelectHobbyDialog = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const updateHobby = useUpdateHobby();

  useEffect(() => {
    const localHobby = getLocalStorage("hobby", true);
    const sessionHobby = session?.user.hobby;

    if (!localHobby && sessionHobby) {
      setLocalStorage("hobby", sessionHobby, true);
    } else if (session?.user && localHobby && !sessionHobby) {
      updateHobby.update({
        userId: session?.user.id,
        hobby: localHobby,
      });
    } else if (!localHobby && !sessionHobby) {
      handleOpenDialog();
    }
  }, [session?.user, updateHobby]);

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Select hobby</DialogTitle>
          <DialogDescription>
            You need to select a hobby to see the locations that interest you on
            the map.
          </DialogDescription>
        </DialogHeader>
        <SelectHobby onChange={handleCloseDialog} session={session} />
      </DialogContent>
    </Dialog>
  );
};

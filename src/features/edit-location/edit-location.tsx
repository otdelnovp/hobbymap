"use client";

import { Edit, Plus } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

import { SharedUser } from "@/kernel/domain/user";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { Location } from "@/entities/location/location";

import { LocationForm } from "./_ui/location-form";

export function EditLocation({
  user,
  location,
}: {
  user: SharedUser;
  location?: Location;
}) {
  const session = useAppSession();
  const authorizedUser = user || session.data?.user;

  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      {location ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1"
          onClick={handleOpenDialog}
        >
          <Edit className="h-5 w-5" />
        </Button>
      ) : (
        <Button variant="outline" onClick={handleOpenDialog}>
          <Plus className="mr-1.5 h-5 w-5" />
          Add location
        </Button>
      )}
      <Dialog open={open} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{location ? "Edit" : "Add"} location</DialogTitle>
            <DialogDescription>
              A point on the map where your fellow hobbyists can come.
            </DialogDescription>
          </DialogHeader>
          <LocationForm
            user={authorizedUser}
            location={location}
            onSuccess={handleCloseDialog}
            submitText={location ? "Save changes" : "Add location"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

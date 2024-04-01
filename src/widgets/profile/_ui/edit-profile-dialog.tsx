import { UserId } from "@/kernel/domain/user";

import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import { Edit } from "lucide-react";

export function EditProfileDialog({ userId }: { userId: UserId }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="h-4 w-4 ml-2 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            This is how other users will see you on this site
          </DialogDescription>
        </DialogHeader>
        <UpdateProfileForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
}

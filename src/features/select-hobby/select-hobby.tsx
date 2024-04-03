"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { Spinner } from "@/shared/icons/spinner";
import { HobbyIcon } from "@/shared/icons/hobby-icon";
import { Hobby, HobbyDict } from "@/kernel/domain/user";

import {
  getLocalStorage,
  setLocalStorage,
} from "@/shared/hooks/useLocalStorage";

import { useUpdateHobby } from "./_vm/use-update-hobby";

export const SelectHobby = ({
  session,
  onChange,
}: {
  session: Session | null;
  onChange?: (newHobby: Hobby) => void;
}) => {
  const router = useRouter();
  const sessionHobby = session?.user?.hobby;

  const [hobbyType, setHobbyType] = useState<Hobby | undefined>(
    sessionHobby ?? undefined,
  );
  const updateHobby = useUpdateHobby();

  useEffect(() => {
    const localHobby = getLocalStorage("hobby", true);
    setHobbyType(localHobby || sessionHobby);
  }, [session?.user, updateHobby, sessionHobby]);

  const handleHobbyChange = async (newHobby: Hobby) => {
    setHobbyType(newHobby);
    if (newHobby) setLocalStorage("hobby", newHobby, true);

    if (session?.user) {
      await updateHobby.update({
        userId: session.user.id,
        hobby: newHobby,
      });
    }

    router.refresh();
    onChange?.(newHobby);
  };

  const iconProps = {
    className: "w-5 h-5 mr-1.5 inline-block align-[-0.3em]",
  };

  return (
    <div>
      <Select
        onValueChange={handleHobbyChange}
        value={hobbyType}
        defaultValue={hobbyType}
        disabled={updateHobby.isPending}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select your hobby" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.keys(HobbyDict).map((hobbyKey) => (
              <SelectItem key={hobbyKey} value={hobbyKey}>
                {updateHobby.isPending ? (
                  <Spinner {...iconProps} />
                ) : (
                  <HobbyIcon hobby={hobbyKey as keyof typeof HobbyDict} />
                )}
                {HobbyDict[hobbyKey as keyof typeof HobbyDict]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

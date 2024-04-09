"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  UserId,
  ROLES,
  RoleDict,
  HOBBY,
  HobbyDict,
} from "@/kernel/domain/user";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { setLocalStorage } from "@/shared/hooks/useLocalStorage";
import { isOwner } from "@/entities/user/_domain/ability";
import { Profile } from "@/entities/user/profile";

import { useUpdateProfile } from "../_vm/use-update-profile";
// import { AvatarField } from "./avatar-field";

import { AtSign, Contact, Instagram, Facebook, Send } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/icons/spinner";
import { Separator } from "@/shared/ui/separator";
import { HobbyIcon } from "@/shared/icons/hobby-icon";

const profileFormSchema = z.object({
  name: z
    .string()
    .trim()
    .max(30, {
      message: "Username cannot be longer than 30 characters.",
    })
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  role: z.nativeEnum(ROLES).optional(),
  hobby: z.nativeEnum(HOBBY),
  instagram: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^(?!http.*$).*/, {
      message: "Only user username, not full domain",
    })
    .optional(),
  facebook: z.z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^(?!http.*$).*/, {
      message: "Only user username, not full domain",
    })
    .optional(),
  telegram: z.z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^(?!http.*$).*/, {
      message: "Only user username, not full domain",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getDefaultValues = (profile: Profile) => ({
  id: profile.id,
  email: profile.email,
  image: profile.image ?? undefined,
  name: profile.name ?? "",
  role: profile.role,
  hobby: profile.hobby ?? undefined,
  instagram: profile.instagram ?? undefined,
  facebook: profile.facebook ?? undefined,
  telegram: profile.telegram ?? undefined,
});

export function ProfileForm({
  onSuccess,
  submitText = "Save",
  profile,
  userId,
}: {
  userId: UserId;
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const session = useAppSession();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  const updateProfile = useUpdateProfile();

  const handleSubmit = form.handleSubmit(async (data) => {
    const newProfile = await updateProfile.update({
      userId,
      data,
    });

    form.reset(getDefaultValues(newProfile.profile));

    if (newProfile.profile.hobby)
      setLocalStorage("hobby", newProfile.profile.hobby, true);
    onSuccess?.();
  });

  const iconFieldProps = {
    className: "w-5 h-5 mr-1.5 inline-block align-[-0.3em]",
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-3">
        <FormField
          control={form.control}
          name="email"
          disabled={!isOwner(session.data?.user)}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-7">
              <FormLabel>
                <AtSign {...iconFieldProps} />
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          disabled={!isOwner(session.data?.user)}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-5">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isOwner(session.data?.user)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(RoleDict).map((roleKey) => (
                        <SelectItem key={roleKey} value={roleKey}>
                          {RoleDict[roleKey as keyof typeof RoleDict]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-7">
              <FormLabel>
                <Contact {...iconFieldProps} />
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="This is your public display name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hobby"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-5">
              <FormLabel>Hobby</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hobby" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(HobbyDict).map((hobbyKey) => (
                        <SelectItem key={hobbyKey} value={hobbyKey}>
                          <HobbyIcon
                            hobby={hobbyKey as keyof typeof HobbyDict}
                          />
                          {HobbyDict[hobbyKey as keyof typeof HobbyDict]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="col-span-12 mt-4 mb-2" />
        <h2 className="col-span-12 text-md font-semibold">Social profiles</h2>

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-4">
              <FormLabel>
                <Instagram {...iconFieldProps} />
                Instagram
              </FormLabel>
              <FormControl>
                <Input placeholder="Instagram login" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-4">
              <FormLabel>
                <Facebook {...iconFieldProps} />
                Facebook
              </FormLabel>
              <FormControl>
                <Input placeholder="Facebook login" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telegram"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-4">
              <FormLabel>
                <Send {...iconFieldProps} />
                Telegram
              </FormLabel>
              <FormControl>
                <Input placeholder="Telegram login" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="image"
          disabled
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <AvatarField
                  value={field.value}
                  onChange={field.onChange}
                  name={form.watch("name") ?? ""}
                  email={form.watch("email") ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="col-span-12 lg:col-span-4 !mt-3">
          <Button type="submit" className="w-full lg:w-auto">
            {updateProfile.isPending && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-label="Update profile"
              />
            )}
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

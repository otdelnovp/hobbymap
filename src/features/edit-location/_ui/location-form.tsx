"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { HOBBY, HobbyDict, SharedUser } from "@/kernel/domain/user";
import { isOwner } from "@/entities/user/_domain/ability";
import { getProfileDisplayHobbyIcon } from "@/entities/user/profile";

import { useUpdateLocation } from "../_vm/use-update-location";
import { useCreateLocation } from "../_vm/use-create-location";

import { Globe } from "lucide-react";

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
import { Spinner } from "@/shared/ui/spinner";
import { Location } from "@/entities/location/location";
import { Textarea } from "@/shared/ui/textarea";
import { Separator } from "@/shared/ui/separator";

const profileFormSchema = z.object({
  title: z.string().trim().max(50, {
    message: "Location name cannot be longer than 50 characters.",
  }),
  description: z.string().trim().optional(),
  hobby: z.nativeEnum(HOBBY),
  latitude: z.number(),
  // .min(-90, "Its not correct coord")
  // .max(90, "Its not correct coord"),
  longitude: z.number(),
  // .min(-90, "Its not correct coord")
  // .max(90, "Its not correct coord"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getDefaultValues = (location: Partial<Location>) => ({
  id: location.id,
  title: location.title,
  description: location.description ?? undefined,
  hobby: location.hobby,
  latitude: location.latitude,
  longitude: location.longitude,
});

export function LocationForm({
  user,
  location,
  onSuccess,
  submitText = "Save",
}: {
  user: SharedUser;
  location?: Location;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: location ? getDefaultValues(location) : {},
  });

  const updateLocation = useUpdateLocation();
  const createLocation = useCreateLocation();
  const isPending = updateLocation.isPending || createLocation.isPending;

  const handleSubmit = form.handleSubmit(async (data) => {
    const newLocation = location?.id
      ? await updateLocation.update({
          locationId: location.id,
          location: data,
        })
      : await createLocation.update({
          userId: user.id,
          location: { ...data, userId: user.id },
        });

    form.reset(getDefaultValues(newLocation.location));

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
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="This is your location public title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={!isOwner(user)}
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of this location"
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
            <FormItem className="col-span-12 lg:col-span-6">
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
                          {getProfileDisplayHobbyIcon(
                            hobbyKey as keyof typeof HobbyDict,
                          )}
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
        <h2 className="col-span-12 text-md font-semibold">
          <Globe {...iconFieldProps} />
          Geo locations
        </h2>

        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-6">
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(+e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-6">
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(+e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 lg:col-span-4 !mt-3">
          <Button
            type="submit"
            className="w-full lg:w-auto"
            disabled={isPending}
          >
            {isPending && (
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

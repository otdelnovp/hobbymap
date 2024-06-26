"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { HOBBY, HobbyDict, SharedUser } from "@/kernel/domain/user";

import { useUpdateLocation } from "../_vm/use-update-location";
import { useCreateLocation } from "../_vm/use-create-location";

import { HobbyIcon } from "@/shared/icons/hobby-icon";
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
import { Location } from "@/entities/location/location";
import { Textarea } from "@/shared/ui/textarea";

const profileFormSchema = z.object({
  title: z.string().trim().max(50, {
    message: "Location name cannot be longer than 50 characters.",
  }),
  description: z.string().trim().optional(),
  hobby: z.nativeEnum(HOBBY),
  latitude: z.number().readonly(),
  longitude: z.number().readonly(),
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
  location?: Partial<Location>;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: location
      ? getDefaultValues(location)
      : { hobby: user.hobby || undefined },
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
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of this location"
                  rows={2}
                  className="min-h-16"
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
            <FormItem className="col-span-12">
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

        <div className="col-span-12 !mt-3">
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

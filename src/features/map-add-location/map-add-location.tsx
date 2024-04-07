"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SharedUser } from "@/kernel/domain/user";

import Map from "../../widgets/map/map";
import { MapAddLocationPoint } from "./_ui/map-add-point";

export default function MapAddLocation({
  user,
  callbackUrl,
}: {
  user?: SharedUser;
  callbackUrl?: string;
}) {
  const router = useRouter();
  useEffect(() => {
    toast("Click on the map to create your hobby location");
  });
  return (
    <>
      <Map zoom={13}>
        <MapAddLocationPoint
          user={user}
          onSuccess={() => {
            toast.success("New location added!");
            router.push(callbackUrl || "/");
          }}
        />
      </Map>
    </>
  );
}

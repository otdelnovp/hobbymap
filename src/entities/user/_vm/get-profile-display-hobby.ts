import { Profile } from "../_domain/types";

export const getProfileDisplayHobby = (profile: Profile) => {
  return profile.hobby === "DRONE"
    ? "FPV Drone"
    : profile.hobby === "RCCAR"
      ? "RC Car"
      : "RC Airplane";
};

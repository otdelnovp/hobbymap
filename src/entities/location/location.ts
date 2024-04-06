export {
  getLocationsQuery,
  useInvalidateLocations,
  getLocationQuery,
  useInvalidateLocation,
} from "./_queries";
export type { Location, LocationId, Coord } from "./_domain/types";
export { locationSchema } from "./_domain/schema";
export { getMapIcon } from "./_vm/get-map-icon";

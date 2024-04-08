export {
  getLocationsQuery,
  useInvalidateLocations,
} from "./_queries/get-locations-query";
export {
  getLocationQuery,
  useInvalidateLocation,
} from "./_queries/get-location-query";
export type { Location, LocationId, Coord } from "./_domain/types";
export { locationSchema } from "./_domain/schema";
export { getMapIcon } from "./_vm/get-map-icon";

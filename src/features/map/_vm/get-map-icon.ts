import { Hobby } from "@/kernel/domain/user";
import { Icon } from "leaflet";

const greyIcon = "/icons/marker-grey.png";
const redIcon = "/icons/marker-red.png";
const greenIcon = "/icons/marker-green.png";
const blueIcon = "/icons/marker-blue.png";

const iconColors: Record<Hobby, string> = {
  RCCAR: greenIcon,
  DRONE: redIcon,
  RCPLANE: blueIcon,
};

export const getMapIcon = (hobby: Hobby) =>
  new Icon({
    iconUrl: iconColors[hobby],
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

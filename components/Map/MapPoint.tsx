'use client';

import { Marker, Tooltip, Popup } from 'react-leaflet';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { LocationType } from '@/helpers/locationHelper';
import { getDateStr } from '@/helpers/dateHelper';

export const MapPoint = ({ locationItem }: { locationItem: LocationType }) => {
  return locationItem.latitude && locationItem.longitude ? (
    <Marker position={[locationItem.latitude, locationItem.longitude]}>
      <Tooltip>{locationItem.title}</Tooltip>
      <Popup>
        <Box sx={{ width: 250 }}>
          <Typography component="div" variant="body1">
            {locationItem.title}
          </Typography>
          <Typography component="div" variant="body2">
            {locationItem.description}
          </Typography>
          <Typography component="div" variant="caption" color="gray">
            <a
              href={`https://maps.google.com?saddr=Current+Location&daddr=${locationItem.latitude},${locationItem.longitude}`}
              target="_blank"
              rel="noopener noreferrer">
              построить маршрут
            </a>
            <Box>
              автор:{' '}
              {locationItem.user?.instagram ||
                locationItem.user?.telegram ||
                locationItem.user?.name}
            </Box>
            <Box>добавлена: {getDateStr(locationItem?.createdAt)}</Box>
          </Typography>
        </Box>
      </Popup>
    </Marker>
  ) : null;
};

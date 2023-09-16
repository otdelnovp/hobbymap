import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaceIcon from '@mui/icons-material/Place';

import { User } from '@/helpers/authHelper';
import { getDateStr } from '@/helpers/dateHelper';
import { LocationType } from '@/helpers/locationHelper';

import { LocationEdit } from '@/components/Location/LocationEdit';

export const LocationList = ({
  user,
  locationList,
}: {
  user: User;
  locationList: LocationType[];
}) => {
  const locationTemplate = (locationItem: LocationType) => (
    <ListItem
      alignItems="flex-start"
      key={locationItem.id}
      secondaryAction={<LocationEdit user={user} locationItem={locationItem} />}>
      <ListItemIcon>
        <PlaceIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText>
        {locationItem.title}
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
          <Box>{locationItem.hobby}</Box>
          <Box>
            автор:{' '}
            {locationItem.user?.instagram || locationItem.user?.telegram || locationItem.user?.name}
          </Box>
          <Box>добавлена: {getDateStr(locationItem?.createdAt)}</Box>
        </Typography>
      </ListItemText>
    </ListItem>
  );

  return (
    <>
      <LocationEdit user={user} locationItem={{}} />
      {locationList?.length ? (
        <List>{locationList?.map(locationItem => locationTemplate(locationItem))}</List>
      ) : null}
    </>
  );
};

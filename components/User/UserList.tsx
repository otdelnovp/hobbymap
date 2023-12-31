import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { getDateStr } from '@/helpers/dateHelper';
import { type User, isUserRoot } from '@/helpers/authHelper';

import { UserEdit } from '@/components/User/UserEdit';

export const UserList = ({ user, userList }: { user: User; userList: User[] }) => {
  const userTemplate = (userItem: User) => (
    <ListItem
      alignItems="flex-start"
      key={userItem?.id}
      secondaryAction={isUserRoot(user) && <UserEdit userItem={userItem} />}>
      <ListItemAvatar>
        <Avatar alt={userItem?.name} src={userItem?.image ?? undefined} />
      </ListItemAvatar>
      <ListItemText>
        <Box>
          {userItem?.name}
          {userItem?.role === 'admin' && (
            <Typography component="span" variant="caption" color="red" sx={{ pl: 1 }}>
              {userItem?.role}
            </Typography>
          )}
        </Box>
        <Typography component="div" variant="caption" color="gray">
          {userItem?.email}
          {userItem?.instagram ? (
            <Box>
              <a
                href={`https://instagram.com/${userItem?.instagram}/`}
                target="_blank"
                rel="noopener noreferrer">
                instagram.com/{userItem?.instagram}
              </a>{' '}
            </Box>
          ) : null}
          {userItem?.telegram ? (
            <Box>
              <a
                href={`https://t.me/${userItem?.telegram}/`}
                target="_blank"
                rel="noopener noreferrer">
                t.me/{userItem?.telegram}
              </a>{' '}
            </Box>
          ) : null}
          <Box>{getDateStr(userItem?.createdAt)}</Box>
        </Typography>
      </ListItemText>
    </ListItem>
  );

  return userList?.length ? <List>{userList?.map(userItem => userTemplate(userItem))}</List> : null;
};

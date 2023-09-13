import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { getServerSideData } from '@/instance/fetch';
import { type User, isUserAdmin, isUserRoot } from '@/helpers/authHelper';
import { getDateStr } from '@/helpers/dateHelper';

import { UserEdit } from '@/components/User/UserEdit';

export default async function Users() {
  const session = await getServerSession(authConfig);
  if (!isUserAdmin(session?.user)) return null;

  const users: User[] = await getServerSideData({ url: '/api/users', cache: 'no-store' });

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ px: 2 }}>
        User list
      </Typography>
      {users ? (
        <List>
          {users?.map(userItem => (
            <ListItem alignItems="flex-start" key={userItem?.id} secondaryAction={isUserRoot(session?.user) && <UserEdit userItem={userItem} />}>
              <ListItemAvatar>
                <Avatar alt={userItem?.name} src={userItem?.image ?? undefined} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    {userItem?.name}
                    {userItem?.role === 'admin' ? (
                      <Typography component="span" variant="caption" color="red" sx={{ pl: 1 }}>
                        {userItem?.role}
                      </Typography>
                    ) : null}
                  </>
                }
                secondary={
                  <>
                    {userItem?.email}
                    <Typography component="span" variant="caption" color="GrayText" sx={{ pl: 1 }}>
                      &ndash; {getDateStr(userItem?.createdAt)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : null}
    </>
  );
}

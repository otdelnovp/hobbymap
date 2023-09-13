import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { type User, isUserAdmin } from '@/helpers/authHelper';
import { getData } from '@/helpers/fetchHelper';

export default async function Users() {
  const session = await getServerSession(authConfig);
  if (!isUserAdmin(session?.user)) return null;

  const users: User[] = await getData({ url: '/api/users', cache: 'no-store' });

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 2 }}>
        {users ? (
          <List>
            {users?.map(userItem => (
              <ListItem alignItems="flex-start" key={userItem?.id}>
                <ListItemAvatar>
                  <Avatar alt={userItem?.name} src={userItem?.image ?? undefined} />
                </ListItemAvatar>
                <ListItemText primary={userItem?.name} secondary={userItem?.email} />
              </ListItem>
            ))}
          </List>
        ) : null}
      </Paper>
    </Container>
  );
}

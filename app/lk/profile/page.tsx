import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { UserEdit } from '@/components/User/UserEdit';

import { getDateStr } from '@/helpers/dateHelper';

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <>
      <Typography component="h1" variant="h3">
        Profile
      </Typography>
      <ListItem alignItems="flex-start" secondaryAction={<UserEdit userItem={session?.user} />}>
        <ListItemAvatar>
          <Avatar alt={session?.user?.name} src={session?.user?.image ?? undefined} />
        </ListItemAvatar>
        <ListItemText>
          <Box>
            {session?.user?.name}
            {session?.user?.role === 'admin' && (
              <Typography component="span" variant="caption" color="red" sx={{ pl: 1 }}>
                {session?.user?.role}
              </Typography>
            )}
          </Box>
          <Typography component="div" variant="caption" color="gray">
            {session?.user?.email}
            {session?.user?.instagram ? (
              <Box>
                <a
                  target="_blank"
                  href={`https://instagram.com/${session?.user?.instagram}/`}
                  rel="noopener noreferrer">
                  instagram.com/{session?.user?.instagram}
                </a>{' '}
              </Box>
            ) : (
              <Box>instagram.com/&mdash;</Box>
            )}
            {session?.user?.telegram ? (
              <Box>
                <a
                  target="_blank"
                  href={`https://t.me/${session?.user?.telegram}/`}
                  rel="noopener noreferrer">
                  t.me/{session?.user?.telegram}
                </a>{' '}
              </Box>
            ) : null}
            <Box>{getDateStr(session?.user?.createdAt)}</Box>
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from '@/instance/axios';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { hobbyTypes } from '@/helpers/dictionaryHelper';
import { getLocalStorage, setLocalStorage } from '@/hooks/useLocalStorage';

export const HobbySelect = () => {
  const session = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [hobbyType, setHobbyType] = useState<string | undefined>();
  const handleChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setHobbyType(value);
    setLocalStorage('hobby', value);
    onAddHobby(value);
  };

  const onAddHobby = (hobby: string) => {
    axios
      .patch(`/api/users/${session.data?.user?.id}`, { hobby })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        handleCloseDialog();
        router.refresh();
      });
  };

  useEffect(() => {
    const localHobby = getLocalStorage('hobby');
    const sessionHobby = session.data?.user?.hobby;
    if (!localHobby && sessionHobby) {
      setHobbyType(sessionHobby);
      setLocalStorage('hobby', sessionHobby);
    } else if (session.data?.user && localHobby && !sessionHobby) {
      onAddHobby(localHobby);
    } else if (!localHobby && !sessionHobby) {
      handleOpenDialog();
    }
  }, []);

  return (
    <Dialog open={open} fullWidth={true} maxWidth="xs" onClose={handleCloseDialog}>
      <DialogTitle>Select your hobby</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>
          You need to select your hobby to see the locations you are interested in on the map
        </DialogContentText>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={hobbyType}
          onChange={handleChange}
          input={<OutlinedInput />}
          fullWidth>
          {hobbyTypes.map(hobbyTypeItem => (
            <MenuItem key={hobbyTypeItem.value} value={hobbyTypeItem.value}>
              {/* <ListItemIcon>
                <hobbyTypeItem.icon />
              </ListItemIcon> */}
              <ListItemText primary={hobbyTypeItem.name} />
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
    </Dialog>
  );
};

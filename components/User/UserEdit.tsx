'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from '@/instance/axios';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { isUserAdmin, isUserRoot, type User } from '@/helpers/authHelper';

export const UserEdit = ({ userItem }: { userItem: User }) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [body, setBody] = useState({ ...userItem });
  const handleFieldChange = (e: any) => {
    const { name, value, checked } = e.target;
    setBody(prevBody => ({
      ...prevBody,
      [name]: name === 'role' ? (checked ? 'admin' : 'user') : value,
    }));
  };

  const updateSession = async () => {
    await update({
      ...session,
      user: { ...body },
    });
    router.refresh();
  };

  const onSave = () => {
    axios
      .patch(`/api/users/${body.id}`, body)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        if (session?.user?.id === body.id) updateSession();
        handleCloseDialog();
        router.refresh();
      });
  };

  return (
    <>
      <IconButton aria-label="edit">
        <EditIcon sx={{ opacity: 0.5 }} onClick={handleOpenDialog} />
      </IconButton>
      <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={handleCloseDialog}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>User card information</DialogContentText>
          <Grid container spacing={2} component="form">
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                value={body.name}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                disabled
                value={body.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="instagram"
                label="Your instagram nik"
                fullWidth
                variant="outlined"
                value={body.instagram}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="telegram"
                label="Your telegram nik"
                fullWidth
                variant="outlined"
                value={body.telegram}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch checked={isUserAdmin(body)} name="role" onChange={handleFieldChange} />
                }
                label="Is user admin"
                disabled={!isUserRoot(session?.user)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

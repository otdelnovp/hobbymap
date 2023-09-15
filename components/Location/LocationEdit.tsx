'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/instance/axios';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { User } from '@/helpers/authHelper';
import { LocationType } from '@/helpers/locationHelper';
import { hobbyTypes } from '@/helpers/dictionaryHelper';

export const LocationEdit = ({
  user,
  locationItem,
}: {
  user: User;
  locationItem: LocationType;
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [body, setBody] = useState({ ...locationItem });
  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = event.target;
    setBody(prevBody => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const onSave = () => {
    axios[body.id ? 'patch' : 'post'](`/api/locations/${body.id ?? ''}`, {
      ...body,
      latitude: Number(body.latitude),
      longitude: Number(body.longitude),
      userId: user?.id,
    })
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

  return (
    <>
      {!locationItem.id ? (
        <Button variant="outlined" onClick={handleOpenDialog} sx={{ mb: 2 }}>
          Add location
        </Button>
      ) : (
        <IconButton aria-label="edit">
          <EditIcon sx={{ opacity: 0.5 }} onClick={handleOpenDialog} />
        </IconButton>
      )}
      <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={handleCloseDialog}>
        <DialogTitle>{body.id ? 'Edit' : 'Add'} location</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Location card information</DialogContentText>
          <Grid container spacing={2} component="form">
            <Grid item xs={12}>
              <Select
                name="hobby"
                value={body.hobby}
                placeholder="Select hobby type"
                onChange={handleFieldChange}
                fullWidth>
                {hobbyTypes.map(hobbyTypeItem => (
                  <MenuItem key={hobbyTypeItem.value} value={hobbyTypeItem.value}>
                    <ListItemText primary={hobbyTypeItem.name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                value={body.title}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={body.description}
                onChange={handleFieldChange}
                multiline={true}
                rows={2}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="latitude"
                label="Latitude"
                type="number"
                value={body.latitude}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="longitude"
                label="Longitude"
                type="number"
                value={body.longitude}
                onChange={handleFieldChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSave}>
            {body.id ? 'Save location' : 'Add location'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

import { Button, Divider, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
  coordinates: number[],
  addToCache (id: number, data: Hedgehog): void,
}

export function HedgehogForm({ coordinates, addToCache }: Props) {
  const [formData, setFormData] =  useState<Hedgehog>({
    name: '',
    sex: '',
    location: [null, null]
  })

  useEffect(() => {
    setFormData( {...formData, location: coordinates})
  }, [coordinates])

  const handleSexChange = (event: SelectChangeEvent) => {
    setFormData( {...formData, sex: event.target.value} )
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setFormData({...formData, name: event.target.value} )
  }

  const postHedgehogSighting = async (_e: any ) => {
    const response = await fetch('/api/v1/hedgehog/new', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    const json = await response.json();
    addToCache(json.response.id, json.response);

  }

  const isFormValid = Object.values(formData).every(value => value);
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        padding: "1em",
      }}
    >
      <Typography>
        Add new hedgehog sighting!
      </Typography>
      <Stack direction="row">
        <FormControl>
          <TextField
            fullWidth margin="dense"
            value={formData.name} id="name" label="name" onChange={handleNameChange}
          />
        </FormControl>

        <FormControl>
          <InputLabel>Sex</InputLabel>
          <Select
            fullWidth
            margin="dense"
            value={formData.sex}
            id="sex"
            label="Sex"
            onChange={handleSexChange}
          >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Divider/>
      <Stack direction="row">
        <FormControl>
          <TextField
            disabled fullWidth margin="dense"
            value={formData.location[0]} id="latitude" label="Latitude"
          />
        </FormControl>

        <FormControl>
          <TextField
            disabled fullWidth margin="dense"
            value={formData.location[1]} id="longitude" label="longitude"
          />
        </FormControl>

        <Button size="medium" variant="contained" disabled={!isFormValid} onClick={postHedgehogSighting}>
          Post sighting!
        </Button>
      </Stack>
      <br />
    </Paper>
  );
}

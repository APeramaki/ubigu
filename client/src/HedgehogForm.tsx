import { Button, Divider, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Hedgehog, hedgehogSchema } from "@shared/hedgehog";

interface Props {
  coordinates: number[],
  addToCache (id: number, data: Hedgehog): void,
}

export function HedgehogForm({ coordinates, addToCache }: Props) {
  const [formData, setFormData] =  useState<Hedgehog>({
    name: '',
    sex: 'Unknown',
    location: [0, 0]
  })

  useEffect(() => {
    setFormData( {...formData, location: coordinates})
  }, [coordinates])

  const handleSexChange = (event: SelectChangeEvent) => {
    const sexSchema = hedgehogSchema.pick({ sex: true });
    const sexParse = sexSchema.safeParse({sex: event.target.value});
    if( sexParse.success ){
      setFormData( {...formData,sex: sexParse.data.sex } );
    } else {
      console.warn("Stop messing with this input!");
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setFormData( {...formData, name: event.target.value} )
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
    const newHedgehog = {...json.response, location: [json.response.location.x, json.response.location.y]}
    addToCache(json.response.id, newHedgehog);
    setFormData( {
      name: '',
      sex: 'Unknown',
      location: [0, 0]
    } )
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
        Lisää siili havainto:
      </Typography>
      <Stack direction="row">
        <FormControl>
          <TextField
            fullWidth margin="dense"
            value={formData.name} id="name" label="name" onChange={handleNameChange}
          />
        </FormControl>

        <FormControl
         sx= {{margin:"0.5em 0 0 0"}}>
          <InputLabel>Sex</InputLabel>
          <Select
           
            fullWidth
            value={formData.sex}
            id="sex"
            label="Sex"
            onChange={handleSexChange}
          >
                <MenuItem value="Male">Uros</MenuItem>
                <MenuItem value="Female">Naaras</MenuItem>
                <MenuItem value="Unknown">Tunnistamaton</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Divider/>

      <Stack direction="row">
        <FormControl>
          <TextField
            disabled fullWidth margin="dense"
            value={formData.location[0] || 0} id="latitude" label="Latitude"
            InputLabelProps={{shrink: true}}
          />
        </FormControl>

        <FormControl>
          <TextField
            disabled fullWidth margin="dense"
            value={formData.location[1] || 0} id="longitude" label="longitude"
            InputLabelProps={{shrink: true}}
          />
        </FormControl>

      </Stack>
      <Button size="medium" variant="contained" disabled={!isFormValid} onClick={postHedgehogSighting}>
          Post sighting!
        </Button>
      <br />
    </Paper>
  );
}

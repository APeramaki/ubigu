import { Paper, Typography, Divider, Stack, Box, Chip } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";


interface Props {
  hedgehogId: number | null;
}

export function HedgehogInfo({ hedgehogId }: Props) {
  const [HedgehogData, setHedgehogData] = useState<Hedgehog | null>(null);
  useEffect(() => {
    if (hedgehogId) {
      fetchHedhehogData(hedgehogId).then( data => {
        setHedgehogData(data.response);
        
      }
      ).catch(error => {
        console.error(`failed to fetch data: `, error);
        setHedgehogData(null);
      })
    } else {

    }
  }, [hedgehogId]);

  const fetchHedhehogData = async (id: number) => {
    const response = await fetch(`/api/v1/hedgehog/${id}`);
    if(!response.ok) {
      throw new Error(`Fetch failed for id: ${id}`);
    }
    return response.json()
  }
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        padding: "1em",
      }}
    > 

      {HedgehogData ? (<>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">{HedgehogData.name} </Typography>
            <Typography variant="h6">{HedgehogData.id ? HedgehogData.id : '_'} </Typography>
          </Stack>
        </Box>
          <Divider></Divider>
        <Box>
          {HedgehogData.sex}
        </Box>
        <Stack direction="row">
          Location:
          <Chip label={HedgehogData.location.x}/>
          <Chip label={HedgehogData.location.y}/>
        </Stack>
      </>
      ) : ( <h3>Pick a hedgehog! </h3>)
      }
    </Paper>

  );
}

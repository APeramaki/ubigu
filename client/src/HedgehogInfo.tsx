import { Paper, Typography, Divider, Stack, Box, Chip } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect } from "react";


interface Props {
  hedgehogId: number | null,
  hedgehogData: Hedgehog | undefined,
  cacheHedgehog (id: number, toCache: Hedgehog): void
}

export function HedgehogInfo(props : Props) {
  const {hedgehogId, hedgehogData, cacheHedgehog} = props;
  useEffect(() => {
    if (hedgehogId && !hedgehogData) {
      fetchHedhehogData(hedgehogId).then( data => {
        const location = [data.response.location.x, data.response.location.y]
        cacheHedgehog(hedgehogId, {...data.response, location: location});
      }).catch(error => {
        console.error(`failed to fetch data: `, error);
      })
    } 
  },[hedgehogId, hedgehogData]);


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

      {hedgehogData ? (<>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">{hedgehogData.name} </Typography>
            <Typography variant="h6">{hedgehogId ? hedgehogId : '_'} </Typography>
          </Stack>
        </Box>
          <Divider></Divider>
        <Box>
          Sukupuoli:{ hedgehogData.sex }
        </Box>
        <Stack direction="row">
          <Typography>Sijainti:</Typography>
          <Chip key={hedgehogData.location[0]} label={hedgehogData.location[0]}/>
          <Chip key={hedgehogData.location[1]} label={hedgehogData.location[1]}/>
        </Stack>
      </>
      ) : ( <h3>Pick a hedgehog! </h3>)
      }
    </Paper>

  );
}

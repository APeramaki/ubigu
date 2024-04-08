import { HedgehogForm } from "./HedgehogForm";
import { HedgehogInfo } from "./HedgehogInfo";
import HedgeHogList from "./HedgehogList";
import { MapView } from "./MapView";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Hedgehog } from "@ubigu/shared/src/hedgehog";

export function App() {
  const [hedgehogCache, setHedgehogCache] = useState<Map<number, Hedgehog|undefined>>(new Map<number, Hedgehog>())
  // Latest coordinates from the Map click event
  const [coordinates, setCoordinates] = useState<number[]>();
  // ID of the currently selected hedgehog
  const [selectedHedgehogId, setSelectedHedgehogId] = useState<number | null>(null);
  
  // Fetch all hedgehog's during startup
  // Fill map with ID's
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/hedgehog");
        if (!res.ok) return;

        const json = await res.json();
        
        json.hedgehogs.map((ele: {id: number}) => ele.id).
          forEach((id: number) => {
            addToCache(id, undefined)
        });
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getAllHedgehogs();
  }, []);

  const handleSelectedHedgehog = (id: number) => {
    setSelectedHedgehogId(id);
  }
  const showCoordinates = () => {
    const coordinatesToShow : GeoJSON.Feature[] = []

    coordinates ? coordinatesToShow.push(
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        properties: {
          name: "",
          sex: "",
        },
      }
    ) : {}

    const selected = selectedHedgehogId ? hedgehogCache.get(selectedHedgehogId): null;
    selected ? coordinatesToShow.push(
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: selected.location,
        },
        properties: {
          name: selected.name,
          sex: selected.sex,
        }
      }
    ) : {}   

    return coordinatesToShow;
  }
  const addToCache = (idToCache: number, toCache: Hedgehog | undefined) => {
    setHedgehogCache((hedgehogCache) => {
      const newCache = new Map<number, Hedgehog | undefined>(hedgehogCache);
      newCache.set(idToCache, toCache);
      return newCache;
    })
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#00B2A0",
          height: "40px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white" }} variant="overline">
          Siilit kartalla
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridAutoColumns: "1fr 1.5fr 2fr",
          gridAutoFlow: "column",
          overflow: "hidden",
        }}
      >
        <HedgeHogList hedgehogs={[...hedgehogCache.keys()]} onSelect={handleSelectedHedgehog}/>
        <Box>
          <HedgehogInfo
            hedgehogId={selectedHedgehogId}
            hedgehogData={ selectedHedgehogId ? hedgehogCache.get(selectedHedgehogId): undefined}
            cacheHedgehog={addToCache}
          />
          <HedgehogForm addToCache={addToCache} coordinates={coordinates || []} />
        </Box>
        <Paper elevation={3} sx={{ margin: "1em" }}>
          <MapView
            onMapClick={(coordinates:any) => setCoordinates(coordinates)}
            features={showCoordinates()} 
          />
        </Paper>
      </Box>
      <Box
        sx={{
          backgroundColor: "#00B2A0",
          height: "40px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography sx={{ color: "white" }} variant="overline">
          Powered by Ubigu Oy
        </Typography>
      </Box>
    </Box>
  );
}

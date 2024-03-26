import { Box, MenuItem, Paper, Typography } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

interface Props {
  onSelect: (id: number) => void;
  // [selectedHedgehogId, setSelectedHedgehogId] = useState<Hedgehog>(number)
}
export default function HedgeHogList({ onSelect }: Props ) {
  const [hedgehogs, setHedgehogs] = useState<Hedgehog[]>([]);
  
  const handleSelect = (id : number) => {
    console.log(id);
    onSelect(id);
  }

  

  // Fetch all hedgehog's during startup
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/hedgehog");
        if (!res.ok) return;

        const json = await res.json();
        setHedgehogs(json?.hedgehogs || []);
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getAllHedgehogs();
  }, []);

  return (
    <Paper elevation={3} sx={{ margin: "1em", overflow: "hidden" }}>
      <Box
        sx={{
          backgroundColor: "#a1e6df",
          height: "3em",
          display: "flex",
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "darkslategrey" }}>
          Rekisteröidyt siilit
        </Typography>
      </Box>
      {hedgehogs.length ? (
        <Box sx={{ overflowY: "scroll", height: "100%" }}>
          {hedgehogs.map((hedgehog: { id?: any; }, index: number) => (
            <MenuItem
              key={`hedgehog-index-${index}`}
              onClick={() => onSelect(hedgehog.id)}>
                {hedgehog.id}
            </MenuItem>
          ))}
        </Box>
      ) : (
        <Typography sx={{ padding: "1em" }}>
          TODO: Mikäli tietokannasta löytyy siilejä, ne listautuvat tähän.
          Koodaa logiikka, jolla tämän listauksen siiliä klikkaamalla siili
          tulee valituksi, jonka jälkeen sen tiedot tulee hakea viereiseen
          komponenttiin.
        </Typography>
      )}
    </Paper>
  );
}

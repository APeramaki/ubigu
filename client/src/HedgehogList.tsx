import { Box, MenuItem, Paper, Typography } from "@mui/material";

interface Props {
  hedgehogs: number[],
  onSelect: (id: number) => void;
  
}
export default function HedgeHogList({ hedgehogs, onSelect }: Props ) {
  
  const handleSelect = (id : number) => {
    onSelect(id);
  }

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
          {hedgehogs.map((id: any, index: number) => (
            <MenuItem
              key={`hedgehog-index-${index}`}
              onClick={() => handleSelect(id)}>
                {id}
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

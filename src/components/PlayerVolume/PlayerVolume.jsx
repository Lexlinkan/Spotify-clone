import { Stack, Slider, Grid } from "@mui/material";
import { useState } from "react";
import { VolumeDown, VolumeOff, VolumeUp } from "@mui/icons-material";

const PlayerVolume = ({player}) => {
    const defaultVolume = 50;
  const [volume, setVolume] = useState(defaultVolume);

const handleVolumeChange = async (value) => {
    try {
        await player.setVolume(value / 100)
    } catch(e) {
        console.error(e);
    }
}

  return (
    <Stack
      direction={"row"}
      spacing={2}
      alignItems={"center"}
      sx={{ width: 150, color: "text.secondary" }}
    >
      {volume === 0 ? (
        <VolumeOff />
      ) : volume < 50 ? (
        <VolumeDown />
      ) : (
        <VolumeUp />
      )}
      <Slider
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={(e, v) => setVolume(v)}
        onChangeCommitted={async(e, v) => { handleVolumeChange(v) }}
      />
    </Stack>
  );
};

export default PlayerVolume;

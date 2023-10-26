import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import SideNav from "../SideNav/SideNav";
import { getAccessTokenFromStorage } from "../../utils/getAccessTokenFromStorage";
import Playlist from "../../pages/Playlist";
import Player from "../Player/Player";
import MobileNav from "../MobileNav/MobileNav";
import Library from "../../pages/Library";

const Dashboard = ({ spotifyApi }) => {
  const [token, setToken] = useState(getAccessTokenFromStorage());

  useEffect(() => {
    async function onMount() {
      await spotifyApi.setAccessToken(token);
    }

    if (token) onMount();
    onMount();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", display: "flex" }}>
        <SideNav spotifyApi={spotifyApi} token={token} />
        <Routes>
          <Route
            path="/playlist/:id"
            element={<Playlist spotifyApi={spotifyApi} token={token} />}
          />
          <Route path="/library" element={<div>{<Library spotifyApi={spotifyApi} token={token} />}</div>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
      {token && <Player spotifyApi={spotifyApi} token={token} />}
      <MobileNav />
    </Box>
  );
};

export default Dashboard;
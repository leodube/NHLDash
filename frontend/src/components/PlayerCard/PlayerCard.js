import React, { useState } from "react";
import PlayerInfo from "./PlayerInfo";
import PlayerStatsSkater from "./PlayerStatsSkater";
import PlayerStatsGoalie from "./PlayerStatsGoalie";

// MUI imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const PlayerCard = (props) => {
  // Destructure props
  const { open, handleClose, player } = props;

  // State variables
  const [tab, setTab] = useState(0);

  // Handlers
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Renderers
  const renderTab = () => {
    console.log(player)
    switch (tab) {
      case 0:
        return <PlayerInfo info={player.info} />;
      case 1:
        if (player.info.position == "G")
          return <PlayerStatsGoalie stats={player.stats} />;
        else return <PlayerStatsSkater stats={player.stats} />;
      default:
        return <PlayerInfo info={player.info} />;
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={
              player.info.firstName.default + " " + player.info.lastName.default
            }
            src={player.info.headshot}
          />
          <Typography variant="h6" component="div">
            {player.info.firstName.default + " " + player.info.lastName.default}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tab} onChange={handleTabChange}>
              <Tab label="Info" />
              <Tab label="Stats" />
            </Tabs>
          </Box>
          {renderTab()}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerCard;

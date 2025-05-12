import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";

import { Home, Book, Assignment, AccountCircle } from "@mui/icons-material";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        sx={{ position: "absolute", left: "16px", top: "16px", zIndex: 1201 }}
      >
        <Home />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        {/* Sidebar Header */}
        <div className="p-4">
          <Avatar sx={{ width: 56, height: 56 }} />
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Chen Guanhua
          </Typography>
        </div>
        <Divider />

        <List>
          <ListItem component="button">
            <Home sx={{ marginRight: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component="button">
            <Assignment sx={{ marginRight: 2 }} />
            <ListItemText primary="Roadmap" />
          </ListItem>
          <ListItem component="button">
            <Book sx={{ marginRight: 2 }} />
            <ListItemText primary="Bookmarked Modules" />
          </ListItem>
          <ListItem component="button">
            <AccountCircle sx={{ marginRight: 2 }} />
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;

import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import MenuComp from "./MenuComp";

import {
  StorageRounded,
  AddCircleOutlineOutlined,
  PeopleAltRounded,
} from "@mui/icons-material";
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';

const color = red[500];
const menuItems = [
  {
    text: "Data table",
    icon: <StorageRounded />,
    path: "/",
  },
  {
    text: "Table data",
    icon: <StorageRounded />,
    path: "/data",
  },
  {
    text: "Read_AP",
    icon: <StorageRounded />,
    path: "/About_Read_AP",
  },
  {
    text: "Read_AGB",
    icon: <StorageRounded />,
    path: "/Read_AGB",
  },
];

const Layout = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"  >
          <Toolbar >
            <MenuComp menuItems={menuItems} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PASS
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
                Poliovirus Assessment by Sequenc Screening
              </Typography>


              <Button variant="contained" color="success" size="medium" href="/"  >
                Take Me Home
              </Button>


            </Typography>


          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ my: 2 }}>{children}</Container>
    </>
  );
};

export default Layout;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import ControlPointIcon from '@mui/icons-material/ControlPoint';



export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" > 
            <WaterDamageIcon style={{textDecoration: "none", color: "white"}} /> 
          </Link>
          <Link to='/addcard' >
            <ControlPointIcon style={{textDecoration: "none", color: "white", marginLeft: "16px"}} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Link to='/Login' style={{textDecoration: "none", color: "white"}} >
            <Button color="inherit">Login</Button>
          </Link>
          <Link to='/register' style={{textDecoration: "none", color: "white"}} >
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
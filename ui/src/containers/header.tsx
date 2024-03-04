import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

const Header: React.FC<{}> = () => {
        return(
            <AppBar position="static">
              <Toolbar>Social Media Panel</Toolbar>
            </AppBar>
        );
}

export default  Header;
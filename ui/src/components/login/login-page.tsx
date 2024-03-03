import React from 'react';
import Layout from '../../containers/layout';
import { Box, Button, Card, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import './style.css';

class LoginComponent extends React.PureComponent {
    render(): JSX.Element {
        return (
        <Layout className='login-page-container'>
            <Box className='login-form-container' border={'20px'}>
                <Typography className='login-page-title'>
                    Login Page
                </Typography>
                
                <Box component="form"  noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
            </Box>

                <Button variant="contained">
                    Login
                </Button>
            </Box>
        </Layout>
        );
    }
}

export default  LoginComponent;
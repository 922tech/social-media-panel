import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { loginSuccessAsync, loginAsync } from '../../actions/auth-actions'
import Layout from '../../containers/layout';
import './style.css';

interface Props {
    loginAsync(username:string, password:string): void;
    loginSuccessAsync() : void;
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, Action>): Props {
    return {
        loginAsync: (username:string, password:string) => dispatch(loginAsync(username, password)),
        loginSuccessAsync() { dispatch(loginSuccessAsync())}
    }
}
const LoginComponent= (props: Props) : JSX.Element => {    
    async function handleSubmit (event:  React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const authData = {
            username: data.get('username') as FormDataEntryValue,
            password: data.get('password') as FormDataEntryValue,
          }
          console.log(authData);
        await props.loginAsync(authData.username as string, authData.password as string)        
    }

    return (
        <Layout className='login-page-container' sx={{display:'flex'}}>
            <Box className='login-form-container'>
                <Typography className='login-page-title' fontWeight='bold' fontSize='28px'>
                    Login Page
                </Typography> 
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
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
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </Box>
            </Box>
        </Layout>
        );
}
export default connect(null, mapDispatchToProps)(LoginComponent)
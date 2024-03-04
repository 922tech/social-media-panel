import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Box, Button, TextField, Typography } from '@mui/material';
import { loginSuccessAsync, loginAsync } from '../../actions/auth-actions'
import { CombinedState } from '../../reducers';
import './style.css';

interface Props {
    loginAsync(username:string, password:string): void;
    loginSuccessAsync() : void;
    loginSuccess: boolean;
    login: any;
}

interface DispatchToProps {
    loginAsync(username:string, password:string): void;
    loginSuccessAsync() : void;
}

interface StateToProps {
    login: any,
    loginSuccess: any
}

function mapDispatchToProps(dispatch: ThunkDispatch<CombinedState, any, Action>): DispatchToProps {
    return {
        loginAsync: (username:string, password:string) => dispatch(loginAsync(username, password)),
        loginSuccessAsync: () =>  dispatch(loginSuccessAsync())
    }
}

function mapStateToProps(state: CombinedState) : StateToProps {    
    return {
            login: state.auth.login,
            loginSuccess: state.auth.loginSuccess
    }
} 

const LoginForm : React.FC<Props> = (props: Props) => {

    async function handleSubmit (event:  React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const authData = {
            username: data.get('username') as FormDataEntryValue,
            password: data.get('password') as FormDataEntryValue,
          }
        await props.loginAsync(authData.username as string, authData.password as string)     
    }
    const loginFormState = typeof props.login === 'boolean' ? !props.loginSuccess : false;
    
    return(
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} className='login-form-items'>
            <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            error={loginFormState}
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
            error={loginFormState}
            />
            <Box display={'flex'} justifyContent={'center'}>
                <Button variant="contained" type="submit">
                    Login
                </Button>
            </Box>
        </Box>
    )
}


const LoginComponent= (props: any) : JSX.Element => {        
    return (
        <Box className='login-page-container' sx={{ display:'flex' }}>
            <Box className='login-form-container'>
                <Typography  id='login-page-title'>
                    Login
                </Typography> 
                <LoginForm {...props}/>
            </Box>
        </Box>
        );
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
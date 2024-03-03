import { Container,ContainerProps  } from '@mui/material';
import React from 'react';

interface LayoutProps extends ContainerProps{
    children: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = (props) => {

      return( 
        <Container component='main' {...props} /> 
        );
    }


export default  Layout;
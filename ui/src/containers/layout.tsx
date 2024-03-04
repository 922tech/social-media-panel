import { Container,ContainerProps  } from '@mui/material';
import React from 'react';


const Layout: any = (props: ContainerProps) => {

    return( 
        <Container {...props} >{props.children}</Container>
    );
}

export default  Layout;
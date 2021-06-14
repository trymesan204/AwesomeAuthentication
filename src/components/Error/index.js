import React from 'react';
import Alert from '@material-ui/lab/Alert';

const Error = ({errorText, error}) => {
    if (error){
        return <Alert severity="error">{errorText}</Alert>;
    }else{
        return <div></div>;
    }
}

export default Error;
import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Authenticated = () => {
    const [open, setOpen] = useState(true);

    const hideSnackbar = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    }

    return(
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={hideSnackbar} >
                <Alert severity="success" onClose={hideSnackbar}>
                    Welcome !
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Authenticated;
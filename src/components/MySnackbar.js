//react
import * as React from 'react';
//mui
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function MySnackbar({open , message}) {

  const action = (
    <React.Fragment>
     
    </React.Fragment>
  );

  return (
    <div>
       <Stack sx={{ width: '100%' }} spacing={2}>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            action={action}
          >
            <Alert severity="success"> {message}  </Alert>
          </Snackbar>
      </Stack>
    </div>
  );
}

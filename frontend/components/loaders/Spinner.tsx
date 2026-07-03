import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Spinner: React.FC<{
    size?: number
    message?: string
}> = ({size, message}) => {
  return (
    <Box sx={{ 
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <CircularProgress color='primary' size={size} sx={{mb: 2}}/>
      <Typography variant="subtitle2">{message}</Typography>
    </Box>
  );
}

export default Spinner
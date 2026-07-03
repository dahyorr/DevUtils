import {  useLoader } from '@/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

const MainSpinner = () => {
  const {loading} = useLoader()
  const size = 60

  return loading
  ?(
    <Box sx={{ display: 'flex' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" size={size}/>
      </Backdrop>
    </Box>
  )
  :null
}

export default MainSpinner
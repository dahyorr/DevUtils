import { useUi } from '@/hooks';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = () => {

  const {headerProgressVisible} = useUi()

  return headerProgressVisible  
  ?(
    <Box sx={{ width: '100%'}}>
      <LinearProgress color="primary" />
    </Box>
  )
  :null
}

export default ProgressBar
// import { Typography } from '@mui/material';
import { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';

const PageHeader: React.FC<BoxProps> = ({ children, sx, ...props }) => {
  return <Box sx={{ py: 4, mb: 3, ...sx }} {...props} >
    {children}
  </Box>;
};

export default PageHeader;

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import List, {ListProps} from '@mui/material/List';
import Paper from '@mui/material/Paper';
import {navTree} from 'utils'
import NavMainItem from './NavMainItem';

const StyledNavList = styled(List)<ListProps>(({theme}) => ({
  '& .MuiListItemButton-root, & .MuiButton-root': {
    padding: 10,
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 6,
    width: '100%',
    justifyContent: 'flex-start',
    // minWidth: 'fit-content',
    textTransform: 'none',
    '&:hover':{
      background: 'rgba(80,70,228,0.04)',
    },
    '&.Mui-selected': {
      background: 'transparent',
      color: theme.palette.primary.main,
      '&:hover':{
        background: 'rgba(80,70,228,0.04)',
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      }
    }
  },
}));

const NavList: React.FC = () => {
  return (
    <Box sx={{ display: 'flex'}}>
        <Paper elevation={0} sx={{ maxWidth: '100%',flexGrow: 1 }}>
          <StyledNavList disablePadding sx={{mt: 1}}>
          {navTree.map((item, index) => (
            <NavMainItem 
              key={index}
              {...item}
            />
            ))}
          </StyledNavList>
        </Paper>
    </Box>
  );
}

export default NavList
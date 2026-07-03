"use client"

import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link'
import { NavChildItemProps } from '@/types';
import { usePathname } from 'next/navigation';

const NavChildItem: React.FC<NavChildItemProps> = ({ label, path, disabled, closeSidebar }) => {
  const  pathname  = usePathname()
  if (disabled) return null
  return (
    <ListItemButton
      component={NextLink}
      href={path}
      disableRipple
      selected={pathname === path ? true : false}
      onClick={closeSidebar}
    >
      <Typography variant="subtitle2" sx={{ ml: '30px', fontWeight: 400 }}>{label}</Typography>
    </ListItemButton>
  )
}

export default NavChildItem
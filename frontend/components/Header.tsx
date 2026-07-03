"use client"
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import ThemeToggle from '@/components/ThemeToggle'
import HeaderProgressBar from "./loaders/HeaderProgressBar";
import { useUi } from "@/hooks";


const Header = () => {
    const theme = useTheme()
    const { toggleSidebar } = useUi()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                color="secondary"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    // backgroundImage: 'unset'
                }}
                enableColorOnDark
            >
                <Toolbar>
                    {!isLargeScreen && (<IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>)}

                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            ml: 2
                        }}>
                        DevUtils
                    </Typography>

                    <ThemeToggle />

                </Toolbar>
                <HeaderProgressBar />
            </AppBar>
            {/* <Toolbar/> */}
        </Box>
    );
};

export default Header;

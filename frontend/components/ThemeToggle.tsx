"use client"
import { styled, useColorScheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import sunIcon from '../assets/sun.png'
import moonIcon from '../assets/moon.png'
import FormControlLabel from '@mui/material/FormControlLabel';

const ThemeSwitch = styled(Switch)(({ theme }) => ({
    width: 70,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(0px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(35px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url(${moonIcon.src})`

            },
            '& + .MuiSwitch-track': {
                opacity: 1,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: 'transparent',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${sunIcon.src})`
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        borderRadius: 20 / 2,
    },
}));


const ThemeToggle: React.FC = () => {
    const {systemMode, mode,setMode} = useColorScheme()
    const themeMode = systemMode || mode

    const toggleThemeMode = () => {
        setMode(themeMode === 'dark' ? 'light' : 'dark')
    }

    return (
        <div>
            <FormControlLabel
                control={
                    <ThemeSwitch
                        onChange={toggleThemeMode}
                        checked={themeMode === 'dark'}
                        inputProps={{ 'aria-label': 'theme-switcher' }}
                    />
                }
                label=""
            />
        </div>
    )
};

export default ThemeToggle;

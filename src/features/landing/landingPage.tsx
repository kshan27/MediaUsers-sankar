import * as React from 'react';
import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppAppBar from '../../components/appAppBar';
import UsersGrid from '../users/usersGrid';

export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
      };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <UsersGrid />
        </ThemeProvider>
    );
}
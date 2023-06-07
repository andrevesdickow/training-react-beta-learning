import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF4800',
            light: '#FF8D61'
        },
        secondary: {
            main: '#000000',
            dark: '#34363D'
        },
        error: {
            main: '#EB3B46',
            dark: '#C70A15',
            light: '#FFEBEC'
        },
        success: {
            main: '#0BA248',
            dark: '#047833',
            light: '#E5F8EC'
        },
        info: {
            main: '#4B65EC',
            dark: '#1B2F9A',
            light: '#ECEFFD'
        },
        warning: {
            main: '#F7C544',
            dark: '#ECAC08',
            light: '#FEF8EA'
        }
    },
});

export default theme;
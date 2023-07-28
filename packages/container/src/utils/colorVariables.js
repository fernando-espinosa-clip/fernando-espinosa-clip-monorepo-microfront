import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
    return {
        ...color,
        alpha4: alpha(color.main, 0.04),
        alpha8: alpha(color.main, 0.08),
        alpha12: alpha(color.main, 0.12),
        alpha30: alpha(color.main, 0.30),
        alpha50: alpha(color.main, 0.50)
    };
};

export const neutral = {
    50: '#F8F9FA',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D2D6DB',
    400: '#9DA4AE',
    500: '#6C737F',
    600: '#4D5761',
    700: '#2F3746',
    800: '#1C2536',
    900: '#111927'
};

export const indigo = withAlphas({
    lightest: '#F5F7FF',
    light: '#EBEEFE',
    main: '#6366F1',
    dark: '#4338CA',
    darkest: '#312E81',
    contrastText: '#FFFFFF'
});


export default {
    indigo,
    neutral,
// paper & background
    paper: '#ffffff',

// primary
    primaryLight: '#fce0da',
    primaryMain: '#FC4C02',
    primaryDark: '#c24700',
    primary200: '#90caf9',
    primary800: '#1565c0',

// secondary
    secondaryLight: '#ede7f6',
    secondaryMain: '#FC4C02',
    secondaryDark: '#5e35b1',
    secondary200: '#b39ddb',
    secondary800: '#4527a0',

// success Colors
    successLight: '#b9f6ca',
    success200: '#69f0ae',
    successMain: '#00e676',
    successDark: '#00c853',

// error
    errorLight: '#ef9a9a',
    errorMain: '#f44336',
    errorDark: '#c62828',

// orange
    orangeLight: '#fbe9e7',
    orangeMain: '#ffab91',
    orangeDark: '#d84315',

// warning
    warningLight: '#fff8e1',
    warningMain: '#ffe57f',
    warningDark: '#ffc107',

// grey
    grey50: '#fafafa',
    grey100: '#f5f5f5',
    grey200: '#eeeeee',
    grey300: '#e0e0e0',
    grey500: '#9e9e9e',
    grey600: '#757575',
    grey700: '#616161',
    grey900: '#212121',

// ==============================|| DARK THEME VARIANTS ||============================== //

// paper & background
    darkBackground: '#1a223f', // level 3
    darkPaper: '#111936', // level 4

// dark 800 & 900
    darkLevel1: '#29314f', // level 1
    darkLevel2: '#212946', // level 2

// primary dark
    darkPrimaryLight: '#e3f2fd',
    darkPrimaryMain: '#2196f3',
    darkPrimaryDark: '#1e88e5',
    darkPrimary200: '#90caf9',
    darkPrimary800: '#1565c0',

// secondary dark
    darkSecondaryLight: '#d1c4e9',
    darkSecondaryMain: '#7c4dff',
    darkSecondaryDark: '#651fff',
    darkSecondary200: '#b39ddb',
    darkSecondary800: '#6200ea',

// text variants
    darkTextTitle: '#d7dcec',
    darkTextPrimary: '#bdc8f0',
    darkTextSecondary: '#8492c4',
}

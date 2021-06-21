import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

import { lighten } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';

import { opacity } from '@/themes/utils';

const common = {
  black: '#0B0B0C',
  white: '#ffffff',
  darkBlue: '#324664',
  icon: 'rgba(37, 68, 143, 0.08)',
  border: 'rgba(50, 70, 118, 0.12)',
  orange: { main: '#F66800', dark: '#A35A24', light: '#ECA673', contrastText: '#FFF' },
  grey: {
    50: '#FAFAFC',
    100: '#F5F5F7',
    200: '#EEEEF2',
    300: '#DEDEE2',
    400: '#BDBDC2',
    500: '#9E9EA8',
    600: '#757575',
    700: '#616166',
    800: '#424247',
    900: '#212126',
    A100: '#D5D5D5',
    A200: '#AAA',
    A400: '#616161',
    A700: '#303030',
  },
  gradient: {
    highlight: ['0deg', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.9)'],
    primary: {
      dark: ['129.97% 106.88% at 50% 21.91%', 'rgba(24, 72, 149, 0) 0%', '#184895 100%'],
      lightBlue: ['0deg, rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.9)', '#536DFE'],
      lightGreen:
        'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #45AE57',
      lightGreenAlt:
        'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #4CAF50',
      lightGrey: 'linear-gradient(180deg, #F5F5F7 0%, #FAFAFC 100%)',
    },
  },
};

const palette = {
  primary: {
    main: '#2972E0',
    dark: '#184895',
    light: '#5C9DFF',
    contrastText: '#FFF',
    background: lighten('#536DFE', 0.92),
    lightGrey: 'rgba(37, 68, 143, 0.08)', // primary / background
  },
  secondary: { main: '#264779', dark: '#113366', light: '#6686B6', contrastText: '#FFF' },
  info: { main: '#536DFE', dark: '#25448F', light: '#9FA8DA', contrastText: '#FFF' },
  error: {
    main: '#DA4045',
    dark: '#A74145',
    light: '#EBB1B3',
    contrastText: '#FFF',
    lightBackground: lighten('#DA4045', 0.9),
  },
  warning: { main: '#F8AB3A', dark: '#C38147', light: '#FFC960', contrastText: '#FFF' },
  success: {
    main: '#45AE57',
    dark: '#3D954C',
    darkAlt: '#45ae57',
    lightAlt: '#4caf50',
    light: '#60BA6F',
    contrastText: '#FFF',
    lightBackground: lighten('#68B76B', 0.9),
  },
  text: {
    primary: '#2E4478',
    secondary: opacity(common.darkBlue, 0.54),
    hint: 'rgba(50, 61, 88, 0.38)',
    label: common.darkBlue,
  },
  action: {
    active: opacity(common.darkBlue, 0.08),
    hover: opacity(common.darkBlue, 0.14),
    selected: opacity(common.darkBlue, 0.3),
  },
  common,
  background: {
    paper: '#fff',
    default: '#fafafa',
  },
  icon: {
    color: 'rgba(50, 70, 100, 0.3)',
  },
};

const Theme = createMuiTheme({
  themeName: 'Light',
  palette,
  typography: {
    useNextVariants: true,
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontSize: '24px',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontSize: '14px',
      opacity: 0.4,
    },
    h3: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      color: palette.text.primary,
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '32px',
      marginBottom: '16px',
    },
    h4: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: '20px',
      color: 'rgba(50, 61, 88, 0.38)',
      display: 'flex',
      alignItems: 'center',
      marginTop: '4px',
    },
    h5: {
      fontSize: '13px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
    },
    h6: {
      fontWeight: 500,
      fontSize: '13px',
      color: 'rgba(50, 61, 88, 0.38)',
      lineHeight: '20px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
    },
    body1: {
      fontWeight: 500,
      fontSize: '15px',
      color: palette.info.main,
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
    },
    body2: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.09px',
      fontStyle: 'normal',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '22px',
      color: palette.text.primary,
      alignItems: 'center',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      color: palette.text.primary,
      alignItems: 'center',
      letterSpacing: '-0.18px',
    },
    numberSmall: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '32px',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        borderRadius: '8px',
        height: '40px',
        '&:not(:last-child)': {
          marginBottom: '16px',
        },
      },
      contained: {
        padding: '8px 16px',
      },
      outlined: {
        padding: '8px 16px',
      },
      text: {
        padding: '8px 16px',
      },
      sizeSmall: {
        height: '28px',
        padding: '4px 8px',
      },
      sizeLarge: {
        height: '48px',
        padding: '12px 22px',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        marginTop: '0px',
        marginBottom: '12px',
        backgroundColor: palette.info.main,
        color: palette.common.white,
        '& p': {
          display: 'block',
          color: palette.common.white,
        },
      },
      iconButton: {
        backgroundColor: palette.info.main,
        color: palette.common.white,
      },
    },
    MuiPickersDay: {
      current: {
        color: palette.common.grey[400],
      },
    },
    MuiPickersModal: {
      dialogRoot: {
        borderRadius: '12px',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 641,
      md: 960,
      lg: 1080,
      xl: 1920,
    },
  },
});

export default Theme;

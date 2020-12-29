import { defaultTheme } from "react-admin";
import merge from "lodash/merge";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createPalette from "@material-ui/core/styles/createPalette";
import defaultMuiTheme from "@material-ui/core/styles/defaultTheme";

const palette = createPalette(
  merge({}, defaultTheme.palette, {
    primary: {
      main: "#1c2237", // Not far from red
    },
    secondary: {
      main: "#1c2237", // Not far from green
    },
  })
);
const sidebar = {
  width: 240, // The default value is 240
  closedWidth: 55, // The default value is 55
};

const typography = {
  fontFamilySecondary: "'Segoe UI light', sans-serif",
  fontFamily: '"Segoe UI", cursive',
  fontSize: 16, // Should be a number in pixels
  fontStyle: "normal",
  fontWeightLight: 400,
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  color: palette.text.primary,
};

const typographyBase = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  fontStyle: typography.fontStyle,
  color: typography.color,
};

const typographyHeader = {
  ...typographyBase,
  fontWeight: typography.fontWeightBold,
  fontFamily: typography.fontFamilySecondary, // Use a dedicated font for the header
};

const typographyBody = {
  ...typographyBase,
  fontWeight: typography.fontWeightRegular,
  fontFamily: typography.fontFamily,
};


const rawTheme = {
    palette,
    sidebar, 
    typography: {
      ...typographyBase,
      h1: {
        ...typographyHeader,
        textTransform: "uppercase",
        fontSize: "4rem",
      },
      // ... Put other title styles below
      body1: {
        ...typographyBody,
        fontSize: "1rem",
      },
    },
    overrides: {
        RaSidebar: {
          drawerPaper: {
            backgroundColor: palette.common.white,
            color: palette.primary.main,
            height: "100%",
            boxShadow:
              "2px 0px 1px -1px rgba(0,0,0,0.2), 1px 0px 3px 0px rgba(0,0,0,0.1)",
          },
        },
        RaMenuItemLink: {
            active: {
              borderLeftStyle: "none",
              borderRightColor: palette.secondary.main,
              borderRightWidth: defaultMuiTheme.spacing(0.5),
              borderRightStyle: "solid",
              backgroundColor: palette.action.selected, // Defined in the default palette
              color: palette.primary.main,
              fontWeight: typography.fontWeightBold,
              icon: {
                color: "inherit",
              }
            },
          },
          MuiButton: {
            root: {
              color: palette.primary.main,
              paddingTop: defaultMuiTheme.spacing(1),
              paddingRight: defaultMuiTheme.spacing(4),
              paddingBottom: defaultMuiTheme.spacing(1),
              paddingLeft: defaultMuiTheme.spacing(4),
              borderRadius: defaultMuiTheme.spacing(4),
            },
            sizeSmall: {
              paddingTop: defaultMuiTheme.spacing(0),
              paddingRight: defaultMuiTheme.spacing(2),
              paddingBottom: defaultMuiTheme.spacing(0),
              paddingLeft: defaultMuiTheme.spacing(2),
            },
            sizeLarge: {
              paddingTop: defaultMuiTheme.spacing(2),
              paddingRight: defaultMuiTheme.spacing(6),
              paddingBottom: defaultMuiTheme.spacing(2),
              paddingLeft: defaultMuiTheme.spacing(6),
            },
            contained: {
              boxShadow: "none",
            },
            containedPrimary: {
              color: palette.common.white,
              backgroundColor: palette.primary.main,
            },
            containedSecondary: {
              color: palette.common.white,
              backgroundColor: palette.secondary.main,
            },
          },
      
        
      },
      

  };


export const theme = createMuiTheme(merge({}, defaultTheme, rawTheme));

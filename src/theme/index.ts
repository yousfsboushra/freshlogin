import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import { colors } from "./colors";
import { fontSizes } from "./fontsizes";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.white,
    },
    text: {
      primary: colors.blue,
      secondary: colors.lightBlue,
      disabled: colors.lighterBlue,
      hint: colors.black,
    },
    background: {
      default: colors.white,
    },
  },
  typography: {
    h1: {
      fontSize: fontSizes.large,
      color: colors.darkBlue,
    },
    h6: {
      fontSize: fontSizes.medium,
    },
    body1: {
      fontSize: fontSizes.normal,
      fontWeight: "bold",
    },
    body2: {
      fontSize: fontSizes.normal,
    },
    subtitle1: {
      fontSize: fontSizes.small,
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: fontSizes.small,
    },
    button: {
      fontSize: fontSizes.normal,
    },
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: colors.darkBlue,
      },
    },
    MuiButton: {
      root: {
        width: "100%",
      },
      containedPrimary: {
        color: colors.white,
        backgroundColor: colors.darkBlue,
      },
      textPrimary: {
        color: colors.white,
      },
    },
    MuiTextField: {
      root: {
        width: "100%",
      },
    },
  },
});

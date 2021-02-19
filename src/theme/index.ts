import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from "./colors";
import { fontSizes } from "./fontsizes";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.white,
    },
    secondary: {
      main: colors.black,
    },
    text: {
      primary: colors.black,
    },
    background: {
      default: colors.white,
    },
  },
  typography: {
    h1: {
      fontSize: fontSizes.large,
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
      containedPrimary: {
        color: colors.white,
        backgroundColor: colors.blue,
      },
      textPrimary: {
        color: colors.white,
      },
    },
  },
});

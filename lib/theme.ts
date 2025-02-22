import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic",
      Verdana, Meiryo, "M+ 1p", sans-serif`,
    allVariants: {
      color: "#484848",
    },
  },
  palette: {
    text: {
      primary: "#484848",
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "10px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#4f46e5",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderRadius: "2px",
          padding: "7px",
          fontSize: "16px",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#3f40d5",
          },
        },
      },
    },
  },
});

export default theme;

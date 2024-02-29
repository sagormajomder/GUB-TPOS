// theme.js (or theme.ts for TypeScript)
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    custom: {
      100: "#b8e6b3",
      200: "#a6df9f",
      300: "#94d98c",
      400: "#82d279",
      500: "#70cc66",
      600: "#5ec653",
      700: "#4dbf40",
      800: "#4bb93e"
    },
  },
});

export default theme;

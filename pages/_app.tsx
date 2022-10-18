import "../styles/globals.css";
import type {AppProps} from "next/app";

import {CssBaseline, ThemeProvider} from "@mui/material";
import {SnackbarProvider} from "notistack";

import {lightTheme} from "../themes/lightTheme";
import {darkTheme} from "../themes/darkTheme";
import {UIProvider} from "../context/ui/UIProvider";
import {EntriesProvider} from "../context/entries/EntriesProvider";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;

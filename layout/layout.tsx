import { ThemeProvider } from "@mui/material";
import React from "react";
import Footer from "../components/footer";

import MaterialUiTheme from "../components/material-ui/material-ui-theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={MaterialUiTheme}>
        <main className="z-10">{children}</main>
        <Footer></Footer>
    </ThemeProvider>
  );
}

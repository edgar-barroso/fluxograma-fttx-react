import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { Diagram } from "./pages/Diagram";
import { Login } from "./pages/Login";
import { Router } from "./pages/Router";
import { BrowserRouter } from "react-router-dom";

export function App() {
    return (
        <div style={{ height: "100vh" }}>
            <ThemeProvider theme={defaultTheme}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
                <GlobalStyle />
            </ThemeProvider>
        </div>
    );
}

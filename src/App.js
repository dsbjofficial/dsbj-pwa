// Styles
import "./App.css"
import CssBaseline from '@material-ui/core/CssBaseline';

// React Components
import React from "react"
import {Route, BrowserRouter, Switch} from "react-router-dom"

// Structural
import Navigation from "./components/Navigation"

// Site Components
import Dashboard from "./components/Dashboard"
import Settings from "./components/settings/Settings"
import Profile from "./components/settings/Profile";
import About from "./components/About"

// Auth Components
import LoginCallback from "./components/auth/LoginCallback"
import SecuredRoute from "./components/auth/SecuredRoute"

// Material Theming
import {ThemeProvider} from "@material-ui/core/styles"
import {theme} from "./theme"

// Context Providers
import {Auth0Provider} from "./components/auth/Auth";
import {ApiKeyProvider} from "./components/helpers/ApiKeyManager";
import {BreakpointProvider} from "react-socks";

import {useDefaultStyles} from "./theme";

function App() {
    const classes = useDefaultStyles();

    return (
        <Auth0Provider>
            <ApiKeyProvider>
                <BreakpointProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <BrowserRouter>
                            <div className={classes.root}>
                                <Navigation/>
                                <main role="main" className={classes.content}>
                                    <Switch>
                                        <Route path="/" exact component={Dashboard}/>
                                        <Route path="/about" component={About}/>
                                        <SecuredRoute path="/profile" component={Profile}/>
                                        <Route path="/logincallback" component={LoginCallback}/>
                                    </Switch>
                                </main>
                                {/*<footer className="mt-auto">*/}
                                {/*</footer>*/}
                            </div>
                        </BrowserRouter>
                    </ThemeProvider>
                </BreakpointProvider>
            </ApiKeyProvider>
        </Auth0Provider>
    )
}

export default App

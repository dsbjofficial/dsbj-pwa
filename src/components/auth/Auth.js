import React, {useState, useEffect, useContext, createContext} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import axios from "axios";
import authConfig from "../../authConfig";

// A function that routes the user to the right place after login.
export const DEFAULT_REDIRECT_CALLBACK = (appState) => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
    );
};
export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

// TODO: Is using the Management Identifier as `audience` secure?
export const Auth0Provider = ({
                                  children,
                                  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                                  ...initOptions
                              }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(Object.assign(initOptions, {
                domain: authConfig.domain,
                client_id: authConfig.clientId,
                redirect_uri: window.location.origin,
                audience: authConfig.managementUrl,
                scope: authConfig.scope
            }));
            setAuth0(auth0FromHook);

            if (window.location.search.includes("code=")) {
                const {appState} = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
        } finally {
            setPopupOpen(false);
        }
        const user = await auth0Client.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);
        setUser(user);
    };

    const managementRequest = async ({endpoint, method, ...rest}) => {
        // Set defaults
        const headers = {
            authorization: `Bearer ${await auth0Client.getTokenSilently()}`
        };
        if ("headers" in rest) {
            Object.assign(rest.headers, headers);
        } else {
            rest.headers = headers;
        }
        if (!("baseURL" in rest)) {
            rest.baseURL = authConfig.managementUrl;
        }

        // Make request
        return axios(endpoint, {
            method,
            baseURL: authConfig.managementUrl,
            ...rest
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            throw(error);
        });
    };

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                managementRequest,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};

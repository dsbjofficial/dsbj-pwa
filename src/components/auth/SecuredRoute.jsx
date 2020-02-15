import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {useAuth0} from "./Auth";
import Spinner from "react-bootstrap/Spinner";

function SecuredRoute({component: Component, path, ...rest}) {
    const {isAuthenticated, loginWithRedirect, loading} = useAuth0();
    const loadingAnimation = (
        <Spinner animation="grow"/>
    );

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: {targetUrl: path}
            });
        };
        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    const render = (props) => (isAuthenticated && !loading) === true ? <Component {...props}/> : loadingAnimation;
    return <Route path={path} render={render} {...rest}/>;
}

export default SecuredRoute;

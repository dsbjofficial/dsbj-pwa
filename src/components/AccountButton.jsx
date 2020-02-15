import React from "react"
import {NavLink, withRouter} from "react-router-dom"
import {useAuth0} from "./auth/Auth"

import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown"
import Spinner from "react-bootstrap/Spinner"

import {Person as FaUserAlt} from "@material-ui/icons"

function AccountButton(props) {
    const {isAuthenticated, loginWithRedirect, logout, user, loading} = useAuth0();

    const signOut = () => {
        logout({returnTo: window.location.origin.toString()});
    };

    const userIcon = <FaUserAlt className="mr-2" style={{verticalAlign: "baseline"}}/>;
    const signInButton = loading ? (
        <Button variant="outline-light">
            {userIcon}
            <Spinner size="sm" animation="grow"/>
        </Button>
    ) : (
        <Button variant="outline-light" onClick={loginWithRedirect}>Sign In</Button>
    );

    return (isAuthenticated && !loading) ? (
        <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Button} variant="outline-light" aria-label="account">
                {userIcon}
                <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
                <Dropdown.Item as={NavLink} to="/settings">Settings</Dropdown.Item>
                <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ) : signInButton;
}

export default withRouter(AccountButton);

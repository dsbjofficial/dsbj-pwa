import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class LoginCallback extends Component {
    async componentDidMount() {
        this.props.history.replace("/");
    }

    render() {
        return (
            <p>Loading your information...</p>
        );
    }
}

export default withRouter(LoginCallback);

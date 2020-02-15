import React from "react"
import {Link} from "react-router-dom"
import {Box, Typography, Button} from "@material-ui/core";

const logoPath = `${process.env.PUBLIC_URL}/logo-primary.png`;

function Dashboard() {
    return (
        <div>
            <Typography variant="h1">Under Construction</Typography>
            <Button component={Link} to="/about" variant="contained" color="primary" size="large">About DSBJ</Button>
        </div>
    );
}

export default Dashboard

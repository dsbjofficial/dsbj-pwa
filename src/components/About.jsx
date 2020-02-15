import React from "react";
import {Link} from "react-router-dom";
import {Box, Typography, Button} from "@material-ui/core";

const logoPath = `${process.env.PUBLIC_URL}/logo-primary.png`;

function About() {
    return (
        <Box >
            <Typography variant="h1">Don't Say Bo Jio</Typography>
            <Typography variant="h4">lets you discover events happening in and around school</Typography>
            <Button component={Link} to="/" variant="contained" color="primary" size="large">Go Home</Button>

        </Box>
    );
}

export default About;

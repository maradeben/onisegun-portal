import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 10}}>
            <Typography variant="h2" color="error" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="h5" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Box mt={4}>
                <Button variant="contained" color="primary"
                    onClick={() => navigate("/")}>
                    Go to Home
                </Button>
            </Box>
            <Box mt={2}>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
            </Box>
            <Box mt={2}>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/login")}>
                    Login
                </Button>
            </Box>
        </Container>
    )
}
export default NotFound;
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 10}}>
            <Typography variant="h1" color="" gutterBottom>
                Home Page
            </Typography>
            <Typography variant="h2" color="textSecondary" gutterBottom>
                Welcome to the Onisegun Portal!
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                This is a simple portal built with React and Flask.
            </Typography>
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
export default Index;
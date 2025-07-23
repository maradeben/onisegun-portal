import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    // Form state
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    // Update form field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", form);

            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token); // Store token in local storage
                console.log("Login successful, token stored:", response.data, token);
                navigate("/"); // Redirect to home on success
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Log In
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    margin="normal"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Log In
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don't have an account? <Link href="/signup">Sign Up</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;

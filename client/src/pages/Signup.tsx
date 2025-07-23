import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    // Form state
    const [form, setForm] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        job_description: "",
        hospital: ""
    });

    // Update form field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signup", form);
            console.log("Signup successful:", response.data);
            navigate("/login"); // Redirect to login on success
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        }
    }; 

    return (
        <Container maxWidth="sm" sx={{ mt:8 }}>
            <Typography variant="h4" gutterBottom>
                Sign Up
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
                label="First Name"
                name="firstname"
                fullWidth
                margin="normal"
                value={form.firstname}
                onChange={handleChange}
                required
            />
            <TextField
                label="Last Name"
                name="lastname"
                fullWidth
                margin="normal"
                value={form.lastname}
                onChange={handleChange}
                required
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={form.email}
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
            <TextField
                label="Job Description"
                name="job_description"
                fullWidth
                margin="normal"
                value={form.job_description}
                onChange={handleChange}
                required
            />
            <TextField
                label="Hospital"
                name="hospital"
                fullWidth
                margin="normal"
                value={form.hospital}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Sign Up
            </Button>

            <Box mt={2} textAlign="center">
                <Typography variant="body2">
                    Already have an account?
                    <Link href="/login" underline="hover">
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    </Container>
    );
};
export default Signup;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type User = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    hospital: string;
    job_description: string;
}

const UserProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // get user id from the URL
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage
            if (!token) {
                console.warn("No token found in localStorage! Redirecting to login.");
                navigate("/login"); // Redirect to login if no token
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in request headers
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [id]);

    if (loading) return <CircularProgress sx={{ mt: 4 }} />;

    if (!user) return <Typography sx={{ mt: 4 }} color="error">User not found</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{user.firstname} {user.lastname}</Typography>
                    <Typography variant="body1">Username: {user.username}</Typography>
                    <Typography variant="body1">Email: {user.email}</Typography>
                    <Typography variant="body1">Hospital: {user.hospital}</Typography>
                    <Typography variant="body1">Job Description: {user.job_description}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserProfile;

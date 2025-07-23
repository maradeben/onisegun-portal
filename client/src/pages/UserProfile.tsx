import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';

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
    const { id } = useParams(); // get user id from the URL
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
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

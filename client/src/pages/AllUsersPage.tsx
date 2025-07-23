import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  hospital: string;
  job_description: string;
}

const AllUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
          console.warn("No token found in localStorage! Redirecting to login.");
          navigate("/login"); // Redirect to login if no token
          setLoading(false);
          return;
            }
      try {
        const response = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>All Users</Typography>
      <Paper elevation={3}>
        <List>
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${user.firstname} ${user.lastname}`}
                  secondary={
                    <>
                      <Typography component="div" variant="body2" color="text.primary">
                        Username: {user.username}
                      </Typography>
                      <Typography component="div" variant="body2" color="text.primary">
                        Email: {user.email}
                      </Typography>
                      <Typography component="div" variant="body2" color="text.primary">
                        Hospital: {user.hospital}
                      </Typography>
                      <Typography component="div" variant="body2" color="text.primary">
                        Job: {user.job_description}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < users.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AllUsersPage;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user data and token from local storage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');
    }, [navigate]);
    return null; // No UI to render
};

export default Logout;
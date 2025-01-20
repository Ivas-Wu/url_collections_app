import React, { useEffect } from 'react';
import { userLogout } from '../services/authService';
import { useAuth } from '../components/auth/authContext';

const LogoutPage: React.FC = () => {
    const { isLoggedIn, login, logout } = useAuth();
    
    useEffect(() => {
        userLogout();
        logout();
    }, []);

    return null;
};

export default LogoutPage;

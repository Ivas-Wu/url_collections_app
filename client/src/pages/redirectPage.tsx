import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { redirectPage } from '../services/urlService';

const RedirectPage: React.FC = () => {
    const { shortUrl } = useParams();

    useEffect(() => {
        const redirect = async () => {
            try {
                const originalUrl: string = await redirectPage(shortUrl);
                window.location.href = originalUrl;
            } catch (err) {
                console.error('Error redirecting:', err);
                window.location.href = '/404'; 
            }
        };

        redirect();
    }, [shortUrl]);

    return null;
};

export default RedirectPage;
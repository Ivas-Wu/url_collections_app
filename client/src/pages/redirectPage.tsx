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
                throw err;
            }
        };

        redirect()
    }, []);

    return (
    <div>
        <h1>Redirect Page: {shortUrl}</h1>
    </div>
    );
};

export default RedirectPage;
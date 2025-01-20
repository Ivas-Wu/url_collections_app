import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { redirectPage } from '../services/urlService';

const RedirectPage: React.FC = () => {
    const { shortUrl } = useParams();
    const redirectingRef = useRef(false);

    useEffect(() => {
        const redirect = async () => {
            if (redirectingRef.current) return;

            redirectingRef.current = true;

            try {
                const originalUrl: string = await redirectPage(shortUrl);
                window.location.href = originalUrl;
            } catch (err) {
                console.error('Error redirecting:', err);
                window.location.href = '/404';
            }
            finally {
                redirectingRef.current = false;
            }
        };

        redirect();
    }, [shortUrl]);

    return null;
};

export default RedirectPage;

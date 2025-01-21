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
                var originalUrl: string = await redirectPage(shortUrl);
                if (!/^https?:\/\//.test(originalUrl)) {
                    originalUrl = `http://${originalUrl}`;
                }
                window.location.assign(originalUrl);
            } catch (err) {
                console.error('Error redirecting:', err);
                window.location.href = '/'; // TODO make a 404 not found page
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

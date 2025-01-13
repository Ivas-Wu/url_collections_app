import { useState } from 'react';
import { shortenUrl } from '../services/urlService';

const useUrlShortener = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  const shorten = async (url: string) => {
    try {
      setLoading(true);
      const result = await shortenUrl(url);
      setShortenedUrl(result.shortenedUrl);
    } catch (err) {
      setError('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return { shortenedUrl, error, loading, shorten };
};

export default useUrlShortener;

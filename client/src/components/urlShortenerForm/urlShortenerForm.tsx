import { useEffect, useState } from 'react';
import { shortenUrl } from '../../services/urlService';
import { PageConstants } from '../../constant/constants';

interface UrlShortenerFormProps {
  parentComponent: string;
}

const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({
    parentComponent,
  }) => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitButtonText, setSubmitButtonText] = useState<string>('');
  const [showLink, setShowLink] = useState<boolean>(false);

  useEffect(() => {
    if (parentComponent == PageConstants.HOME) {
      setSubmitButtonText('Shorten URL');
      setShowLink(true);
    }
    if (parentComponent == PageConstants.COLLECTION) {
      setSubmitButtonText('Add to collection');
    }
  }, []);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await shortenUrl(originalUrl);
      setShortUrl(response.shortUrl);
    } catch (err) {
      setError('Error creating short URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="urlInput">Enter your URL:</label>
        <input
          type="text"
          id="urlInput"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="http://example.com"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : submitButtonText}
        </button>
      </form>

      {error && <p>{error}</p>}
      {showLink && shortUrl && (
        <div>
          <p>Your short URL:</p>
          <a href={`/${shortUrl}`} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};
export default UrlShortenerForm;


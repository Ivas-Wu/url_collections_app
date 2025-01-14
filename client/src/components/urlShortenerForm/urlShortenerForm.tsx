import React, { useState, useEffect } from 'react';
import { shortenUrl } from '../../services/urlService';
import { PageConstants } from '../../constant/constants';
import { Url } from '../../models/url.models'
import { addCollection } from '../../services/collectionService';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

interface UrlShortenerFormProps {
  parentComponent: string;
  parentUrl?: string;
  onUrlAdded?: () => void;
}

const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({
  parentComponent,
  parentUrl,
  onUrlAdded,
}) => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitButtonText, setSubmitButtonText] = useState<string>('');
  const [showLink, setShowLink] = useState<boolean>(false);
  const [addToCollection, setAddToCollection] = useState<boolean>(false);

  useEffect(() => {
    if (parentComponent === PageConstants.HOME) {
      setSubmitButtonText('Shorten URL');
      setShowLink(true);
    }
    if (parentComponent === PageConstants.COLLECTION) {
      setSubmitButtonText('Add to collection');
      setAddToCollection(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      var response: Url | null = null;
      if (addToCollection && onUrlAdded) {
        response = await addCollection(parentUrl || "", null, originalUrl, null);
        onUrlAdded();
      } else {
        response = await shortenUrl(originalUrl);
      }
      setShortUrl(response!.shortUrl);
    } catch (err) {
      setError('Error creating short URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        {parentComponent === PageConstants.HOME ? 'Shorten URL' : 'Add to collection'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="http://example.com"
          disabled={loading}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Shortening...' : submitButtonText}
        </Button>
      </form>

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {showLink && shortUrl && (
        <div>
          <Typography variant="h6" gutterBottom>
            Your short URL:
          </Typography>
          <a href={`/${shortUrl}`} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </Paper>
  );
};

export default UrlShortenerForm;
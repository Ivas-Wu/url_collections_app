import React, { useState, useEffect } from 'react';
import { shortenUrl } from '../../services/urlService';
import { PageConstants } from '../../constant/constants';
import { Url } from '../../models/url.models';
import { addCollection } from '../../services/collectionService';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { textboxStyles } from '../styles/textboxStyles';

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
  const [altName, setAltName] = useState<string | null>(null);
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
    if (!originalUrl.trim()) {
      setError('Collection name cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let response: Url | null = null;
      if (addToCollection && onUrlAdded) {
        response = await addCollection(parentUrl || '', null, originalUrl.trim(), altName);
        onUrlAdded();
      } else {
        response = await shortenUrl(originalUrl.trim(), altName);
      }
      setShortUrl(response!.shortUrl);
      setOriginalUrl('');
      setAltName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={textboxStyles.paper}>
      <Typography sx={textboxStyles.title}>
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
          sx={textboxStyles.textField}
        />
        <TextField
          fullWidth
          label="Enter a name"
          value={altName}
          onChange={(e) => setAltName(e.target.value)}
          placeholder="Site 1"
          disabled={loading}
          sx={textboxStyles.textField}
        />
        <Button
          sx={textboxStyles.button}
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
        <Box sx={textboxStyles.link}>
          <Typography variant="h6" gutterBottom>
            Your short URL:
          </Typography>
          <a
            href={`/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={textboxStyles.link.a}
          >
            {shortUrl}
          </a>
        </Box>
      )}
    </Paper>
  );
};

export default UrlShortenerForm;
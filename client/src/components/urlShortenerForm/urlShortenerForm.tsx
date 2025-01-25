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
  IconButton,
} from '@mui/material';
import { textboxStyles } from '../styles/textboxStyles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
  const [submitButtonText, setSubmitButtonText] = useState<string>('');

  const [showLink, setShowLink] = useState<boolean>(false);
  const [addToCollection, setAddToCollection] = useState<boolean>(false);
  const [showAdditionalSettings, setShowAdditionalSettings] = useState<boolean>(true);

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

  const getIcon = () => {
    return showAdditionalSettings ? <RemoveIcon /> : <AddIcon />
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + `/${shortUrl}`).then(() => {
    }).catch((err) => {
    });
  };

  return (
    <Paper sx={textboxStyles.paper}>
      <Box sx={textboxStyles.titleContainer}>
        <Typography sx={textboxStyles.titleText} >
          {parentComponent === PageConstants.HOME ? "Shorten URL" : "Add to collection"}
        </Typography>
        <Box
          component="button"
          onClick={() => setShowAdditionalSettings(!showAdditionalSettings)}
          sx={textboxStyles.titleIcon}
        >
          {getIcon()}
        </Box>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={textboxStyles.formBody} onKeyPress={handleKeyPress}>
        <TextField
          fullWidth
          label="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder=""
          disabled={loading}
          sx={textboxStyles.textField}
        />

        {showAdditionalSettings && (
          <TextField
            fullWidth
            label="Add a title"
            value={altName}
            onChange={(e) => setAltName(e.target.value)}
            placeholder="Site 1"
            disabled={loading}
            sx={textboxStyles.textField}
          />
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            sx={textboxStyles.button}
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Shortening...' : submitButtonText}
          </Button>
        </Box>
      </Box>

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
          <a
            href={`/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={textboxStyles.link.a}
          >
            {shortUrl}
          </a>
          <IconButton onClick={handleCopy} sx={{ ml: 1 }}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default UrlShortenerForm;
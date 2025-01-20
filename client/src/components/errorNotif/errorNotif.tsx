import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface errorNotifParams {
  errorMessage: string;
  clearError: (returnString: string) => void;
}

const ErrorNoficationsComponent: React.FC<errorNotifParams> = ({
  errorMessage,
  clearError,
}) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage(errorMessage)
  }, [errorMessage]);

  return (
    <div>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => clearError('')}
      >
        <Alert onClose={() => clearError('')} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorNoficationsComponent;


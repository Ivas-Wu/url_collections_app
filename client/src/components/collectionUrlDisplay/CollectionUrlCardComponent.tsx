import React from 'react';
import { Paper, Box } from '@mui/material';
import { Url } from '../../models/url.models';
import { AccessConstants } from '../../constant/constants';
import CollectionUrlDisplayComponent from './CollectionUrlDisplayComponent';

interface CollectionUrlCardComponentProps {
    urls: Url[];
    userAccess: AccessConstants;
    onUrlChanged: () => void;
    onError: (errorMessage: string) => void;
}

const CollectionUrlCardComponent: React.FC<CollectionUrlCardComponentProps> = ({ urls, userAccess, onUrlChanged, onError }) => {

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 2, justifyContent: 'start' }}>
            {urls.map((url) => (
                <Box key={url.shortUrl}>
                    <CollectionUrlDisplayComponent
                        url={url}
                        userAccess={userAccess}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default CollectionUrlCardComponent;

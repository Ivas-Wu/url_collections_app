import React, { useEffect, useRef, useState } from 'react';
import CollectionDisplayFlat from '../components/collectionDisplayFlat/collectionDisplayFlat';
import { Box } from '@mui/material';
import { Collection } from '../models/collections.models';
import { getUserCollections } from '../services/collectionService';
import ErrorNoficationsComponent from '../components/errorNotif/errorNotif';

const UserCollectionsPage: React.FC = () => {
    const [collections, setCollections] = useState<Collection[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const redirectingRef = useRef(false);

    useEffect(() => {
        const fetchCollections = async () => {
            if (redirectingRef.current) return;

            redirectingRef.current = true;
            try {
                const response: Collection[] = await getUserCollections();
                setCollections(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'No collection found.');
            } finally {
                redirectingRef.current = false;
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    const placeholder = (childError: string) => {
    };

    return (

        <Box>
            {!loading && collections && (
                collections.map((collection: Collection) => (
                    <CollectionDisplayFlat collection={collection} />
                ))
            )}
            {error && (
                <ErrorNoficationsComponent
                    errorMessage={error}
                    clearError={placeholder}
                />
            )}
        </Box>
    );
};

export default UserCollectionsPage;

import React, { useEffect, useState } from 'react';
import CollectionDetailListing from '../components/collectionDetailListing/collectionDetailListing';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import { PageConstants } from '../constant/constants';
import { useParams } from 'react-router-dom';
import { Collection } from '../models/collections.models';
import { getCollection } from '../services/collectionService';
import { Box, Typography } from '@mui/material';
import { textboxStyles } from '../styles/textboxStyles';

const CollectionsPage: React.FC = () => {
  const { collectionId } = useParams();
  const [collections, setCollections] = useState<Collection>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
      const fetchCollections = async () => {
        try {
          const response: Collection = await getCollection(collectionId);
          setCollections(response);
        } catch (err) {
          //setError(err instanceof Error ? err.message : 'An error occurred');
          setError("No collection found.")
        } finally {
          setLoading(false);
        }
      };
  
      fetchCollections();
    }, [refreshTable]);
  
    if (error) {
      return (
        <Box sx={textboxStyles.errorbox}>
          <Typography variant="h5" color="error">
            {error}
          </Typography>
        </Box>
      );
    }
  
    return (
      <div>
        <UrlShortenerForm
          parentComponent={PageConstants.COLLECTION}
          parentUrl={collectionId}
          onUrlAdded={() => setRefreshTable(!refreshTable)}
        />
        {!loading && collections && (
          <CollectionDetailListing
            collectionId={collectionId || ""}
            collectionData={collections}
            onUrlChanged={() => setRefreshTable(!refreshTable)}
          />
        )}
      </div>
    );
  };
  
  export default CollectionsPage;


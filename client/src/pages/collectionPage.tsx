import React, { useEffect, useState } from 'react';
import CollectionDetailListing from '../components/collectionDetailListing/collectionDetailListing';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import { PageConstants } from '../constant/constants';
import { useParams } from 'react-router-dom';
import { Collection } from '../models/collections.models';
import { getCollection } from '../services/collectionService';

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
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCollections();
    }, [refreshTable]);
  
  return (
    <div>
      <UrlShortenerForm
        parentComponent={PageConstants.COLLECTION}
        parentUrl={collectionId}
        onUrlAdded={() => setRefreshTable(!refreshTable)}
      />
      {!loading && 
      <CollectionDetailListing 
        collectionId={collectionId||""}
        collectionData={collections}
        onUrlChanged={() => setRefreshTable(!refreshTable)}
      />}
    </div>
  );
};

export default CollectionsPage;


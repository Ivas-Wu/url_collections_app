import React, { useEffect, useRef, useState } from 'react';
import CollectionDetailListing from '../components/collectionDetailListing/collectionDetailListing';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import { AccessConstants, PageConstants } from '../constant/constants';
import { useParams } from 'react-router-dom';
import { Collection } from '../models/collections.models';
import { getCollection } from '../services/collectionService';
import { Box, Button, Typography } from '@mui/material';
import { textboxStyles } from '../components/styles/textboxStyles';
import ErrorNoficationsComponent from '../components/errorNotif/errorNotif';
import CollectionSettingsModal from '../components/collectionSetting/CollectionSettingsModal';

const CollectionsPage: React.FC = () => {
  const { collectionId } = useParams();
  const [collections, setCollections] = useState<Collection>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [childError, setChildError] = useState<string>("");
  const [refreshTable, setRefreshTable] = useState(false);
  const redirectingRef = useRef(false);

  const [userAccess, setUserAccess] = useState<AccessConstants>();
  const [editAccess, setEditAccess] = useState<boolean>(false);
  const [ownerAccess, setOwnerAccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCollections = async () => {
      if (redirectingRef.current) return;

      redirectingRef.current = true;
      try {
        const response: any = await getCollection(collectionId);
        const userAccess: AccessConstants = response.userAccess;
        setCollections(response.collection);
        setUserAccess(userAccess);
        setEditAccess(userAccess <= AccessConstants.FULL);
        setOwnerAccess(userAccess <= AccessConstants.OWNER);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No collection found.');
      } finally {
        redirectingRef.current = false;
        setLoading(false);
      }
    };

    fetchCollections();
  }, [refreshTable]);

  const handleChildError = (childError: string) => {
    setChildError(childError);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRefreshTable(!refreshTable);
  };

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
      {editAccess && (<UrlShortenerForm
        parentComponent={PageConstants.COLLECTION}
        parentUrl={collectionId}
        onUrlAdded={() => setRefreshTable(!refreshTable)}
      />)}
      {!loading && collections && (
        <CollectionDetailListing
          collectionId={collectionId ?? ""}
          collectionData={collections}
          userAccess={userAccess ?? AccessConstants.VIEW_ONLY}
          onUrlChanged={() => setRefreshTable(!refreshTable)}
          onError={handleChildError}
        />
      )}
      {!loading && collections && ownerAccess && (
        <CollectionSettingsModal
          open={isModalOpen}
          collection={collections}
          onClose={() => closeModal()}
          onError={handleChildError}
        />
      )}
      {!loading && collections && ownerAccess && (
        <Button onClick={() => setIsModalOpen(true)}>Open Settings</Button>
      )}
      {childError && (
        <ErrorNoficationsComponent
          errorMessage={childError}
          clearError={handleChildError}
        />
      )}
    </div>
  );
};

export default CollectionsPage;


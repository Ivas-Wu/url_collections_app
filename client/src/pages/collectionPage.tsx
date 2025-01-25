import React, { useEffect, useRef, useState } from 'react';
import CollectionDetailListing from '../components/collectionDetailListing/collectionDetailListing';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import { AccessConstants, PageConstants } from '../constant/constants';
import { useParams } from 'react-router-dom';
import { Collection } from '../models/collections.models';
import { getCollection } from '../services/collectionService';
import { Box, Button, Fab, Tab, Tabs, Typography } from '@mui/material';
import { textboxStyles } from '../components/styles/textboxStyles';
import ErrorNoficationsComponent from '../components/errorNotif/errorNotif';
import CollectionSettingsModal from '../components/collectionSetting/CollectionSettingsModal';
import pattern from '../assets/dot-grid.webp';
import { pageBaseStyles } from './pageStyles';
import CollectionUrlCardComponent from '../components/collectionUrlDisplay/CollectionUrlCardComponent';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const CollectionsPage: React.FC = () => {
  const { collectionId } = useParams();
  const [collections, setCollections] = useState<Collection>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlAdder, setUrlAdder] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [childError, setChildError] = useState<string>("");
  const [refreshTable, setRefreshTable] = useState(false);
  const redirectingRef = useRef(false);
  const [tabValue, setTabValue] = React.useState(1);

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

  const tabChanged = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
    <Box
      sx={{
        ...pageBaseStyles.container,
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
      }}
    >
      <Box sx={pageBaseStyles.title}>
        <Typography variant='h2'>
          {collections?.collectionName}
        </Typography>
        <Typography variant='h6'>
          A longer chunk of text that will be replaced by a description once I have that implimented
        </Typography>
      </Box>

      {editAccess && urlAdder && (<UrlShortenerForm
        parentComponent={PageConstants.COLLECTION}
        parentUrl={collectionId}
        onUrlAdded={() => setRefreshTable(!refreshTable)}
      />)}
      <Box sx={{
        width: '100%',
        height: '100%',
        pl: '2em',
        pr: '2em',
      }}>
        <Tabs value={String(tabValue)} onChange={tabChanged}>
          <Tab label="URL View" value="1" />
          <Tab label="Table View" value="2" />
        </Tabs>

        <TabPanel value={String(tabValue)} index="1">
          <Box sx={{
            width: '100%',
            height: '100%',
            pt: '2em'
          }}>
            {!loading && collections && (
              <CollectionUrlCardComponent
                urls={collections.urls}
                userAccess={userAccess ?? AccessConstants.VIEW_ONLY}
                onUrlChanged={() => setRefreshTable(!refreshTable)}
                onError={handleChildError}
              />
            )}
          </Box>
        </TabPanel>

        <TabPanel value={String(tabValue)} index="2">
          <Box sx={{
            width: '100%',
            height: '100%',
            pt: '2em'
          }}>
            {!loading && collections && (
              <CollectionDetailListing
                collectionId={collectionId ?? ""}
                collectionData={collections}
                userAccess={userAccess ?? AccessConstants.VIEW_ONLY}
                onUrlChanged={() => setRefreshTable(!refreshTable)}
                onError={handleChildError}
              />
            )}
          </Box>
        </TabPanel>
      </Box>

      {!loading && collections && ownerAccess && (
        <CollectionSettingsModal
          open={isModalOpen}
          collection={collections}
          onClose={() => closeModal()}
          onError={handleChildError}
        />
      )}
      <Box sx={{
        position: 'fixed',
        bottom: '1em',
        right: '1em',
        zIndex: 1000,
        display: 'flex',
        gap: '1em'
      }}>
        {editAccess && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setUrlAdder(!urlAdder)}
          >
            <AddIcon />
          </Fab>
        )}
        {!loading && collections && ownerAccess && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setIsModalOpen(true)}
          >
            <EditIcon />
          </Fab>
        )}

      </Box>

      {childError && (
        <ErrorNoficationsComponent
          errorMessage={childError}
          clearError={handleChildError}
        />
      )}
    </Box>

  );
};

interface TabPanelProps {
  children: React.ReactNode;
  value: string;
  index: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default CollectionsPage;


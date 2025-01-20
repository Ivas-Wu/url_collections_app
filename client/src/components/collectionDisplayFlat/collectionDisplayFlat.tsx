import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CollectionDetailListing from '../collectionDetailListing/collectionDetailListing';
import { Collection } from '../../models/collections.models';
import { AccessConstants } from '../../constant/constants';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

interface CollectionDisplayFlatParams {
  collection: Collection;
}

const CollectionDisplayFlat: React.FC<CollectionDisplayFlatParams> = ({ collection }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAccordionChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const placeholder = () => {

  }

  const handleButtonClick = () => {
    navigate(`/collections/${collection.collectionUrl}`);
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">{collection.collectionName}</Typography>
        <Button
          onClick={handleButtonClick}
          style={{
            minWidth: 0,
            padding: 0,
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: 'none',
          }}
        >
          <ChevronRightIcon />
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <CollectionDetailListing
            collectionId={collection.collectionUrl ?? ""}
            collectionData={collection}
            userAccess={AccessConstants.VIEW_ONLY}
            onUrlChanged={() => placeholder()}
            onError={placeholder}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CollectionDisplayFlat;

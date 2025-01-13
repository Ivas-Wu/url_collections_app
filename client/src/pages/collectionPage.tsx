import React from 'react';
import CollectionDetailListing from '../components/collectionDetailListing/collectionDetailListing';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import { PageConstants } from '../constant/constants';

const CollectionsPage: React.FC = () => {
  return (
    <div>
      <UrlShortenerForm
        parentComponent={PageConstants.COLLECTION}
      />
      <CollectionDetailListing />
    </div>
  );
};

export default CollectionsPage;
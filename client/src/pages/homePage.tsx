import React from 'react';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import CreateCollection from '../components/collectionCreate/createCollectionComponent';
import { PageConstants } from '../constant/constants';

const HomePage: React.FC = () => {

  return (
    <div>
      <UrlShortenerForm
        parentComponent={PageConstants.HOME}
      />
      <CreateCollection/>
    </div>
  );
};

export default HomePage;

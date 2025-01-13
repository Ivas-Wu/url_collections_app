import React, { useEffect, useState } from 'react';
import type { CollectionItem, Collection } from '../../models/collections.models';
import { getCollection } from '../../services/collectionService';
import './collectionDetailListing.css';
import { useParams } from 'react-router-dom';

const CollectionDetailListing: React.FC = () => {
  const { collectionId } = useParams();
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: keyof CollectionItem; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response: Collection = await getCollection(collectionId);
        setCollections(response.urls);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const sortedCollections = [...collections].sort((a, b) => {
    if (sortConfig) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const currentCollections = sortedCollections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key: keyof CollectionItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Collection Details</h2>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => requestSort('altName')}>ID</button>
            </th>
            <th>
              <button onClick={() => requestSort('createdAt')}>Name</button>
            </th>
            <th>
              <button onClick={() => requestSort('shortUrl')}>Short URL</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCollections.map((collection) => (
            <tr key={collection.altName}>
              <td>{collection.altName}</td>
              <td>{collection.createdAt}</td>
              <td><a href={`/${collection.shortUrl}`} target="_blank" rel="noopener noreferrer">
                {collection.shortUrl}
              </a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= collections.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CollectionDetailListing;
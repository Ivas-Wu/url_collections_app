import React, { useState } from 'react';
import { createCollection } from '../../services/collectionService'; 
import './createCollectionComponent.css'
import { Collection } from '../../models/collections.models';

const CreateCollection: React.FC = () => {
  const [collectionName, setCollectionName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [collectionUrl, setCollectionUrl] = useState<string | null>(null);

  const handleCreateCollection = async () => {
    if (!collectionName.trim()) {
      setError('Collection name cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newUrl: Collection = await createCollection(collectionName);

      if (newUrl) {
        setCollectionUrl(`collections/${newUrl.collectionUrl}`);
        setSuccess(true);
        setCollectionName(''); 
      } else {
        throw new Error('Failed to create collection');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a New Collection</h2>
      <input
        type="text"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        placeholder="Enter collection name"
        disabled={loading}
      />
      <button onClick={handleCreateCollection} disabled={loading}>
        {loading ? 'Creating...' : 'Create Collection'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green' }}>
          Collection created successfully!{' '}
          {collectionUrl && (
            <a href={collectionUrl} target="_blank" rel="noopener noreferrer">
              View Collection
            </a>
          )}
        </p>
      )}
    </div>
  );
};

export default CreateCollection;
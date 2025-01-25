import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Typography,
  Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Collection } from '../../models/collections.models';
import { removeUrlFromCollection } from '../../services/collectionService';
import { Url } from '../../models/url.models';
import { AccessConstants } from '../../constant/constants';
import tableStyles from '../styles/tableStyles';

interface CollectionDetailsProps {
  collectionId: string;
  collectionData: Collection | undefined;
  userAccess: AccessConstants;
  onUrlChanged: () => void;
  onError: (errorMessage: string) => void;
}

const CollectionDetailListing: React.FC<CollectionDetailsProps> = ({
  collectionId,
  collectionData,
  userAccess,
  onUrlChanged,
  onError,
}) => {
  const [collections, setCollections] = useState<Url[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const [editAccess, setEditAccess] = useState<boolean>(false);
  const [ownerAccess, setOwnerAccess] = useState<boolean>(false);

  useEffect(() => {
    if (collectionData) {
      setCollections(collectionData.urls);
    }
    setEditAccess(userAccess <= AccessConstants.FULL);
    setOwnerAccess(userAccess <= AccessConstants.OWNER);
  }, [collectionData]);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    rowId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleDelete = async (rowId: string) => {
    try {
      await removeUrlFromCollection(collectionId, rowId);
      onUrlChanged();
      handleMenuClose();
    }
    catch (err) {
      onError(err instanceof Error ? err.message : 'Cannot remove collection.');
    }
  };

  const columns = [
    { field: 'altName', headerName: 'Name', width: 300 },
    { field: 'originalUrl', headerName: 'URL', width: 200 },
    {
      field: 'shortUrl',
      headerName: 'Short URL',
      width: 200,
      renderCell: (params: any) => (
        <a
          href={`/${params.value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.value}
        </a>
      ),
    },
    { field: 'ownerName', headerName: 'Created By', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'viewCount', headerName: 'View Count', width: 100 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params: any) => (
        editAccess ? (
          <IconButton
            aria-label="actions"
            onClick={(e) => handleMenuClick(e, params.row.shortUrl)}
          >
            <MoreVertIcon />
          </IconButton>
        ) : null
      ),
    },
  ];

  const rows = collections.map((collection) => ({
    id: collection.shortUrl,
    altName: collection.altName,
    originalUrl: collection.originalUrl,
    shortUrl: collection.shortUrl,
    viewCount: collection.viewCount,
    ownerName: collection.ownerName,
    createdAt: collection.createdAt,
  }));

  return (
    <Paper>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDelete(selectedRowId!)}>Remove from collection</MenuItem>
      </Menu>
    </Paper>
  );
};

export default CollectionDetailListing;

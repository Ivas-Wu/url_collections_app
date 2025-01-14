import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { CollectionItem, Collection } from '../../models/collections.models';
import { removeUrlFromCollection } from '../../services/collectionService';

interface CollectionDetailsProps {
  collectionId: string;
  collectionData: Collection | undefined;
  onUrlChanged: () => void;
}

const CollectionDetailListing: React.FC<CollectionDetailsProps> = ({
  collectionId,
  collectionData,
  onUrlChanged,
}) => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  useEffect(() => {
    if (collectionData) {
      setCollections(collectionData.urls);
    }
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
    await removeUrlFromCollection(collectionId, rowId);
    onUrlChanged();
    handleMenuClose();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Collection Details
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((collection) => (
                <TableRow key={collection.altName}>
                  <TableCell>{collection.altName}</TableCell>
                  <TableCell>{collection.originalUrl}</TableCell>
                  <TableCell>
                    <a
                      href={`/${collection.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {collection.shortUrl}
                    </a>
                  </TableCell>
                  <TableCell>{collection.createdAt}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="actions"
                      onClick={(e) => handleMenuClick(e, collection.shortUrl)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDelete(selectedRowId!)}>Remove from collection</MenuItem>
        {/* Add more menu items here if needed */}
      </Menu>
      <Pagination
        count={Math.ceil(collections.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Paper>
  );
};

export default CollectionDetailListing;
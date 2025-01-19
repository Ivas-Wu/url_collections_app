import React, { useEffect, useRef, useState } from 'react';
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
import type { Collection } from '../../models/collections.models';
import { removeUrlFromCollection } from '../../services/collectionService';
import tableStyles from '../styles/tableStyles';
import { Url } from '../../models/url.models';
import { AccessConstants } from '../../constant/constants';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
    try{
      await removeUrlFromCollection(collectionId, rowId);
      onUrlChanged();
      handleMenuClose();
    }
    catch (err) {
      onError(err instanceof Error ? err.message : 'Cannot remove collection.');
    }
    
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Paper sx={tableStyles.paper}>
      <Typography sx={tableStyles.typography} variant="h4" gutterBottom>
        Collection Details
      </Typography>
      <TableContainer sx={tableStyles.tableContainer}>
        <Table>
          <TableHead sx={tableStyles.tableHead}>
            <TableRow>
              <TableCell sx={tableStyles.tableCell}>Name</TableCell>
              <TableCell sx={tableStyles.tableCell}>URL</TableCell>
              <TableCell sx={tableStyles.tableCell}>Short URL</TableCell>
              <TableCell sx={tableStyles.tableCell}>Created At</TableCell>
              <TableCell sx={tableStyles.tableCell}>Actions</TableCell>
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
        {editAccess && (<MenuItem onClick={() => handleDelete(selectedRowId!)}>Remove from collection</MenuItem>)}
        {/* Add more menu items here if needed */}
      </Menu>
      <Pagination
        count={Math.ceil(collections.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={tableStyles.pagination}
      />
    </Paper>
  );
};

export default CollectionDetailListing;

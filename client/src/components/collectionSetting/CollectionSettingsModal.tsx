import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { CollectionSettingsModalStyles } from "./CollectionSettingsModalStyles";
import { Collection } from '../../models/collections.models';
import { CollectionAccessConstants } from "../../constant/constants";
import { textboxStyles } from "../styles/textboxStyles";
import SettingTableListing from "./SettingTableListing";
import { updateCollectionSettings } from "../../services/collectionService";

interface CollectionSettingsModalProps {
  open: boolean;
  collection: Collection;
  onClose: () => void;
  onError: (errorMessage: string) => void;
}

const CollectionSettingsModal: React.FC<CollectionSettingsModalProps> = ({
  open,
  collection,
  onClose,
  onError,
}) => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionAccess, setCollectionAccess] = useState<number>(3);
  const tableRef = useRef<{ getValues: () => { accessList: string[] } }>(null);

  useEffect(() => {
    if (collection) {
      setCollectionName(collection.collectionName);
      setCollectionAccess(collection.visibility);
    }
  }, [collection]);

  const handleSave = async () => {
    if (tableRef.current) {
      const { accessList } = tableRef.current.getValues();
      try {
        await updateCollectionSettings(collection.collectionUrl, collectionAccess, collectionName, accessList);
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Cannot update collection settings.');
      } finally {
        onClose();
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={CollectionSettingsModalStyles.modalBox}>
        <Typography sx={textboxStyles.title}>
          Collection Settings
        </Typography>
        <Box sx={CollectionSettingsModalStyles.displayParentContainer}>
          <Box sx={CollectionSettingsModalStyles.displayChild}>
            <TextField
              fullWidth
              label="Title"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value.slice(0, 20))}
              helperText={`${collectionName.length}/20`}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Select Option"
              value={collectionAccess}
              onChange={(e) => setCollectionAccess(Number(e.target.value))}
              margin="normal"
            >
              {Object.entries(CollectionAccessConstants)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                  <MenuItem key={value} value={value}>
                    {key.replace("_", " ")}
                  </MenuItem>
                ))}
            </TextField>
            <SettingTableListing
              ref={tableRef}
              collection={collection}
            ></SettingTableListing>
          </Box>
        </Box>

        <Box mt={3} textAlign="right">
          <Button onClick={onClose} sx={CollectionSettingsModalStyles.cancelButton}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CollectionSettingsModal;

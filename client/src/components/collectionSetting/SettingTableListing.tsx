import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Collection } from '../../models/collections.models';
import tableStyles from "../styles/tableStyles";

interface SettingTableListingParams {
    collection: Collection;
}

const SettingTableListing = forwardRef((props: SettingTableListingParams, ref) => {
    const { collection } = props;
    const [accessList, setAccessList] = useState<string[]>([]);
    const [newUser, setNewUser] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        if (collection) {
            setAccessList(collection.accessList);
        }
    }, [collection]);

    useImperativeHandle(ref, () => ({
        getValues: () => ({
            accessList
        }),
    }));

    const handleAddEmail = () => {
        if (newUser.trim() && !accessList.includes(newUser.trim())) {
            setAccessList((prevEmails) => [...prevEmails, newUser.trim()]);
            setNewUser("");
        }
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setAccessList((prevEmails) => prevEmails.filter((email) => email !== emailToRemove));
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Box display="flex" mt={1}>
                <TextField
                    fullWidth
                    label="Add Email"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddEmail}>
                    Add
                </Button>
            </Box>
            <Paper sx={tableStyles.paper}>
                <Typography sx={tableStyles.typography} gutterBottom>
                    Users that have access to this collection.
                </Typography>
                <TableContainer sx={tableStyles.tableContainerSettings}>
                    <Table stickyHeader>
                        <TableHead sx={tableStyles.tableHead}>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        backgroundColor: 'white',
                                        fontSize: '0.9rem',
                                        padding: '0.8em',
                                        width: '85%'
                                    }}>Email</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accessList
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((al) => (
                                    <TableRow key={al}>
                                        <TableCell>{al}</TableCell>
                                        <TableCell>
                                            <IconButton edge="end" onClick={() => handleRemoveEmail(al)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    count={Math.ceil(accessList.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={tableStyles.pagination}
                />
            </Paper>
        </div>
    );
});

export default SettingTableListing;

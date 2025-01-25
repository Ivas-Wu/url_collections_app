import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, IconButton, CardActions, Box, TextField } from '@mui/material';
import { Url } from '../../models/url.models';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { AccessConstants } from '../../constant/constants';

interface CollectionUrlDisplayProps {
    url: Url;
    userAccess: AccessConstants;
}

const CollectionUrlDisplayComponent: React.FC<CollectionUrlDisplayProps> = ({ url, userAccess }) => {
    const [flipped, setFlipped] = useState(false);
    const [textDisabled, setTextDisabled] = useState(true);

    const [editAccess, setEditAccess] = useState<boolean>(false);
    const [ownerAccess, setOwnerAccess] = useState<boolean>(false);

    useEffect(() => {
        setEditAccess(userAccess <= AccessConstants.FULL);
        setOwnerAccess(userAccess <= AccessConstants.OWNER);
    }, [userAccess]);

    const handleFlip = () => setFlipped(!flipped);

    const handleUpVote = async (event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            await fetch('/api/upvote', {
                method: 'POST',
                body: JSON.stringify({ urlId: url.shortUrl }),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Failed to upvote', error);
        }
    };

    const handleDownVote = async (event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            await fetch('/api/downvote', {
                method: 'POST',
                body: JSON.stringify({ urlId: url.shortUrl }),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Failed to downvote', error);
        }
    };

    const handleUrlDescriptionEdit = async (event: React.MouseEvent) => {
        event.stopPropagation();
        setTextDisabled(false);
    }

    const handleUrlDescriptionSave = async (event: React.MouseEvent) => {
        event.stopPropagation();
        setTextDisabled(true);
    }

    const handleRemoveUrlFromCollection = async (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    const handleCopy = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/${url.shortUrl}`);
    };

    const handleOpenLink = (event: React.MouseEvent) => {
        event.stopPropagation();
        window.open(`${window.location.origin}/${url.shortUrl}`, '_blank');
    };

    return (
        <Card sx={{ width: 250, height: 350, perspective: 1000 }}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    '&:hover': { cursor: 'pointer' },
                }}
                onClick={handleFlip}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        {url.altName}
                    </Typography>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        <IconButton onClick={handleCopy} sx={{ color: 'primary.main' }}>
                            <ContentCopyIcon />
                        </IconButton>
                        <IconButton onClick={handleOpenLink} sx={{ color: 'primary.main' }}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        <IconButton onClick={handleDownVote} sx={{ color: 'primary.main' }}>
                            <ArrowCircleDownIcon />
                        </IconButton>
                        <Typography sx={{ alignContent: 'center' }} variant="body1">{url.upCount - url.downCount}</Typography>
                        <IconButton onClick={handleUpVote} sx={{ color: 'primary.main' }}>
                            <ArrowCircleUpIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        padding: '2em',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <TextField
                        label="Discription/Notes"
                        multiline
                        value={url.originalUrl}
                        variant="outlined"
                        fullWidth
                        disabled={textDisabled}
                        sx={{
                            height: 'auto',
                            flexGrow: 1,
                            '& .MuiInputBase-root': {
                                height: '100%',
                            },
                            '& textarea': {
                                height: '100%',
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'flex-end' }}>
                        {textDisabled && editAccess && (<IconButton
                            onClick={(event) => handleUrlDescriptionEdit(event)}
                            sx={{
                                color: 'primary.main',
                                marginTop: '0.5em',
                            }}
                        >
                            <EditIcon />
                        </IconButton>)}
                        {!textDisabled && editAccess && (<IconButton
                            onClick={(event) => handleUrlDescriptionSave(event)}
                            sx={{
                                color: 'primary.main',
                                marginTop: '0.5em',
                            }}
                        >
                            <SaveIcon />
                        </IconButton>)}
                        {editAccess && (<IconButton
                            onClick={(event) => handleRemoveUrlFromCollection(event)}
                            sx={{
                                color: 'primary.main',
                                marginTop: '0.5em',
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>)}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default CollectionUrlDisplayComponent;

import React from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Typography } from '@mui/material';
import { landingPageStyles } from './pageStyles';
import { Link } from 'react-router-dom';
import collectionsImage from '../assets/missingimage.jpg';

interface navigationCardItem {
    title: string;
    path: string;
}

const LandingPage: React.FC = () => {
    const navigationCard: navigationCardItem[] = [
        {
            title: "Urls",
            path: "/url"
        },
        {
            title: "Collections",
            path: "/collection"
        },
        {
            title: "About",
            path: "/About"
        },
    ]
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            flexWrap: 'wrap'
        }}>
            <Container sx={landingPageStyles.topContainer}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={landingPageStyles.titleText}>
                        <Typography sx={landingPageStyles.titleTextTitle}>
                            UCollect
                        </Typography>
                        <Typography sx={landingPageStyles.titleTextSubtitle}>
                            Url shortener with public collection hosting. Clean up your group chats and share all your links here!
                        </Typography>
                        <Button sx={landingPageStyles.titleButton}
                            variant="contained" component={Link} to="/home">Get Started</Button>
                    </Box>
                </Box>
            </Container>
            <Divider />

            <Container sx={landingPageStyles.detailsContainer}>
                <Box sx={landingPageStyles.detailsTitle}>
                    <Typography variant='h3' sx={landingPageStyles.textSubtitle}>
                        How are we different?
                    </Typography>
                    <Typography variant='h6'>
                        There are a million url shorteners in existence, a collection is our little spice in the curry.
                        Collections are a way for a user to create groups of shortened urls that can be hosted here.
                        Instead of clogging group chats with endless unreadable link spam, you can send one collection,
                        and add the rest of the details there!
                    </Typography>
                </Box>
                <Container>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        {navigationCard.map((cardDetails) => (
                            <Card sx={landingPageStyles.navigationCard}>
                                <CardActionArea>
                                    <CardContent sx={{ height: '100%' }}>
                                        <Typography variant="h5" component="div">
                                            {cardDetails.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {cardDetails.path}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </Container>
                <Divider />
                <Box sx={landingPageStyles.bodyBox}>
                    <Typography variant='h4' sx={landingPageStyles.textSubtitle}>
                        Collections
                    </Typography>
                    <Box sx={landingPageStyles.detailsBox}>
                        <Box sx={{
                            flex: 1
                        }}>
                            <Typography variant='h6' sx={landingPageStyles.textBody}>
                                Collection Url Hash
                            </Typography>
                            <Typography variant='body1' sx={landingPageStyles.textBody}>
                                The collection's url hash is the 12 character alphanumeric string that we give you after a collection
                                is created! A url hash will always be unique to a collection.
                            </Typography>
                        </Box>
                        <Box sx={{
                            ...landingPageStyles.detailsBoxItems,
                            flex: 1
                        }}>
                            <CardMedia
                                component="img"
                                image={collectionsImage}
                                alt="Collections Image"
                            />
                        </Box>
                    </Box>
                    <Box sx={landingPageStyles.detailsBox}>
                        <Box sx={{
                            flex: 1
                        }}>
                            <Typography variant='h6' sx={landingPageStyles.textBody}>
                                Collection Navigation
                            </Typography>
                            <Typography variant='body1' sx={landingPageStyles.textBody}>
                                There are a few ways to navigate to the collection. Upon collection creation we will provide a direct
                                link which can also be copied and pasted. From the collections page there is a search functionality in
                                which you can provide the hash to get redirected to the collection in question. If the collection is made
                                by a user who has logged in, the list of all collections created by said user will be avaliable to them on
                                their 'My Collections' page.
                            </Typography>
                        </Box>
                        <Box sx={{
                            ...landingPageStyles.detailsBoxItems,
                            flex: 1
                        }}>
                            <CardMedia
                                component="img"
                                image={collectionsImage}
                                alt="Collections Image"
                            />
                        </Box>
                    </Box>
                    <Box sx={landingPageStyles.detailsBox}>
                        <Box sx={{
                            flex: 1
                        }}>
                            <Typography variant='h6' sx={landingPageStyles.textBody}>
                                Collection Name/Descriptions
                            </Typography>
                            <Typography variant='body1' sx={landingPageStyles.textBody}>
                                Colletion names and descriptions are not unqiue, you can name a collection whatever you want (within reason).
                                They are there to help users have a first look as to what the collection might be about. The description is
                                a slightly longer note that can be useful for further describing the use of the collection.
                            </Typography>
                        </Box>
                        <Box sx={{
                            ...landingPageStyles.detailsBoxItems,
                            flex: 1
                        }}>
                            <CardMedia
                                component="img"
                                image={collectionsImage}
                                alt="Collections Image"
                            />
                        </Box>
                    </Box>
                    <Box sx={landingPageStyles.detailsBox}>
                        <Box sx={{
                            flex: 1
                        }}>
                            <Typography variant='h6' sx={landingPageStyles.textBody}>
                                Collection Visiblity
                            </Typography>
                            <Typography variant='body1' sx={landingPageStyles.textBody}>
                                Currently there are 4 possible visiblity settings. Public, public view only, private, and private view only.
                                Each collection will have an access list that will determine which users can see the collection while it is private.
                                Users who are not logged in will only be able to see public and public vo collections. The owner of the collection
                                will have exclusive access to editing the visiblity and access list of the collection.
                            </Typography>
                            <Typography variant='body1' sx={landingPageStyles.textBody}>
                                Public: Can be viewed and edited by anyone. <br />
                                Public VO: Can be viewed by anyone. Editing access only premitted to the owner. <br />
                                Private: Can be viewed and edited by anyone on the access list. <br />
                                Private VO: Can be viewed by anyone on the access list. Editing access only premitted to the owner. <br />
                            </Typography>
                        </Box>
                        <Box sx={{
                            ...landingPageStyles.detailsBoxItems,
                            flex: 1
                        }}>
                            <CardMedia
                                component="img"
                                image={collectionsImage}
                                alt="Collections Image"
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box >
    );
};

export default LandingPage;
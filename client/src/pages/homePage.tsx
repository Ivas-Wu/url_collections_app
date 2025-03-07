import React from 'react';
import { Box, Container, Typography, Paper, Tab, Tabs } from '@mui/material';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import CreateCollection from '../components/collectionCreate/createCollectionComponent';
import { PageConstants } from '../constant/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { pageStyles } from '../styles/pageStyles';

interface TabConfig {
  label: string;
  component: React.ReactNode;
  key: string;
}

const tabConfigs: TabConfig[] = [
  {
    label: "Shorten URL",
    component: <UrlShortenerForm parentComponent={PageConstants.HOME} />,
    key: "shorten"
  },
  {
    label: "Create Collection",
    component: <CreateCollection />,
    key: "collection"
  },
  // {
  //   label: "Bulk Shorten",
  //   component: <Typography>Bulk URL shortening coming soon...</Typography>,
  //   key: "bulk"
  // }
];

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Box sx={pageStyles.root}>
      <Container maxWidth="lg" sx={pageStyles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={0} sx={pageStyles.workspaceCard}>
            {/* <Typography variant="h5" sx={styles.title}>
              URL Workspace
            </Typography> */}

            <Tabs 
              value={activeTab} 
              onChange={(_, newValue) => setActiveTab(newValue)}
              sx={pageStyles.tabs}
            >
              {tabConfigs.map((tab, index) => (
                <Tab key={tab.key} label={tab.label} />
              ))}
            </Tabs>

            <Box sx={{ ...pageStyles.contentArea, position: 'relative' }}>
              <AnimatePresence mode="sync">
                {tabConfigs.map((tab, index) => (
                  <motion.div
                    key={tab.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: activeTab === index ? 1 : 0,
                      x: activeTab === index ? 0 : 20,
                    }}
                    transition={{ 
                      duration: 0.2,
                      opacity: { duration: 0.15 }
                    }}
                    style={{ 
                      position: 'absolute', 
                      width: '100%', 
                      top: 0, 
                      left: 0,
                      pointerEvents: activeTab === index ? 'auto' : 'none'
                    }}
                  >
                    <Box sx={pageStyles.section}>
                      {tab.component}
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import missionData from './data/missionData.json';
import type { Mission } from './types/mission';
import ExplorerPage from './components/ExplorerPage';

function App() {
  const missions: Mission[] = missionData.missions as Mission[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          py: 4,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container>
          <Typography variant="h1" component="h1" sx={{ mb: 0.5 }}>
            Mission Control
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9375rem' }}>
            Space Missions Data Explorer
          </Typography>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1,
        }}
      >
        <ExplorerPage missions={missions} />
      </Box>
    </Box>
  );
}

export default App;

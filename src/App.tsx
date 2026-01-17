import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import missionData from './data/missionData.json';
import type { Mission } from './types/mission';

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
          py: 3,
        }}
      >
        <Container>
          <Typography variant="h1" component="h1">
            Mission Control
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Space Missions Data Explorer
          </Typography>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        <Container>
          <Typography variant="body1">
            Total missions: {missions.length}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;

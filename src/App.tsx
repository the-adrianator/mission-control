import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function App() {
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
          {/* Content will be added in subsequent stages */}
        </Container>
      </Box>
    </Box>
  );
}

export default App;

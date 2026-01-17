import React from 'react';
import { Box, Drawer, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FiltersPanelProps {
  variant: 'desktop' | 'mobile';
  open?: boolean;
  onClose?: () => void;
}

function FiltersPanel({ variant, open = true, onClose }: FiltersPanelProps) {
  const content = (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 3 }}>
        Filters
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Filter controls placeholder
      </Typography>
    </Box>
  );

  if (variant === 'mobile') {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 } },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onClose} aria-label="Close filters">
            <CloseIcon />
          </IconButton>
        </Box>
        {content}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 3,
      }}
    >
      {content}
    </Box>
  );
}

export default FiltersPanel;

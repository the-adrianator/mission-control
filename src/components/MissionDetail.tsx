import React, { useEffect, useRef } from 'react';
import {
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { Mission } from '../types/mission';
import { StatusChip } from '../utils/statusUtils';
import { formatCost, formatCrew } from '../utils/missionUtils';

interface MissionDetailProps {
  mission: Mission | null;
  open: boolean;
  onClose: () => void;
  variant: 'desktop' | 'mobile';
  missions: Mission[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  isFavourite: (missionId: string) => boolean;
  onToggleFavourite: (missionId: string) => void;
}

function MissionDetail({
  mission,
  open,
  onClose,
  variant,
  missions,
  currentIndex,
  onPrevious,
  onNext,
  isFavourite,
  onToggleFavourite,
}: MissionDetailProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && closeButtonRef.current) {
      // Small delay to ensure drawer/dialog is fully rendered
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [open]);

  if (!mission) {
    return null;
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < missions.length - 1;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const content = (
    <Box sx={{ p: 3, maxWidth: variant === 'desktop' ? 600 : '100%' }}>
      {/* Header with close button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, pr: 2 }}>
          <IconButton
            onClick={() => onToggleFavourite(mission.id)}
            aria-label={isFavourite(mission.id) ? 'Remove from favourites' : 'Add to favourites'}
            sx={{ color: isFavourite(mission.id) ? 'warning.main' : 'action.disabled' }}
          >
            {isFavourite(mission.id) ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
          <Typography variant="h2" component="h1">
            {mission.name}
          </Typography>
        </Box>
        <IconButton
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close mission details"
          sx={{ mt: -1, mr: -1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Key metadata */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Year:</strong> {mission.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Agency:</strong> {mission.agency}
        </Typography>
        <Box>
          <StatusChip status={mission.status} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          <strong>Type:</strong> {mission.missionType}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Description */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">{mission.description}</Typography>
      </Box>

      {/* Launch date */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Launch Date
        </Typography>
        <Typography variant="body1">{formatDate(mission.launchDate)}</Typography>
      </Box>

      {/* Crew */}
      {mission.crew.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Crew
          </Typography>
          <Typography variant="body1">{formatCrew(mission.crew)}</Typography>
        </Box>
      )}

      {/* Cost */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Cost
        </Typography>
        <Typography variant="body1">{formatCost(mission.cost)}</Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onPrevious}
          disabled={!hasPrevious}
          aria-label="Previous mission"
        >
          Previous
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
          {currentIndex + 1} of {missions.length}
        </Typography>
        <Button
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next mission"
        >
          Next
        </Button>
      </Box>
    </Box>
  );

  if (variant === 'mobile') {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
          },
        }}
      >
        {content}
      </Dialog>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { sm: 500, md: 600 },
        },
      }}
    >
      {content}
    </Drawer>
  );
}

export default MissionDetail;

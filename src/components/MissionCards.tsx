import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { Mission } from '../types/mission';
import { StatusChip } from '../utils/statusUtils';

interface MissionCardsProps {
  missions: Mission[];
  onMissionClick: (mission: Mission) => void;
  isFavourite: (missionId: string) => boolean;
  onToggleFavourite: (missionId: string) => void;
}

function MissionCards({ missions, onMissionClick, isFavourite, onToggleFavourite }: MissionCardsProps) {
  return (
    <Stack spacing={2}>
      {missions.map((mission) => (
        <Card
          key={mission.id}
          onClick={() => onMissionClick(mission)}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 4,
            },
            '&:active': {
              boxShadow: 2,
            },
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onMissionClick(mission);
            }
          }}
          aria-label={`View details for ${mission.name}`}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flex: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavourite(mission.id);
                  }}
                  aria-label={isFavourite(mission.id) ? 'Remove from favourites' : 'Add to favourites'}
                  sx={{
                    color: isFavourite(mission.id) ? 'warning.main' : 'action.disabled',
                    mt: -1,
                    ml: -1,
                  }}
                >
                  {isFavourite(mission.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <Typography variant="h3" component="h2">
                  {mission.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2, flexShrink: 0 }}>
                {mission.year}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Agency
                </Typography>
                <Typography variant="body2">{mission.agency}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <StatusChip status={mission.status} />
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body2">{mission.missionType}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default MissionCards;

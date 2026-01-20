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
  if (missions.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2}>
      {missions.map((mission) => (
        <Card
          key={mission.id}
          onClick={() => onMissionClick(mission)}
          sx={{
            cursor: 'pointer',
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-2px)',
            },
            '&:active': {
              boxShadow: 2,
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
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
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            {/* Header: Star, Name */}
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavourite(mission.id);
                  }}
                  aria-label={isFavourite(mission.id) ? 'Remove from favourites' : 'Add to favourites'}
                  sx={{
                    color: isFavourite(mission.id) ? 'warning.main' : 'action.disabled',
                    flexShrink: 0,
                    minWidth: 40,
                    minHeight: 40,
                    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      color: isFavourite(mission.id) ? 'warning.dark' : 'warning.light',
                    },
                  }}
                >
                  {isFavourite(mission.id) ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                </IconButton>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '1.125rem',
                  }}
                >
                  {mission.name}
                </Typography>
              </Box>
              {/* Year displayed below title with dash prefix for visual hierarchy */}
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  textAlign: 'right',
                }}
              >
                - {mission.year}
              </Typography>
            </Box>

            {/* Metadata: Agency, Status, Type */}
            <Stack spacing={2} divider={<Box sx={{ borderTop: 1, borderColor: 'divider', my: 0.5 }} />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 0.5 }}>
                    Agency
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {mission.agency}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 0.5 }}>
                    Type
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {mission.missionType}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 1 }}>
                  Status
                </Typography>
                <StatusChip status={mission.status} />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default MissionCards;

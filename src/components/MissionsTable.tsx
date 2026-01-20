import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { Mission } from '../types/mission';
import { StatusChip } from '../utils/statusUtils';

interface MissionsTableProps {
  missions: Mission[];
  onMissionClick: (mission: Mission) => void;
  isFavourite: (missionId: string) => boolean;
  onToggleFavourite: (missionId: string) => void;
}

function MissionsTable({ missions, onMissionClick, isFavourite, onToggleFavourite }: MissionsTableProps) {
  if (missions.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="missions table">
        <TableHead>
          <TableRow>
            <TableCell width={50} sx={{ py: 1.5 }}></TableCell>
            <TableCell sx={{ py: 1.5, fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>
              Mission Name
            </TableCell>
            <TableCell align="right" sx={{ py: 1.5, fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>
              Year
            </TableCell>
            <TableCell sx={{ py: 1.5, fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>Agency</TableCell>
            <TableCell sx={{ py: 1.5, fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>Status</TableCell>
            <TableCell sx={{ py: 1.5, fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((mission, index) => (
            <TableRow
              key={mission.id}
              onClick={() => onMissionClick(mission)}
              sx={{
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
                bgcolor: index % 2 === 0 ? 'background.paper' : 'rgba(0, 0, 0, 0.02)', // Zebra striping for scanability
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: -2,
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
              <TableCell
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavourite(mission.id);
                }}
              >
                <IconButton
                  size="medium"
                  aria-label={isFavourite(mission.id) ? 'Remove from favourites' : 'Add to favourites'}
                  sx={{
                    color: isFavourite(mission.id) ? 'warning.main' : 'action.disabled',
                    minWidth: 44,
                    minHeight: 44,
                    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      color: isFavourite(mission.id) ? 'warning.dark' : 'warning.light',
                    },
                  }}
                >
                  {isFavourite(mission.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row" sx={{ py: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {mission.name}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ py: 2 }}>{mission.year}</TableCell>
              <TableCell sx={{ py: 2 }}>{mission.agency}</TableCell>
              <TableCell sx={{ py: 2 }}>
                <StatusChip status={mission.status} />
              </TableCell>
              <TableCell sx={{ py: 2 }}>{mission.missionType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MissionsTable;

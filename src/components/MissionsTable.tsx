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
            <TableCell width={50}></TableCell>
            <TableCell>Mission Name</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell>Agency</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((mission) => (
            <TableRow
              key={mission.id}
              onClick={() => onMissionClick(mission)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
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
                  }}
                >
                  {isFavourite(mission.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {mission.name}
                </Typography>
              </TableCell>
              <TableCell align="right">{mission.year}</TableCell>
              <TableCell>{mission.agency}</TableCell>
              <TableCell>
                <StatusChip status={mission.status} />
              </TableCell>
              <TableCell>{mission.missionType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MissionsTable;

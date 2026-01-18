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
} from '@mui/material';
import type { Mission } from '../types/mission';
import { StatusChip } from '../utils/statusUtils';

interface MissionsTableProps {
  missions: Mission[];
  onMissionClick: (mission: Mission) => void;
}

function MissionsTable({ missions, onMissionClick }: MissionsTableProps) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="missions table">
        <TableHead>
          <TableRow>
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

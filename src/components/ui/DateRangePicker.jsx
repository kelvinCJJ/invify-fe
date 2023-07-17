import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import DateRangeIcon from '@mui/icons-material/DateRange';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers';


const DateRangePicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-range-picker' : undefined;

  return (
    <Box className="flex items-center">
      <IconButton onClick={handleClick}>
        <DateRangeIcon />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box className="bg-darkaccent-800 p-4 rounded-lg shadow-lg">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Popper>
    </Box>
  );
};

export default DateRangePicker;

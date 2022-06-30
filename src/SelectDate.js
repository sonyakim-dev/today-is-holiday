import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small">Date</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={date}
        label="Date"
        onChange={handleChange}
      >
        <MenuItem value={10}>Today</MenuItem>
        <MenuItem value={20}>Tomorrow</MenuItem>
        <MenuItem value={30}>The day after tomorrow</MenuItem>
      </Select>
    </FormControl>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react'
import Calendar from './Calendar';
import Country from './Country';
import Holiday from './Holiday'
import meme from './kim-kardashian-work.gif'

const App = () => {
  function getToday() {
    return String(new Date()).split(' ', 4); // return [dow, month, dom, year]
  }
  function getDate(dayFromToday) { // return YYYY-MM-DD
    let date = new Date();
    date.setDate(date.getDate() + dayFromToday);
    if (date.getMonth()+1 < 10) {
      if (date.getDate() < 10) {
        return `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}` }
      else return `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
    }
    else {
      if (date.getDate() < 10) {
        return `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}` }
      else return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
  }
  
  const [date, setDate] = useState('');
  const handleChange = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
    fetchHoliday(event.target.value);
  };
  
  // holiday API
  const [holidayData, setHolidayData] = useState([])
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const fetchHoliday = (dayFromToday = 0) => {
    fetch("https://date.nager.at/api/v3/NextPublicHolidaysWorldwide", requestOptions)
    .then(response => response.text())
    .then(result => {
      setHolidayData(JSON.parse(result).filter((holiday) => holiday.date === getDate(dayFromToday)))
    })
    .catch(error => console.log('error', error))
  };
  useEffect(() => fetchHoliday(), []);

  return (
    <Container maxWidth="sx">
      <Typography variant="h3" align="center" style={{margin: "30px 0 0 0"}}>TODAY IS A HOLIDAY!</Typography>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small">Date</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={date}
        label="Date"
        onChange={handleChange}
      >
        <MenuItem value={0}>Today</MenuItem>
        <MenuItem value={1}>Tomorrow</MenuItem>
        <MenuItem value={2}>The day after tomorrow</MenuItem>
      </Select>
    </FormControl>
      <Calendar date={getToday()}/>
      {
        (holidayData.length) ?
        <Container maxWidth="lg">
          <Grid container 
            spacing={5} 
            justifyContent="center"
            alignItems="flex-start"
          >
            {
              holidayData.map((holiday, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    key={index}
                    style={{ margin: "30px"}}
                  >
                    <Country
                      countryCode={holiday.countryCode}
                      holidayName={holiday.name}
                    />
                  </Grid>
                )
              })
            }
          </Grid>
        </Container>
        : <Container maxWidth="xs">
            <p style={{fontSize: "20px"}}>SORRY, THERE'S NO HOLIDAY..</p>
            <img src={meme} style={{width: 450}}></img>
          </Container>
      }
    </Container>
  );
};

export default App;
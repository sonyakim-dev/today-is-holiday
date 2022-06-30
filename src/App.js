import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react'
import Calendar from './Calendar';
import Country from './Country';
import meme from './kim-kardashian-work.gif'

const App = () => {
  function getToday() {
    return String(new Date()).split(' ', 4); // return [dow, month, dom, year]
  }
  function getMonth() { // get month in numeric
    let month = String(new Date().getMonth() + 1);
    return (month.length === 1) ? 0 + month : month;
  }

  // holiday API
  const [holidayData, setHolidayData] = useState([])
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const fetchHoliday = () => {
    fetch("https://date.nager.at/api/v3/NextPublicHolidaysWorldwide", requestOptions)
    .then(response => response.text())
    .then(result => {
      setHolidayData(JSON.parse(result).filter((holiday) => holiday.date === `${getToday()[3]}-${getMonth()}-${getToday()[2]}`))
    })
    .catch(error => console.log('error', error))
  };
  useEffect(() => fetchHoliday(), []);

  return (
    <Container maxWidth="sx">
      <Typography variant="h3">TODAY IS HOLIDAY!</Typography>
      <Calendar date={getToday()}/>
      { holidayData.length ?
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
            <p>SORRY, THERE'S NO HOLIDAY..</p>
            <img src={meme} style={{width: 450}}></img>
          </Container>
      }
    </Container>
  );
};

export default App;
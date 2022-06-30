import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react'
import Country from './Country';
import meme from './kim-kardashian-work.gif'

export default function Holiday({date}) {
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

  const [holidayData, setHolidayData] = useState([]);

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

  useEffect(() => fetchHoliday(date), []);

  return (
    <>
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
    </>
  )
}
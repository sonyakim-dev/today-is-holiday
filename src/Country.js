import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react'
// import Country from './Country';

export default function Country(props) {
  const [countryData, setCountryData] = useState([]);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const fetchCountry = (countryCode) => {
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, requestOptions)
    .then(response => response.text())
    .then(result => setCountryData(JSON.parse(result)))
    .catch(error => console.log('error', error))
  };

  useEffect(() => fetchCountry(props.countryCode), []);
  
  return countryData.length? (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="230"
            image={countryData[0].flags.png}
            alt="country flag"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {countryData[0].name.common}
            </Typography>
            <Typography variant="h6" color="text.first">
              {props.holidayName}
            </Typography>
            <br></br>
            <Typography variant="body1" component="li" color="text.secondary">
              Region: {countryData[0].subregion}
            </Typography>
            <Typography variant="body1" component="li" color="text.secondary">
              Capital: {countryData[0].capital}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  ) : ""
}
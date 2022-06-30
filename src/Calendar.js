import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Calendar({date}) {
  const [dow, month, dom, year] = date;
  return (
    <>
      <div style={{
        // backgroundColor : "white",
        width: 1000,
        maxWidth : "90%",
        margin: "20px auto",
        right: 0,
        left: 0,
        border: "10px solid black",
      }}>
        <Typography align="center"
        style={{fontFamily: 'Manrope', fontSize: 150, fontWeight: 600, margin: "20px 50px"}}>
          {month} {dom} {year}
        </Typography>
      </div>
    </>
  )
}
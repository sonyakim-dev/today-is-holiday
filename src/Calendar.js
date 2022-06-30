import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Calendar({date}) {
  const [dow, month, dom, year] = date;
  return (
    <>
      <div style={{
        backgroundColor : "grey",
        // width: 1000,
        // height: 180,
        // margin: "auto",
        // right: 0,
        // left: 0,
        // position: "relative",
        // border : "10px solid black",

      }}>
        <p align="center" style={{fontSize : 150,fontWeight : 600}}>
          {month} {dom} {year}
        </p>
      </div>
    </>
  )
}
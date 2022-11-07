import React from 'react';
import Typography from '@mui/material/Typography';

function Calendar({date}) {
  const [year, month, dom] = date.split('-');
  const monthName = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}

  return (
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
        {monthName[month]} {dom} {year}
      </Typography>
    </div>
  )
}

export default Calendar;
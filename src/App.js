import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Holiday from "./Holiday";

function App() {
  // function getToday() {
  //   return String(new Date()).split(' ', 4); // return [dow, month, dom, year]
  // }
  function getDate(dayFromToday = 0) {
    // add day from today and return "YYYY-MM-DD"
    let date = new Date();
    date.setDate(date.getDate() + dayFromToday);
    let month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    let day = (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  const [date, setDate] = useState(0); // 0: today, 1: tomorrow, 2: the day after tomorrow
  const handleChange = (event) => {
    // console.log(date);
    setDate(event.target.value);
    fetchHoliday(event.target.value);
  };

  // holiday API
  const [holidayData, setHolidayData] = useState([]);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const fetchHoliday = (dayFromToday = 0) => {
    fetch("https://date.nager.at/api/v3/NextPublicHolidaysWorldwide", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setHolidayData(
          JSON.parse(result).filter((holiday) => holiday.date === getDate(dayFromToday))
        );
        // console.log(holidayData)
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => fetchHoliday(), []);

  return (
    <Container maxWidth="sx" align="center">
      <Typography variant="h3" align="center" style={{ margin: "40px 0" }}>
        TODAY IS A HOLIDAY!
      </Typography>

      <Container align="center">
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small" align="center">
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
      </Container>

      <Typography variant="p" align="center" style={{ fontSize: 12 }}>
        {Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ")}
      </Typography>

      <Calendar date={getDate(date)} />
      
      <Holiday holidayData={holidayData} />
    </Container>
  );
}

export default App;

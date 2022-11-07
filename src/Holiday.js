import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Country from "./Country";
import meme from "./kim-kardashian-work.gif";

function Holiday({ holidayData }) {
  return (
    <>
      {holidayData.length ? (
        <Container maxWidth="lg">
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="flex-start"
          >
            {holidayData.map((holiday, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={index}
                  style={{ margin: "30px" }}
                >
                  <Country
                    countryCode={holiday.countryCode}
                    holidayName={holiday.name}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="xs" style={{ margin: "30px 0" }}>
          <p style={{ fontSize: "20px" }}>SORRY, THERE'S NO HOLIDAY..</p>
          <img src={meme} style={{ maxWidth: 450 }}></img>
        </Container>
      )}
    </>
  );
}

export default Holiday;

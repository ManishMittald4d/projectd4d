import {
  Box,
  ButtonGroup,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const BookInfo = (props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [age, setAge] = React.useState("");

  console.log("coverImages", props.coverImages);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          border: "1px solid #333",
          width: "80%",
          marginInline: "auto",
          height: "auto",
          marginTop: "3%",
          paddingTop: "8px",
        }}
      >
        <Box marginLeft={2} marginRight={2}>
          <Typography>
            <b>Generated Content </b>
          </Typography>

          <Typography variant="h6">Book Info</Typography>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography> OpenAI id#</Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",
                      border: "1px solid black",
                    },
                  }}
                />
                <Typography style={{ fontWeight: "bold", color: "lightGrey" }}>
                  For Future reference call
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Book Title:</Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",
                      border: "1px solid black",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography>Body</Typography>
            <textarea
              style={{ width: "65%", border: "1px solid #333", height: "50vh" }}
            ></textarea>
          </Box>
          <Box>
            <Typography>AR Score:</Typography>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              inputProps={{
                style: {
                  height: "3px",

                  border: "1px solid black",
                },
              }}
            />
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography> Lexile Start:</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",

                      border: "1px solid black",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Lexile End:</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",

                      border: "1px solid black",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography> Genres:</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",

                      border: "1px solid black",
                    },
                  }}
                />
                <Typography> Sight words:</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",

                      border: "1px solid black",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Vocab words:</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",

                      border: "1px solid black",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography>Cover Image</Typography>
                <Box sx={{ width: "30%" }}>
                  {<h1>Manish Mittal</h1>}
                  <img
                    width={240}
                    src=" https://readabilitytutor.cleprtech.com/html-recorder/images/u48.jpg"
                  ></img>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography>Covr Image:</Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      height: "3px",
                      border: "1px solid black",
                    },
                  }}
                />
                <Typography>Art Theme:</Typography>
                <FormControl sx={{ m: 1 }}>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    style={{ height: "30px", width: "368px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                </FormControl>

                <ButtonGroup sx={{ marginBottom: "7%" }}>
                  <button
                    style={{
                      backgroundColor: "#40E0D0",
                      marginRight: "4%",
                      color: "white",
                      font: "16px",
                    }}
                  >
                    Regenerate
                  </button>
                  <button
                    style={{
                      backgroundColor: "#40E0D0",
                      color: "white",
                      font: "16px",
                    }}
                  >
                    Upload
                  </button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BookInfo;

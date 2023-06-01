import {
  Box,
  ButtonGroup,
  FormControl,
  Grid,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Imagebox from "./imagebox";
import styles from "./kycForm.module.css";

const BookInfo = (props) => {
  const { coverImages, aiFormData, getNewPreview } = props;
  const [coverImage, setCoverImage] = useState(coverImages[0] || "");
  const [imageRow, setImageRow] = useState({ start: 0, end: 4 });
  const [formData, setFormData] = useState(aiFormData || {});
  let coverImagesRow = coverImages.slice(imageRow.start, imageRow.end);

  useEffect(() => {
    let body = "";
    aiFormData?.Story &&
      aiFormData.Story.map((item) => {
        body += item.PageText;
      });

    setFormData({
      ...aiFormData,
      body: body,
    });
  }, [aiFormData]);

  useEffect(() => {
    setCoverImage(coverImages[0]);
  }, [coverImages]);

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
                  value={formData.Title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      Title: e.target.value,
                    });
                  }}
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
              value={formData.body}
              onChange={(e) => {
                getNewPreview(e.target.value);
                setFormData({
                  ...formData,
                  body: e.target.value,
                });
              }}
              style={{
                width: "65%",
                border: "1px solid #333",
                height: "50vh",
                padding: "6px",
              }}
            ></textarea>
          </Box>
          <Box>
            <Typography>AR Score:</Typography>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={formData.ARScore}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  ARScore: e.target.value,
                });
              }}
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
                  variant="outlined"
                  fullWidth
                  value={formData.LexileLevelMin}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      LexileLevelMin: e.target.value,
                    });
                  }}
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
                  variant="outlined"
                  fullWidth
                  value={formData.LexileLevelMax}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      LexileLevelMax: e.target.value,
                    });
                  }}
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
                  variant="outlined"
                  fullWidth
                  value={formData.Genre}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      Genre: e.target.value,
                    });
                  }}
                  inputProps={{
                    style: {
                      height: "3px",

                      border: "1px solid black",
                    },
                  }}
                />
                <Typography> Sight words:</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={formData.SightWords}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      SightWords: e.target.value,
                    });
                  }}
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
                  variant="outlined"
                  fullWidth
                  value={formData.Vocabulary}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      Vocabulary: e.target.value,
                    });
                  }}
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
                <Box>
                  <img width={"130px"} src={coverImage || coverImages[0]}></img>
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
                {/* <FormControl sx={{ m: 1 }}>
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
                </FormControl> */}
                <Box>
                  <select
                    className={styles.dropdown}
                    style={{ width: "100%", marginTop: "8px" }}
                  >
                    <option></option>
                    <option>Digital Art</option>
                    <option>3D Render</option>
                    <option>Water Color</option>
                    <option>Oil Painting</option>
                  </select>
                </Box>
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
            <Grid container xs={7} style={{ marginBottom: "16px" }}>
              <FormControl FormControl>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  name="radio-buttons-group"
                  style={{ display: "flex", flexDirection: "row" }}
                  value={coverImage}
                  onChange={(e) => {
                    setCoverImage(e.target.value);
                  }}
                >
                  {coverImagesRow.length > 0 &&
                    coverImagesRow.map((item) => (
                      <Imagebox key={item} url={item} value={item} />
                    ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            {coverImagesRow.length > 0 && (
              <div
                className="myRow"
                style={{
                  width: "40px",
                  justifyContent: "space-between",
                  marginLeft: "8px",
                }}
              >
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (imageRow.start > 0) {
                      setImageRow((prev) => ({
                        start: prev.start - 1,
                        end: prev.end - 1,
                      }));
                      coverImagesRow = coverImages.slice(
                        imageRow.start,
                        imageRow.end
                      );
                    }
                  }}
                >
                  {"<"}
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (imageRow.end < coverImages.length) {
                      setImageRow((prev) => ({
                        start: prev.start + 1,
                        end: prev.end + 1,
                      }));
                      coverImagesRow = coverImages.slice(
                        imageRow.start,
                        imageRow.end
                      );
                    }
                  }}
                >
                  {">"}
                </p>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BookInfo;

import {
  Box,
  Button,
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
import LoadingOverlay from "react-loading-overlay";

const BookInfo = (props) => {
  const {
    coverImages,
    aiFormData,
    getNewPreview,
    generateImage,
    loading,
    setAiFormData,
  } = props;
  const [coverImage, setCoverImage] = useState(
    coverImages[0] ||
      "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg"
  );
  const [imageRow, setImageRow] = useState({ start: 0, end: 4 });
  const [formData, setFormData] = useState(aiFormData || {});
  const [coverImagesRow, setCoverImagesRow] = useState([]);
  const [newImageTitle, setNewImageTitle] = useState("");

  useEffect(() => {
    let body = "";
    aiFormData.Story &&
      aiFormData.Story.length > 0 &&
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
    let coverImageRow = coverImages.slice(imageRow.start, imageRow.end);
    setCoverImagesRow(coverImageRow);
  }, [coverImages]);

  return (
    <>
      <LoadingOverlay
        active={loading}
        spinner
        className={loading ? styles.loader : ""}
      >
        <Box
          sx={{
            border: "1px solid #333",
            marginLeft: "2%",
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
                  <Typography className={styles.inputLabel}>
                    {" "}
                    OpenAI id#
                  </Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    className={styles.boxInput}
                  />
                  <Typography
                    style={{ fontWeight: "bold", color: "lightGrey" }}
                  >
                    For Future reference call
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={styles.inputLabel}>
                    Book Title:
                  </Typography>
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
                    className={styles.boxInput}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={3}>
              <Typography className={styles.inputLabel}>Body</Typography>
              <textarea
                value={formData.body}
                onChange={(e) => {
                  getNewPreview(e.target.value);
                  setFormData({
                    ...formData,
                    body: e.target.value,
                  });
                }}
                className={styles.Boxborder}
                style={{
                  // borderColor:"  1px solid rgb(209 213 219 / var(--tw-border-opacity))",

                  width: "90%",
                  // border: "1px solid #333",
                  height: "20vh",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              ></textarea>
            </Box>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box mb={2}>
                    <Typography className={styles.inputLabel}>
                      AR Score:
                    </Typography>
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
                      className={styles.boxInput}
                    />
                  </Box>
                  <Box mb={2}>
                    <Typography className={styles.inputLabel}>
                      {" "}
                      Genres:
                    </Typography>
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
                      className={styles.boxInput}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box mb={2}>
                    <Typography className={styles.inputLabel}>
                      {" "}
                      Lexile Start:
                    </Typography>
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
                      className={styles.boxInput}
                    />
                  </Box>
                  <Box mb={2}>
                    <Typography className={styles.inputLabel}>
                      Vocab words:
                    </Typography>
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
                      className={styles.boxInput}
                    />
                  </Box>
                </Grid>
                <Grid item sx={4}>
                  <Box mb={2}>
                    <Typography className={styles.inputLabel}>
                      Lexile End:
                    </Typography>
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
                      className={styles.boxInput}
                    />
                  </Box>
                  <Box>
                    <Typography className={styles.inputLabel}>
                      {" "}
                      Sight words:
                    </Typography>
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
                      className={styles.boxInput}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography>Cover Image</Typography>
                  <Box>
                    <img
                      width={"130px"}
                      src={
                        coverImage ||
                        "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg"
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={styles.inputLabel}>
                    Cover Image:
                  </Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={newImageTitle}
                    onChange={(e) => {
                      setNewImageTitle(e.target.value);
                    }}
                    className={styles.boxInput}
                  />
                  <Typography className={styles.inputLabel}>
                    Art Theme:
                  </Typography>
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
                  <Box sx={{ marginBlock: "24px" }}>
                    <Button
                      style={{
                        marginRight: "4%",
                        backgroundColor: "#40e0d0",
                        color: "#fff",
                      }}
                      onClick={() => {
                        if (!newImageTitle) {
                          return alert("image title is required");
                        }
                        generateImage(
                          {
                            imageCount: "1",
                            imageFormat: "url",
                            imageSize: "512x512",
                            text: newImageTitle,
                          },
                          2
                        );
                      }}
                    >
                      Regenerate
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#40E0D0",
                        color: "white",
                      }}
                      onClick={() => {
                        var input = document.createElement("input");
                        input.type = "file";
                        input.style.display = "none";
                        input.onchange = function (e) {
                          var file = e.target.files[0];
                          const selectedImage = URL.createObjectURL(file);

                          setCoverImagesRow([selectedImage]);
                          setCoverImage(selectedImage);
                        };
                        document.body.appendChild(input);
                        input.click();
                        document.body.removeChild(input);
                      }}
                    >
                      Upload
                    </Button>
                  </Box>
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
                        const newImagesRow = coverImages.slice(
                          imageRow.start,
                          imageRow.end
                        );
                        setCoverImagesRow(newImagesRow);
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
      </LoadingOverlay>
    </>
  );
};

export default BookInfo;

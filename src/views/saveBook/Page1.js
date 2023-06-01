import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./kycForm.module.css";

const Page1 = (props) => {
  const { getbookData, newPreview } = props;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [pageData, setPageData] = useState({
    topic: "Write a story on latest trending topic.",
    grade: "PreK",
    local: "USA/CANADA",
    lang: "English",
    max_words: 500,
    max_syllabus: 3,
    senetence_per_Page: 3,
    get_max_questions: true,
    max_questions: 3,
    get_vocab_words: true,
    vocab_words: 3,
    get_sight_words: true,
    sight_words: 3,
  });
  const [coverImageData, setCoverImageData] = useState({
    getCoverImage: false,
    imageCount: 1,
    text: "",
    illustration: true,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setPreview(
      `${pageData.topic} Maximum syllables in the words shall be ${
        pageData.max_syllabus
      }. Story shall be good for child in grade ${
        pageData.grade
      }. Maximum words in the story shall be ${
        pageData.max_words
      }. Story shall be broken into pages and each page shall have maximum ${
        pageData.senetence_per_Page
      } sentences. There shall be at least 5 pages. Locale of the story shall be ${
        pageData.lang
      } ${pageData.local}. ${
        pageData.get_max_questions
          ? `Create minimum 1 question per page. Do not create more than ${pageData.max_questions} questions in total on all pages.`
          : ""
      }${
        pageData.get_sight_words
          ? ` Create ${pageData.sight_words} sight words maximum.`
          : ""
      }${
        pageData.get_vocab_words
          ? ` Create ${pageData.vocab_words} vocab words maximum.`
          : ""
      }`
    );
  }, [pageData]);

  return (
    <>
      <Box
        sx={{
          marginTop: "3px",
          width: "80%",
          marginInline: "auto",
          height: "auto",
          color: "#333",
        }}
      >
        <Box>
          <Typography style={{ marginBlock: "20px 10px" }}>
            Enter the brief topic for your book or content.
          </Typography>
          <Box>
            <textarea
              style={{
                width: "778px",
                border: "1px solid #333",
                minHeight: "70px",
              }}
              value={pageData.topic}
              onChange={(e) => {
                setPageData({
                  ...pageData,
                  topic: e.target.value,
                });
              }}
            ></textarea>
          </Box>
          <Box
            sx={{
              border: "1.5px solid #333",
              padding: "16px",
            }}
          >
            <Grid container>
              <Grid
                container
                xs={5}
                style={{ paddingRight: "16px", height: "fit-content" }}
              >
                <Typography style={{ fontWeight: "bold", marginBottom: "8px" }}>
                  Scope form OpenAI
                </Typography>
                <Typography style={{ marginBottom: "12px" }}>
                  All will generate content based on the following setting.
                </Typography>
                <Grid container xs={6}>
                  <Grid container xs={12} my={1}>
                    <Grid item xs={5}>
                      <Typography>Grade</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <select
                        className={styles.dropdown}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            grade: e.target.value,
                          });
                        }}
                      >
                        <option>PreK</option>
                        <option>KG</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                      </select>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} my={1}>
                    <Grid item xs={5}>
                      <Typography>Local</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <select
                        className={styles.dropdown}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            local: e.target.value,
                          });
                        }}
                      >
                        <option>USA/CANADA</option>
                        <option>EU</option>
                      </select>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} my={1}>
                    <Grid item xs={5}>
                      <Typography>Lang</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <select
                        className={styles.dropdown}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            lang: e.target.value,
                          });
                        }}
                      >
                        <option>English</option>
                      </select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={6}>
                  <Grid container xs={12} my={1}>
                    <Grid item xs={5}>
                      <Typography>Max Words:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        type="text"
                        variant="outlined"
                        value={pageData.max_words}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            max_words: e.target.value,
                          });
                        }}
                        inputProps={{
                          style: {
                            height: "28px",
                            padding: 0,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12} my={1}>
                    <Grid item xs={5}>
                      <Typography>Max syllables:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        type="text"
                        variant="outlined"
                        value={pageData.max_syllabus}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            max_syllabus: e.target.value,
                          });
                        }}
                        inputProps={{
                          style: {
                            padding: 0,
                            height: "28px",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container xs={12}>
                  <Grid item xs={2}>
                    Preview:
                  </Grid>
                  <Grid item xs={9}>
                    <textarea
                      id="instruction"
                      className={styles.previewData}
                      name="previewData"
                      value={preview}
                      onChange={(e) => {
                        setPreview(e.target.value);
                      }}
                    ></textarea>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container xs={7} style={{ height: "fit-content" }}>
                <Grid xs={5}>
                  <Typography
                    style={{ fontWeight: "bold", marginBottom: "8px" }}
                  >
                    Select items to created by OpenAI
                  </Typography>
                  <Typography my={2}>
                    <Checkbox
                      {...label}
                      disabled
                      checked
                      style={{ padding: 0 }}
                    />
                    Title:
                  </Typography>
                  <Typography my={2}>
                    <Checkbox
                      {...label}
                      disabled
                      checked
                      style={{ padding: 0 }}
                    />
                    Genres:
                  </Typography>
                  <Box
                    sx={{ border: "1px solid black", width: "auto" }}
                    p={0.5}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Senetence/Page</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="number"
                          variant="outlined"
                          value={pageData.senetence_per_Page}
                          onChange={(e) => {
                            setPageData({
                              ...pageData,
                              senetence_per_Page: e.target.value,
                            });
                          }}
                          inputProps={{
                            style: {
                              height: "3px",
                              width: "95px",
                              border: "1px solid black",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid container xs={7}>
                  <Grid container xs={12}>
                    <Grid item xs={5}>
                      <Typography>
                        <Checkbox
                          {...label}
                          style={{ padding: 0 }}
                          checked={pageData.get_max_questions}
                          onChange={(e) => {
                            setPageData({
                              ...pageData,
                              get_max_questions: e.target.checked,
                            });
                          }}
                        />
                        Comprehension
                        <br />
                        Max Questions:
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{ display: "flex", alignItems: "end" }}
                    >
                      <TextField
                        type="number"
                        variant="outlined"
                        value={pageData.max_questions}
                        onChange={(e) =>
                          setPageData({
                            ...pageData,
                            max_questions: e.target.value,
                          })
                        }
                        inputProps={{
                          style: {
                            height: "28px",
                            padding: 0,
                            border: "1px solid black",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container={12}>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={7}>
                      <Typography>
                        <Checkbox
                          {...label}
                          defaultChecked
                          style={{ padding: 0 }}
                        />
                        Correct answer
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid item xs={5} style={{ alignSelf: "center" }}>
                      <Typography>
                        <Checkbox
                          {...label}
                          checked={pageData.get_vocab_words}
                          onChange={(e) => {
                            setPageData({
                              ...pageData,
                              get_vocab_words: e.target.checked,
                            });
                          }}
                        />
                        Vocab words
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography style={{ paddingRight: "6px" }}>
                        Max
                      </Typography>
                      <TextField
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={pageData.vocab_words}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            vocab_words: e.target.value,
                          });
                        }}
                        inputProps={{
                          style: {
                            height: "28px",
                            padding: 0,
                            border: "1px solid black",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid item xs={5} style={{ alignSelf: "center" }}>
                      <Typography>
                        <Checkbox
                          {...label}
                          checked={pageData.get_sight_words}
                          onChange={(e) => {
                            setPageData({
                              ...pageData,
                              get_sight_words: e.target.checked,
                            });
                          }}
                        />
                        Sight words
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography style={{ paddingRight: "6px" }}>
                        Max{" "}
                      </Typography>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={pageData.sight_words}
                        onChange={(e) => {
                          setPageData({
                            ...pageData,
                            sight_words: e.target.value,
                          });
                        }}
                        inputProps={{
                          style: {
                            height: "28px",
                            padding: 0,
                            border: "1px solid black",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    mt={7}
                    width={"100%"}
                    height={"auto"}
                    sx={{ border: "1px solid black" }}
                  >
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography>
                          <Checkbox
                            checked={coverImageData.getCoverImage}
                            onChange={(e) => {
                              setCoverImageData({
                                ...coverImageData,
                                getCoverImage: e.target.checked,
                              });
                            }}
                          />
                          Cover Image
                        </Typography>
                        <Typography
                          style={{ marginLeft: "9px", paddingBlock: "9px" }}
                        >
                          Art Theme:
                        </Typography>
                        <Typography
                          style={{ marginLeft: "9px", paddingBlock: "9px" }}
                        >
                          Images Count:
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          style={{ marginTop: "8px" }}
                          disabled={!coverImageData.getCoverImage}
                          value={coverImageData.text}
                          onChange={(e) => {
                            setCoverImageData({
                              ...coverImageData,
                              text: e.target.value,
                            });
                          }}
                          variant="outlined"
                          inputProps={{
                            style: {
                              height: "28px",
                              padding: 0,
                              border: "1px solid black",
                            },
                          }}
                        />
                        <Box>
                          <select
                            disabled={!coverImageData.getCoverImage}
                            className={styles.dropdown}
                            style={{ width: "82%", marginTop: "8px" }}
                          >
                            <option></option>
                            <option>Digital Art</option>
                            <option>3D Render</option>
                            <option>Water Color</option>
                            <option>Oil Painting</option>
                          </select>
                        </Box>
                        <Box>
                          <select
                            className={styles.dropdown}
                            style={{ width: "82%", marginTop: "8px" }}
                            disabled={!coverImageData.getCoverImage}
                            onChange={(e) => {
                              setCoverImageData({
                                ...coverImageData,
                                imageCount: e.target.value,
                              });
                            }}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </Box>
                      </Grid>
                    </Grid>
                    <Typography>
                      <Checkbox
                        checked={coverImageData.illustration}
                        onChange={(e) => {
                          setCoverImageData({
                            ...coverImageData,
                            illustration: e.target.checked,
                          });
                        }}
                      />
                      Add Image Illustrations to All Pages
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              {newPreview && (
                <Button
                  style={{
                    marginTop: "5%",
                    marginBottom: "2%",
                    backgroundColor: "#40E0D0",
                    color: "white",
                    font: "16px",
                    marginRight: "24px",
                  }}
                  onClick={() => {
                    if (!coverImageData.text && coverImageData.getCoverImage) {
                      return alert("Please enter image title first");
                    }
                    getbookData(
                      coverImageData.getCoverImage,
                      {
                        imageCount: coverImageData.imageCount,
                        imageFormat: "url",
                        imageSize: "512x512",
                        text: coverImageData.text,
                      },
                      {
                        Text: `${newPreview} Render all output in JSON format as below {\"Title\":[\"string\",\"string\"],\"Tags\":[\"string\",\"string\"],\"Genre\":[\"string\",\"string\"],\"Grade\":int,\"Story\":{[{\"PageText\":\"string\",\"Questions\":[{\"Question\":\"string\",\"Answer\":\"string\"}],}]},\"Vocabulary\":[\"string\",\"string\"],\"SightWords:[\"string\",\"string\"],\"ARScore\":int,\"LexileLevelMin\":\"string\",\"LexileLevelMax\":\"string\"}`,
                      }
                    );
                  }}
                >
                  Regenerate All-Raw Type
                </Button>
              )}
              <Button
                style={{
                  marginTop: "5%",
                  marginBottom: "2%",
                  backgroundColor: "#40E0D0",
                  color: "white",
                  font: "16px",
                }}
                onClick={() => {
                  if (!coverImageData.text && coverImageData.getCoverImage) {
                    return alert("Please enter image title first");
                  }
                  getbookData(coverImageData, {
                    Text: `${preview} Render all output in JSON format as below {\"Title\":[\"string\",\"string\"],\"Tags\":[\"string\",\"string\"],\"Genre\":[\"string\",\"string\"],\"Grade\":int,\"Story\":{[{\"PageText\":\"string\",\"Questions\":[{\"Question\":\"string\",\"Answer\":\"string\"}],}]},\"Vocabulary\":[\"string\",\"string\"],\"SightWords:[\"string\",\"string\"],\"ARScore\":int,\"LexileLevelMin\":\"string\",\"LexileLevelMax\":\"string\"}`,
                  });
                }}
              >
                Create with OpenAI-Raw Type
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Page1;

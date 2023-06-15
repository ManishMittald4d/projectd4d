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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const Page1 = (props) => {
  const { getbookData, newPreview, NoApiJson } = props;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [pageData, setPageData] = useState({
    topic: "Write a story on latest trending topic.",
    grade: "1",
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
    illustration: false,
  });
  const [preview, setPreview] = useState("");
  const [open, setOpen] = React.useState(false);
  const [CopyJSon, setCopyJSon] = React.useState(
    JSON.stringify({
      Title: ["The Lost Ball", "1"],
      Tags: ["Ball", "Kids"],
      Genre: ["Fiction", "Short Story"],
      Grade: "1",
      Story: [
        {
          PageText:
            "One sunny day, Timmy was playing with his red ball. He was rolling it around on the grass, having lots of fun.",
          Questions: [
            {
              Question: "What was Timmy playing with?",
              Answer: "His red ball.",
            },
          ],
        },
        {
          PageText:
            "Suddenly, Timmy kicked the ball too hard. It went flying into the nearby bushes!",
          Questions: [
            {
              Question: "Where did the ball go?",
              Answer: "Into the bushes.",
            },
          ],
        },
        {
          PageText:
            "Timmy looked for his ball by himself, but he couldn't find it. He asked his friend, Jack, for help. Jack suggested they look in the tall grass.",
          Questions: [
            {
              Question: "Who did Timmy ask for help?",
              Answer: "His friend, Jack.",
            },
            {
              Question: "Where did Jack suggest they look?",
              Answer: "In the tall grass.",
            },
          ],
        },
        {
          PageText:
            "After a few minutes of searching, Jack found the ball hiding under a small bush. Timmy was very happy and grateful to his friend.",
          Questions: [
            {
              Question: "Who found the ball?",
              Answer: "Jack found the ball.",
            },
            {
              Question: "Where was the ball hiding?",
              Answer: "Under a small bush.",
            },
          ],
        },
        {
          PageText:
            "Timmy and Jack continued to play with the ball for the rest of the day. They made sure to be more careful this time!",
          Questions: [
            {
              Question: "What did Timmy and Jack do for the rest of the day?",
              Answer: "They played with the ball.",
            },
          ],
        },
      ],
      Vocabulary: ["Sunny", "Grass", "Bushes"],
      SightWords: ["Ball", "Red", "Small"],
      ARScore: 1.0,
      LexileLevelMin: "100",
      LexileLevelMax: "200",
    })
  );
  // const [CopyJSon, setCopyJSon] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
          height: "auto",
          marginLeft: "2%",
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
                width: "70%",
                minHeight: "70px",
                marginBottom: "16px",
              }}
              className={` ${styles.previewData}`}
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
            // className={styles.Boxborder}
            sx={{
              // border: "1px solid #333",
              padding: "16px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={7} style={{ paddingRight: "20px" }}>
                <Typography style={{ fontWeight: "bold", marginBottom: "8px" }}>
                  Scope form OpenAI
                </Typography>
                <Typography className={styles.textStyle}>
                  AI will generate content based on the following setting.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Grid container spacing={2} style={{ paddingLeft: "16px" }}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Box mb={4}>
                            <Typography className={styles.inputLabel}>
                              Grade
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={8}>
                          <Box mb={3}>
                            <select
                              className={styles.dropdown}
                              value={pageData.grade}
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
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={4}>
                          <Box mb={4}>
                            <Typography className={styles.inputLabel}>
                              Local
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={8}>
                          <Box mb={3}>
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
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={4}>
                          <Box mb={3}>
                            <Typography className={styles.inputLabel}>
                              Lang
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={8}>
                          <Box mb={3}>
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
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} style={{ paddingRight: "32px" }}>
                    <Grid container spacing={2}>
                      <Grid container>
                        <Grid item xs={4} md={6}>
                          <Box mb={4}>
                            <Typography
                              className={styles.inputLabel}
                              sx={{ whiteSpace: "break-spaces" }}
                            >
                              Max Words:
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={8} md={6}>
                          <Box mb={3}>
                            <TextField
                              type="text"
                              variant="outlined"
                              value={pageData.max_words}
                              className={`${styles.boxInput}`}
                              onChange={(e) => {
                                setPageData({
                                  ...pageData,
                                  max_words: e.target.value,
                                });
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={4} md={6}>
                          <Box mb={4}>
                            <Typography
                              className={styles.inputLabel}
                              sx={{ whiteSpace: "break-spaces" }}
                            >
                              Max syllables:
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={8} md={6}>
                          <Box mb={3}>
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
                              className={styles.boxInput}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={4} md={6}>
                          <Box mb={3}>
                            <Typography className={styles.inputLabel}>
                              Senetence/Page
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={8} md={6}>
                          <Box mb={3}>
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
                              className={styles.boxInput}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ paddingRight: "32px" }}>
                  <Grid item xs={2}>
                    <Typography className={styles.inputLabel}>
                      Preview:
                    </Typography>
                  </Grid>
                  <Grid item xs={10} style={{ paddingLeft: "8px" }}>
                    {" "}
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
              <Grid item xs={12} lg={5} mt={2}>
                <Grid container spacing={2} style={{ paddingLeft: "8px" }}>
                  <Grid container>
                    <Grid item xs={6} md={8} lg={6} xl={6}>
                      <Box mb={4}>
                        <Typography
                          style={{
                            fontWeight: "bold",
                            marginBottom: "8px",
                            whiteSpace: "break-spaces",
                          }}
                        >
                          Select items to created by OpenAI
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2} lg={3} xl={3}>
                      <Box>
                        <Typography className={styles.inputLabel}>
                          <Checkbox
                            {...label}
                            disabled
                            checked
                            style={{ padding: 0 }}
                          />
                          Title:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3} md={2} lg={3} xl={3}>
                      <Box>
                        <Typography className={styles.inputLabel}>
                          <Checkbox
                            {...label}
                            disabled
                            checked
                            style={{ padding: 0 }}
                          />
                          Genres:
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid container>
                    <Grid item xs={1} lg={1} md={1}>
                      <Box ml={1}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={3} lg={4} md={4}>
                      <Box>
                        <Typography
                          style={{ whiteSpace: "nowrap" }}
                          className={styles.inputLabel}
                        >
                          Comprehension
                          <br />
                          Max Questions:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} lg={7} md={7}>
                      <Box>
                        <TextField
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={pageData.max_questions}
                          onChange={(e) =>
                            setPageData({
                              ...pageData,
                              max_questions: e.target.value,
                            })
                          }
                          className={styles.boxInput}
                        />
                        <Typography className={styles.inputLabel}>
                          <Checkbox
                            {...label}
                            defaultChecked
                            style={{ padding: 0 }}
                          />
                          Correct answer
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1} md={1}>
                      <Box>
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
                      </Box>
                    </Grid>

                    <Grid item xs={3} md={4}>
                      <Box mt={1}>
                        <Typography className={styles.inputLabel}>
                          Vocab words
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={1} md={1}>
                      <Typography
                        className={styles.inputLabel}
                        style={{ paddingRight: "6px" }}
                      >
                        Max
                      </Typography>
                    </Grid>
                    <Grid item xs={5} md={6}>
                      <Box>
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
                          className={styles.boxInput}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1} md={1}>
                      <Box>
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
                      </Box>
                    </Grid>
                    <Grid item xs={3} md={4}>
                      <Box mt={1}>
                        <Typography className={styles.inputLabel}>
                          Sight words
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={1} md={1}>
                      <Typography
                        className={styles.inputLabel}
                        style={{ paddingRight: "6px" }}
                      >
                        Max
                      </Typography>
                    </Grid>
                    <Grid item xs={5} md={6}>
                      <Box>
                        <TextField
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={pageData.sight_words}
                          onChange={(e) => {
                            setPageData({
                              ...pageData,
                              sight_words: e.target.value,
                            });
                          }}
                          className={styles.boxInput}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Box
                  mt={5}
                  pt={3}
                  width={"100%"}
                  height={"auto"}
                  className={styles.boxBorder}
                >
                  <Grid container>
                    <Grid container spacing={2}>
                      <Grid item xs={1} md={1}>
                        <Box>
                          <Checkbox
                            checked={coverImageData.getCoverImage}
                            onChange={(e) => {
                              setCoverImageData({
                                ...coverImageData,
                                getCoverImage: e.target.checked,
                              });
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={3} md={3}>
                        <Box mt={1}>
                          <Typography className={styles.inputLabel}>
                            Cover Image
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <Box mt={1}>
                          <TextField
                            disabled={!coverImageData.getCoverImage}
                            value={coverImageData.text}
                            fullWidth
                            onChange={(e) => {
                              setCoverImageData({
                                ...coverImageData,
                                text: e.target.value,
                              });
                            }}
                            variant="outlined"
                            className={styles.boxInput}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid>
                    {/* <Grid container spacing={2}>
                      <Grid item xs={4} md={4}>
                        <Box mt={1}>
                          <Typography
                            className={styles.inputLabel}
                            style={{ marginLeft: "9px", paddingBlock: "4px" }}
                          >
                            Art Theme:
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <Box>
                          <select
                            disabled={!coverImageData.getCoverImage}
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
                      </Grid>
                    </Grid> */}
                  </Grid>
                  <Grid container>
                    <Grid container spacing={2}>
                      <Grid item xs={4} md={4}>
                        <Box mt={1} mb={2}>
                          <Typography
                            className={styles.inputLabel}
                            style={{ marginLeft: "9px" }}
                          >
                            Images Count:
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <Box>
                          <select
                            className={styles.dropdown}
                            style={{ width: "100%", marginTop: "8px" }}
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
                      {/* <Box>
                        <Typography className={styles.inputLabel}>
                          <Checkbox
                            style={{ marginLeft: "18px" }}
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
                      </Box> */}
                    </Grid>
                  </Grid>
                </Box>
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
                      {
                        getCoverImage: coverImageData.getCoverImage,
                        imageCount: coverImageData.imageCount,
                        imageFormat: "url",
                        imageSize: "512x512",
                        text: coverImageData.text,
                        illustration: coverImageData.illustration,
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
                  marginTop: "40px",
                  backgroundColor: "#40e0d0",
                  color: "#fff",
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
              <Button
                style={{
                  marginTop: "40px",
                  marginLeft: "10px",
                  backgroundColor: "#40e0d0",
                  color: "#fff",
                }}
                onClick={() => {
                  handleClickOpen();
                }}
              >
                Import JSON
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Import JSON"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <textarea
              style={{
                width: "480px",
                height: "400px",
                minHeight: "70px",
                margin: "40px",
                border: "1px solid #ccc",
              }}
              // className={` ${styles.previewData}`}
              value={CopyJSon}
              onChange={(e) => {
                setCopyJSon(e.target.value);
              }}
            ></textarea>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              NoApiJson(CopyJSon);
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page1;

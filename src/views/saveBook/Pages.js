// import { Box, Typography } from "@mui/material";
import {
  Box,
  ButtonGroup,
  Grid,
  Modal,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./kycForm.module.css";
import { MdCancel } from "react-icons/md";

const Pages = ({
  pageData,
  illustration,
  showIllustration,
  generateImage,
  editingImage,
}) => {
  const [data, setData] = useState(pageData?.Story);
  const [editing, setEditing] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [imageTitle, setImageTitle] = useState("");

  useEffect(() => {
    let arr = [];
    pageData?.Story?.forEach((item) => {
      let value = {
        ...item,
        illustration: illustration,
      };
      arr.push(value);
    });
    setData(arr);
  }, [pageData]);

  return (
    <>
      <Box
        sx={{
          width: "80%",
          marginInline: "auto",
          height: "auto",
        }}
      >
        <Typography m={4} variant="h4">
          Pages
        </Typography>
        <Box>
          <table className={`table table-bordered border-dark ${styles.table}`}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Page Text</th>
                <th scope="col">Illustration</th>
                <th scope="col">OpenAI Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.PageText}</td>
                    <td>
                      {showIllustration ? (
                        <img
                          style={{ width: "100px" }}
                          src={item.illustration}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>@{item.name}</td>
                    <td>
                      <button
                        onClick={() => {
                          setEditing(true);
                          setEditIndex(index);
                        }}
                      >
                        Edit
                      </button>
                      <br />
                      <button>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No Data Found{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
        {/* {
          <>
            <SwipeableDrawer
              anchor={"top"}
              open={true}
              style={{ width: "100%", backgroundColor: "red" }}
              // onClose={setEditing(false)}
              // onOpen={setEditing(true)}
            >
              <MdCancel
                className={styles.crossIcon}
                onClick={() => setEditing(false)}
              />
              <Box style={{ padding: "40px" }}>
                <Typography variant="h5">Edit Page:</Typography>
                <Typography>Number#:</Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  value={editIndex + 1}
                  disabled
                  inputProps={{
                    style: {
                      height: "28px",
                      padding: 0,
                      paddingLeft: "4px",
                    },
                  }}
                />
                <Typography>Page Text:</Typography>
                <textarea
                  style={{
                    border: "1px solid #333",
                    minHeight: "300px",
                    minWidth: "40%",
                  }}
                  value={"My name is Manish Mittal"}
                />
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography>Illustration</Typography>
                    <Box>
                      <img width={"130px"} src={illustration}></img>
                    </Box>
                    {console.log("illustration", illustration)}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Cover Image:</Typography>
                    <TextField
                      type="text"
                      variant="outlined"
                      fullWidth
                      value={imageTitle}
                      onChange={(e) => {
                        setImageTitle(e.target.value);
                      }}
                      inputProps={{
                        style: {
                          height: "3px",
                          border: "1px solid black",
                        },
                      }}
                    />
                    <Typography>Art Theme:</Typography>
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
                        onClick={() => {
                          if (!imageTitle) {
                            return alert("Please enter image title");
                          }
                          generateImage(
                            {
                              imageCount: "1",
                              imageFormat: "url",
                              imageSize: "512x512",
                              text: imageTitle,
                            },
                            editing
                          );
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
            </SwipeableDrawer>
          </>
        } */}
        {/* <textarea value={data[editIndex].PageText} />  */}
      </Box>
    </>
  );
};

export default Pages;

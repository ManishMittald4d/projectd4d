import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./kycForm.module.css";
import { MdCancel } from "react-icons/md";
import LoadingOverlay from "react-loading-overlay";

const Pages = ({
  pageData,
  illustration,
  showIllustration,
  generateImage,
  loading,
  updateExportableJson,
}) => {
  const [data, setData] = useState(pageData?.Story || []);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    let arr = [];
    if (showIllustration) {
      pageData?.Story?.forEach((item) => {
        let value = {
          ...item,
          illustration: illustration,
        };
        arr.push(value);
      });
      setData(arr);
    } else {
      pageData?.Story?.forEach((item) => {
        let value = {
          ...item,
          illustration: "",
        };
        arr.push(value);
      });
      setData(arr);
    }
  }, [pageData]);

  useEffect(() => {
    if (editing && pageData.Story) {
      setNewImage(illustration);
    }
  }, [illustration]);

  console.log("new image data", data);

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
                      {item.illustration ? (
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
                          setNewImage("");
                          setNewText(item.PageText);
                          setNewImage(item.illustration);
                          setImageTitle("");
                        }}
                        style={{ color: "blue" }}
                      >
                        Edit
                      </button>
                      <br />
                      <button
                        onClick={() => {
                          data.splice(index, 1);
                          setData([...data]);
                          updateExportableJson(data);
                        }}
                        style={{ color: "blue" }}
                      >
                        Delete
                      </button>
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
        {editing && (
          <>
            <SwipeableDrawer
              anchor={"top"}
              open={true}
              className={styles.drawer}
              style={{ width: "100%" }}
              // onClose={setEditing(false)}
              // onOpen={setEditing(true)}
            >
              <LoadingOverlay
                active={loading}
                spinner
                className={loading ? styles.loader : ""}
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
                      minHeight: "300px",
                      minWidth: "40%",
                    }}
                    className={styles.box}
                    value={newText}
                    onChange={(e) => {
                      setNewText(e.target.value);
                    }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Typography>Illustration</Typography>
                      <Box>
                        <img width={"130px"} src={newImage}></img>
                      </Box>
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
                            setNewImage("");
                            generateImage(
                              {
                                imageCount: "1",
                                imageFormat: "url",
                                imageSize: "512x512",
                                text: imageTitle,
                              },
                              1
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
                          onClick={() => {
                            var input = document.createElement("input");
                            input.type = "file";
                            input.style.display = "none";
                            input.onchange = function (e) {
                              var file = e.target.files[0];
                              const selectedImage = URL.createObjectURL(file);
                              setNewImage(selectedImage);
                            };
                            document.body.appendChild(input);
                            input.click();
                            document.body.removeChild(input);
                          }}
                        >
                          Upload
                        </button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                  <Button
                    style={{
                      backgroundColor: "#40E0D0",
                      marginRight: "4%",
                      color: "white",
                      font: "16px",
                    }}
                    onClick={() => {
                      const item = {
                        ...data[editIndex],
                        illustration: newImage,
                        PageText: newText,
                      };
                      data.splice(editIndex, 1, item);
                      console.log("updated image data", data);
                      setData([...data]);
                      setEditing(false);
                      // updateExportableJson(data);
                    }}
                  >
                    UPDATE
                  </Button>
                </Box>
              </LoadingOverlay>
            </SwipeableDrawer>
          </>
        )}
      </Box>
    </>
  );
};

export default Pages;

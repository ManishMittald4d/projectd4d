import React, { useState } from "react";
import styles from "./analytics.module.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import BaseService from "services/BaseService";
import axios from "axios";

export default function ApiForm({ records, setRecords }) {
  const [requestData, setRequestData] = useState({
    endpointTitle: "",
    endpointUrl: "",
    description: "",
    requestType: "GET",
    isActive: true,
    authorizationType: "BASIC",
    authorization: {
      userId: "",
      password: "",
      token: "",
    },
    headers: [{ key: "", value: "" }],
    body: "",
  });

  const makeDefault = () => {
    setRequestData({
      endpointTitle: "",
      endpointUrl: "",
      description: "",
      requestType: "GET",
      isActive: true,
      authorizationType: "BASIC",
      authorization: {
        userId: "",
        password: "",
        token: "",
      },
      headers: [{ key: "", value: "" }],
      body: "",
    });
  };

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const apiData = () => {
    const type = requestData.requestType.toLowerCase();
    let header = {
      Authorization: requestData.authorization,
    };
    requestData.headers.map((item) => {
      if (item.key) {
        const key = item.key.replaceAll(" ", "_");
        header[key] = item.value;
      }
    });
    const body = isJsonString(requestData.body);
    let data;
    if (requestData.body && !body) {
      return alert("enter a valid json format in body field");
    } else if (body) {
      data = JSON.parse(requestData.body);
    }

    return { type, header, data };
  };

  const makeAPIRequest = async () => {
    console.log("calling api");
    const { type, header, data } = apiData();

    try {
      let resp;
      if (requestData.endpointUrl.startsWith("http")) {
        resp = await axios[type](
          `${requestData.endpointUrl}`,
          JSON.stringify(requestData.body),
          { headers: header }
        );
      } else {
        resp = await BaseService({
          // url: "/Book/ePubImportSave",
          url: `/${requestData.endpointUrl}`,
          method: type,
          data: data,
          headers: header,
        });
      }
      console.log("response", resp);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      <Box className={styles.main}>
        <Box>
          <Grid container my={2}>
            <Grid
              container
              xs={6}
              style={{
                height: "fit-content",
                paddingInline: "8px",
              }}
            >
              <Box className={styles.gridBox}>
                <Typography className={styles.inputLabel}>
                  Title of the endpoint{" "}
                </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  className={`${styles.boxInput}`}
                  value={requestData.endpointTitle}
                  onChange={(e) => {
                    setRequestData({
                      ...requestData,
                      endpointTitle: e.target.value,
                    });
                  }}
                />
              </Box>
            </Grid>

            <Grid
              container
              xs={6}
              style={{
                height: "fit-content",
                paddingInline: "8px",
              }}
            >
              <Box className={styles.gridBox}>
                <Typography className={styles.inputLabel}>
                  URL/Endpoints
                </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  className={`${styles.boxInput}`}
                  value={requestData.endpointUrl}
                  onChange={(e) => {
                    setRequestData({
                      ...requestData,
                      endpointUrl: e.target.value,
                    });
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container my={2}>
            <Grid container xs={6} style={{ paddingInline: "8px" }}>
              <Box className={styles.gridBox}>
                <Typography className={styles.inputLabel}>
                  Description :
                </Typography>
                <Box>
                  <textarea
                    id="instruction"
                    name="previewData"
                    className={styles.previewData}
                    value={requestData.description}
                    onChange={(e) => {
                      setRequestData({
                        ...requestData,
                        description: e.target.value,
                      });
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid container xs={4} style={{ paddingInline: "8px" }}>
              <Box className={`${styles.gridBox} ${styles.typeBox}`}>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography className={styles.inputLabel}>Type</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <select
                      className={styles.dropdown}
                      value={requestData.requestType}
                      onChange={(e) => {
                        setRequestData({
                          ...requestData,
                          requestType: e.target.value,
                        });
                      }}
                    >
                      <option>GET</option>
                      <option>POST</option>
                    </select>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography className={styles.inputLabel}>
                      Active
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="flex items-center">
                      <label className="switch">
                        <input
                          type="checkbox"
                          id=""
                          name="allselect"
                          checked={requestData.isActive}
                          onChange={(e) =>
                            setRequestData({
                              ...requestData,
                              isActive: e.target.checked,
                            })
                          }
                          className="text-red-300"
                        ></input>
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid container xs={4} my={1} style={{ paddingInline: "8px" }}>
            <Typography className={styles.inputLabel}>Authorization</Typography>
            <select
              className={styles.dropdown}
              value={requestData.authorizationType}
              onChange={(e) => {
                setRequestData({
                  ...requestData,
                  authorizationType: e.target.value,
                  authorization: {
                    userId: "",
                    password: "",
                    token: "",
                  },
                });
              }}
            >
              <option>BASIC</option>
              <option>BEARER</option>
            </select>
          </Grid>

          {/* condition on auth type selecttion */}
          {requestData.authorizationType === "BASIC" ? (
            <Grid container my={2}>
              <Grid container xs={6} style={{ paddingInline: "8px" }}>
                <Box className={styles.gridBox}>
                  <Typography className={styles.inputLabel}>Userid</Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    className={`${styles.boxInput}`}
                    value={requestData.authorization.userId}
                    onChange={(e) => {
                      setRequestData({
                        ...requestData,
                        authorization: {
                          ...requestData.authorization,
                          userId: e.target.value,
                        },
                      });
                    }}
                  />
                </Box>
              </Grid>
              <Grid container xs={6} style={{ paddingInline: "8px" }}>
                <Box className={styles.gridBox}>
                  <Typography className={styles.inputLabel}>
                    Password{" "}
                  </Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    className={`${styles.boxInput}`}
                    value={requestData.authorization.password}
                    onChange={(e) => {
                      setRequestData({
                        ...requestData,
                        authorization: {
                          ...requestData.authorization,
                          password: e.target.value,
                        },
                      });
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container my={2} style={{ paddingInline: "8px" }}>
              <Box className={styles.gridBox}>
                <Typography className={styles.inputLabel}>token </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  className={`${styles.boxInput}`}
                  value={requestData.authorization.token}
                  onChange={(e) => {
                    setRequestData({
                      ...requestData,
                      authorization: {
                        ...requestData.authorization,
                        token: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
            </Grid>
          )}

          <Grid container my={2} style={{ paddingInline: "8px" }}>
            <Typography className={styles.inputLabel}>Headers </Typography>
            <Box className={`${styles.gridBox} ${styles.headersBox}`}>
              {requestData.headers.map((values, i) => (
                <Grid container key={i} my={1}>
                  <Grid item xs={5}>
                    <TextField
                      type="text"
                      variant="outlined"
                      placeholder="key"
                      value={values.key}
                      onChange={(e) => {
                        requestData.headers[i] = {
                          ...values,
                          key: e.target.value,
                        };
                        setRequestData({ ...requestData });
                      }}
                      className={`${styles.boxInput}`}
                      style={{ paddingRight: "12px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      variant="outlined"
                      placeholder="value"
                      value={values.value}
                      onChange={(e) => {
                        requestData.headers[i] = {
                          ...values,
                          value: e.target.value,
                        };
                        setRequestData({ ...requestData });
                      }}
                      className={`${styles.boxInput}`}
                    />
                  </Grid>
                  {
                    <Grid item xs={1} style={{ alignSelf: "center" }}>
                      {i === requestData.headers.length - 1 && (
                        <Typography
                          className={styles.headerActionBtn}
                          onClick={() => {
                            requestData.headers.push({
                              key: "",
                              value: "",
                            });
                            setRequestData({ ...requestData });
                          }}
                        >
                          +
                        </Typography>
                      )}
                      {requestData.headers.length > 0 && i > 0 && (
                        <Typography
                          className={styles.headerActionBtn}
                          onClick={() => {
                            const newHeaders = requestData.headers;
                            newHeaders.splice(i, 1);
                            setRequestData({
                              ...requestData,
                              headers: newHeaders,
                            });
                          }}
                        >
                          -
                        </Typography>
                      )}
                    </Grid>
                  }
                </Grid>
              ))}
            </Box>
          </Grid>

          <Grid container style={{ paddingInline: "8px" }}>
            <Box style={{ width: "60%" }}>
              <Typography className={styles.inputLabel}>Body :</Typography>
              <Box>
                <textarea
                  id="instruction"
                  name="previewData"
                  className={styles.previewData}
                  style={{ minHeight: "150px" }}
                  value={requestData.body}
                  onChange={(e) => {
                    setRequestData({
                      ...requestData,
                      body: e.target.value,
                    });
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Box style={{ paddingInline: "8px" }}>
            <Button
              className={styles.pageEndBtn}
              style={{
                marginRight: "16px",
              }}
              onClick={() => {
                makeAPIRequest();
              }}
            >
              Test
            </Button>
            <Button
              className={styles.pageEndBtn}
              onClick={() => {
                const { header, data } = apiData();
                delete header["Authorization"];
                records.push({
                  ...requestData,
                  headers: header,
                  body: data,
                });
                setRecords([...records]);
                localStorage.setItem("apiRecords", JSON.stringify(records));
                makeDefault();
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

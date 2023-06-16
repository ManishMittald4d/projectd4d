import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./analytics.module.css";
import { MdCancel } from "react-icons/md";
import { Checkbox, Select } from "components/ui";
import { Chart, Loading } from "components/shared";
import { COLORS, compreColor } from "constants/chart.constant";
import axios from "axios";
import { useEffect } from "react";

const graphTypes = [
  {
    label: "Line Chart",
    value: "line",
  },
];

export default function Graph({
  open,
  setOpen,
  setPageNumber,
  records,
  getEndPoint,
}) {
  const defaultSeries = {
    name: "",
    type: "area",
    data: [],
  };
  const defaultChartsData = {
    title: "",
    type: "area",
    description: "",

    axisData: {
      xAxis: {
        title: "",
        name: "",
        values: [],
      },
      yAxis: {
        leftYAxis: {
          title: "",
          name: "",
          min: "",
          max: "",
          steps: "",
        },
        rightYAxis: {
          title: "",
          name: "",
          min: "",
          max: "",
          steps: "",
        },
      },
    },
    series: [defaultSeries],
  };
  const [endPoints, setEndPoints] = useState({});
  const [showTable, setShowTable] = useState(false); //dummy state (can be removed after api is implemented on endpoint selection)
  const [chartsData, setChartsData] = useState(defaultChartsData);
  const [myCharts, setMyCharts] = useState([]);
  const [endPointTableData, setEndPointTableData] = useState({});
  const [apiData, setApiData] = useState({});
  const [allCharts, setAllCharts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultYAxis, setDefaultYAxis] = useState(false);

  const allEndPoints = [];

  records &&
    records.length > 0 &&
    records.map((item) => {
      const value = {
        value: item.endpointUrl,
        label: item.endpointTitle,
      };
      allEndPoints.push(value);
    });

  const handleClose = () => {
    setOpen(false);
    !endPoints.value && setPageNumber(1);
  };

  const selectedEndpoints = (value) => {
    setLoading(true);
    const num = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    // console.log(num);
    // console.log(allEndPoints)
    const selectedIndex = allEndPoints.indexOf(
      (item) => item.label === value.label
    );
    let url = "https://healthcare.digital4design.in/api/json/columns";
    // if (selectedIndex % 3 === 0) {
    //   url = `https://healthcare.digital4design.in/api/json/columns`;
    // }
    // else if(selectedIndex % 2 === 0){

    // }

    axios
      .get(url)
      .then((resp) => {
        const { data } = resp;
        // console.log("tableResp", resp);
        setApiData(data);
        const d = Object.values(data);
        setEndPointTableData({
          headers: Object.keys(data),
          body: d[0].map((column, i) => d.map((values, r) => values[i])),
        });
        setShowTable(true);

        const charts = localStorage.getItem("allApiCharts")
          ? JSON.parse(localStorage.getItem("allApiCharts"))
          : [];

        const myCharts =
          Array.isArray(charts) && charts.length > 0
            ? charts.filter((item) => item.endPointTitle === value.label)
            : [];
        const chartArr = [];
        myCharts.map((item) => {
          chartArr.push(item.chartsData);
        });
        setMyCharts([...chartArr]);
        setAllCharts([...charts]);
      })
      .catch((err) => {
        console.log(err);
      });

    setEndPoints(value);
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    const value = {
      value: getEndPoint.endpointUrl,
      label: getEndPoint.endpointTitle,
    };
    getEndPoint && selectedEndpoints(value);
  }, []);

  console.log("chartsData", chartsData);
  // console.log("allCharts", myCharts);

  const graphData = {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: "Units Sold VS Profit",
    },
    subtitles: [
      {
        text: "Click Legend to Hide or Unhide Data Series",
      },
    ],
    axisX: {
      title: "States",
      titleFontColor: "#C24642",
    },
    axisX2: {
      title: "Axis X - 2 Title",
    },
    axisY: {
      title: "Units Sold",
      titleFontColor: "#6D78AD",
      lineColor: "#6D78AD",
      labelFontColor: "#6D78AD",
      tickColor: "#6D78AD",
    },
    axisY2: {
      title: "Profit in USD",
      titleFontColor: "#51CDA0",
      lineColor: "#51CDA0",
      labelFontColor: "#51CDA0",
      tickColor: "#51CDA0",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "splineArea",
        axisXType: "secondary",
        axisXIndex: 0,
        name: "Units Sold",
        color: "green",
        fillOpacity: 0.15,
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: [
          { x: new Date(2017, 0, 1), y: 120 },
          { x: new Date(2017, 1, 1), y: 135 },
          { x: new Date(2017, 2, 1), y: 144 },
          { x: new Date(2017, 3, 1), y: 103 },
          { x: new Date(2017, 4, 1), y: 93 },
          { x: new Date(2017, 5, 1), y: 129 },
          { x: new Date(2017, 6, 1), y: 143 },
        ],
      },
      {
        type: "splineArea",
        name: "Profit",
        axisYType: "secondary",
        axisXIndex: 1,
        fillOpacity: 0.15,
        color: "red",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,##0.#",
        dataPoints: [
          { x: new Date(2017, 0, 1), y: 19034.5 },
          { x: new Date(2017, 1, 1), y: 20015 },
          { x: new Date(2017, 2, 1), y: 27342 },
          { x: new Date(2017, 3, 1), y: 20088 },
          { x: new Date(2017, 4, 1), y: 20234 },
          { x: new Date(2017, 5, 1), y: 29034 },
          { x: new Date(2017, 6, 1), y: 30487 },
        ],
      },
    ],
  };

  return (
    <Loading loading={loading} type={"default"} className={styles.loader}>
      <Box>
        {showTable && (
          <>
            <Typography variant="h4" my={2}>
              {endPoints.label}
            </Typography>
            <table
              className={`table table-bordered border-dark ${styles.table}`}
              style={{ marginBlock: "24px" }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {endPointTableData.headers &&
                    endPointTableData.headers.length > 0 &&
                    endPointTableData.headers.map((header, i) => (
                      <th key={header + 1}>{header}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {endPointTableData.body &&
                  endPointTableData.body.length > 0 &&
                  endPointTableData.body.map((row, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      {row.map((cellData, i) => (
                        <td key={cellData + i}>{cellData}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>

            <Grid
              container
              my={1}
              style={{
                height: "fit-content",
              }}
            >
              <Grid item xs={5}>
                <Box className={styles.gridBox}>
                  <Typography className={styles.inputLabel}>
                    Chart Title
                  </Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Chart Title"
                    className={`${styles.boxInput}`}
                    value={chartsData.title}
                    onChange={(e) => {
                      setChartsData({
                        ...chartsData,
                        title: e.target.value,
                      });
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <Typography className={styles.inputLabel}>
                  Chart Type
                </Typography>
                <select
                  className={`${styles.dropdown}`}
                  value={chartsData.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    setChartsData({ ...chartsData, type: type });
                  }}
                >
                  <option value="area">Area Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="donut">Pie Chart</option>
                </select>
              </Grid>
            </Grid>

            <Grid container my={1}>
              <Grid item xs={5}>
                <Box>
                  <Typography>X-Axis configs</Typography>
                  <Box className={styles.headersBox}>
                    <Typography className={styles.inputLabel}>
                      Axis title
                    </Typography>
                    <Grid item xs={8}>
                      <TextField
                        type="text"
                        variant="outlined"
                        placeholder="X-axis Title"
                        className={`${styles.boxInput}`}
                        // value={chartsData.axisTitle.xAxis}
                        value={chartsData.axisData.xAxis.title}
                        onChange={(e) => {
                          const newChartsData = {
                            ...chartsData,
                            axisData: {
                              ...chartsData.axisData,
                              xAxis: {
                                ...chartsData.axisData.xAxis,
                                title: e.target.value,
                              },
                            },
                          };
                          setChartsData({
                            ...newChartsData,
                          });
                        }}
                      />
                    </Grid>
                    <Typography className={styles.inputLabel}>
                      Axis values
                    </Typography>
                    <Grid item xs={8}>
                      <select
                        className={`${styles.dropdown}`}
                        value={chartsData.axisData.xAxis.name || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const labels = apiData[value];

                          const newChartsData = {
                            ...chartsData,
                            axisData: {
                              ...chartsData.axisData,
                              xAxis: {
                                ...chartsData.axisData.xAxis,
                                values: labels,
                                name: value,
                              },
                            },
                          };
                          setChartsData({
                            ...newChartsData,
                          });
                        }}
                      >
                        <option value="" disabled>
                          Select x-axis Labels
                        </option>
                        {endPointTableData.headers &&
                          endPointTableData.headers.length > 0 &&
                          endPointTableData.headers.map((header, i) => (
                            <option key={header + 1}>{header}</option>
                          ))}
                      </select>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <Box>
                  <Typography>Y-Axis configs</Typography>
                  <Box className={styles.headersBox}>
                    <Typography className={styles.inputLabel}>
                      Axis values
                      <Checkbox
                        checked={defaultYAxis}
                        onChange={(e) => {
                          setDefaultYAxis(!defaultYAxis);
                        }}
                        className={styles.checkBox}
                      />
                      Default Values
                    </Typography>
                    <Grid item xs={12}>
                      <Typography>Left Axis</Typography>
                      <Grid item xs={12} className={styles.headersBox}>
                        <Grid item xs={12}>
                          <Box>
                            <Typography className={styles.inputLabel}>
                              Axis title
                            </Typography>
                            <TextField
                              type="text"
                              variant="outlined"
                              placeholder="Axis Title"
                              className={`${styles.boxInput}`}
                              // value={chartsData.axisTitle.yAxis}
                              value={chartsData.axisData.yAxis.leftYAxis.title}
                              onChange={(e) => {
                                const newChartsData = {
                                  ...chartsData,
                                  axisData: {
                                    ...chartsData.axisData,
                                    yAxis: {
                                      ...chartsData.axisData.yAxis,
                                      leftYAxis: {
                                        ...chartsData.axisData.yAxis.leftYAxis,
                                        title: e.target.value,
                                      },
                                    },
                                  },
                                };
                                setChartsData({
                                  ...newChartsData,
                                });
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            <Box>
                              <Typography>Min</Typography>
                              <TextField
                                type="number"
                                variant="outlined"
                                placeholder="min values"
                                disabled={defaultYAxis}
                                className={`${styles.boxInput}`}
                                value={chartsData.axisData.yAxis.leftYAxis.min}
                                onChange={(e) => {
                                  const newChartsData = {
                                    ...chartsData,
                                    axisData: {
                                      ...chartsData.axisData,
                                      yAxis: {
                                        ...chartsData.axisData.yAxis,
                                        leftYAxis: {
                                          ...chartsData.axisData.yAxis
                                            .leftYAxis,
                                          min: e.target.value,
                                        },
                                      },
                                    },
                                  };
                                  setChartsData({
                                    ...newChartsData,
                                  });
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4} style={{ paddingInline: "12px" }}>
                            <Box>
                              <Typography>Max</Typography>
                              <TextField
                                type="number"
                                variant="outlined"
                                disabled={defaultYAxis}
                                placeholder="max value"
                                className={`${styles.boxInput}`}
                                value={chartsData.axisData.yAxis.leftYAxis.max}
                                onChange={(e) => {
                                  const newChartsData = {
                                    ...chartsData,
                                    axisData: {
                                      ...chartsData.axisData,
                                      yAxis: {
                                        ...chartsData.axisData.yAxis,
                                        leftYAxis: {
                                          ...chartsData.axisData.yAxis
                                            .leftYAxis,
                                          max: e.target.value,
                                        },
                                      },
                                    },
                                  };
                                  setChartsData({
                                    ...newChartsData,
                                  });
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box>
                              <Typography>Steps</Typography>
                              <TextField
                                type="number"
                                variant="outlined"
                                placeholder="steps"
                                disabled={defaultYAxis}
                                className={`${styles.boxInput}`}
                                value={
                                  chartsData.axisData.yAxis.leftYAxis.steps
                                }
                                onChange={(e) => {
                                  const newChartsData = {
                                    ...chartsData,
                                    axisData: {
                                      ...chartsData.axisData,
                                      yAxis: {
                                        ...chartsData.axisData.yAxis,
                                        leftYAxis: {
                                          ...chartsData.axisData.yAxis
                                            .leftYAxis,
                                          steps: e.target.value,
                                        },
                                      },
                                    },
                                  };
                                  setChartsData({
                                    ...newChartsData,
                                  });
                                }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Right Axis</Typography>
                      <Grid item xs={12} className={styles.headersBox}>
                        <Grid item xs={12}>
                          <Box>
                            <Typography className={styles.inputLabel}>
                              Axis title
                            </Typography>
                            <TextField
                              type="text"
                              variant="outlined"
                              placeholder="Axis Title"
                              className={`${styles.boxInput}`}
                              value={chartsData.axisData.yAxis.rightYAxis.title}
                              onChange={(e) => {
                                const newChartsData = {
                                  ...chartsData,
                                  axisData: {
                                    ...chartsData.axisData,
                                    yAxis: {
                                      ...chartsData.axisData.yAxis,
                                      rightYAxis: {
                                        ...chartsData.axisData.yAxis.rightYAxis,
                                        title: e.target.value,
                                      },
                                    },
                                  },
                                };
                                setChartsData({
                                  ...newChartsData,
                                });
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            <Box>
                              <Typography>Min</Typography>
                              <TextField
                                type="number"
                                variant="outlined"
                                placeholder="min values"
                                disabled={defaultYAxis}
                                className={`${styles.boxInput}`}
                                value={chartsData.axisData.yAxis.rightYAxis.min}
                                onChange={(e) => {
                                  const newChartsData = {
                                    ...chartsData,
                                    axisData: {
                                      ...chartsData.axisData,
                                      yAxis: {
                                        ...chartsData.axisData.yAxis,
                                        rightYAxis: {
                                          ...chartsData.axisData.yAxis
                                            .rightYAxis,
                                          min: e.target.value,
                                        },
                                      },
                                    },
                                  };
                                  setChartsData({
                                    ...newChartsData,
                                  });
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4} style={{ paddingInline: "12px" }}>
                            <Box>
                              <Typography>Max</Typography>
                              <TextField
                                type="number"
                                variant="outlined"
                                disabled={defaultYAxis}
                                placeholder="max value"
                                className={`${styles.boxInput}`}
                                value={chartsData.axisData.yAxis.rightYAxis.max}
                                onChange={(e) => {
                                  const newChartsData = {
                                    ...chartsData,
                                    axisData: {
                                      ...chartsData.axisData,
                                      yAxis: {
                                        ...chartsData.axisData.yAxis,
                                        rightYAxis: {
                                          ...chartsData.axisData.yAxis
                                            .rightYAxis,
                                          max: e.target.value,
                                        },
                                      },
                                    },
                                  };
                                  setChartsData({
                                    ...newChartsData,
                                  });
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box>
                              <Typography>Steps</Typography>
                              <TextField
                                type="number"
                                variant="outlined"
                                placeholder="steps"
                                disabled={defaultYAxis}
                                className={`${styles.boxInput}`}
                                value={
                                  chartsData.axisData.yAxis.rightYAxis.steps
                                }
                                onChange={(e) => {
                                  const newChartsData = {
                                    ...chartsData,
                                    axisData: {
                                      ...chartsData.axisData,
                                      yAxis: {
                                        ...chartsData.axisData.yAxis,
                                        rightYAxis: {
                                          ...chartsData.axisData.yAxis
                                            .rightYAxis,
                                          steps: e.target.value,
                                        },
                                      },
                                    },
                                  };
                                  setChartsData({
                                    ...newChartsData,
                                  });
                                }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid container my={1} xs={5}>
              <Box style={{ width: "100%" }}>
                <Typography className={styles.inputLabel}>
                  Graph Values
                </Typography>
                <Box className={`${styles.headersBox}`}>
                  {chartsData.series &&
                    chartsData.series.length > 0 &&
                    chartsData.series.map((values, i) => (
                      <Grid container key={i} my={1}>
                        <Grid item xs={11} pr={2}>
                          <select
                            className={`${styles.dropdown}`}
                            value={values.name}
                            onChange={(e) => {
                              const value = e.target.value;
                              const series = {
                                name: value,
                                type: chartsData.type,
                                data: apiData[value],
                              };
                              chartsData.series.splice(i, 1, series);
                              setChartsData({
                                ...chartsData,
                              });
                            }}
                          >
                            <option value="" disabled>
                              Select {`series-${i + 1}`}
                            </option>
                            {endPointTableData.headers &&
                              endPointTableData.headers.length > 0 &&
                              endPointTableData.headers.map((header, i) => (
                                <option key={header + 1}>{header}</option>
                              ))}
                          </select>
                        </Grid>
                        {
                          <Grid item xs={1} style={{ alignSelf: "center" }}>
                            {i === chartsData.series.length - 1 && (
                              <Typography
                                className={styles.headerActionBtn}
                                onClick={() => {
                                  chartsData.series.push(defaultSeries);
                                  setChartsData({ ...chartsData });
                                }}
                              >
                                +
                              </Typography>
                            )}
                            {chartsData.series.length - 1 === i && i > 0 && (
                              <Typography
                                className={styles.headerActionBtn}
                                onClick={() => {
                                  const newaxisColumns = chartsData.series;
                                  newaxisColumns.splice(i, 1);
                                  setChartsData({ ...chartsData });
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
              </Box>
            </Grid>
            <Grid container xs={5} my={1}>
              <Box className={styles.gridBox}>
                <Typography className={styles.inputLabel}>
                  Description :
                </Typography>
                <Box>
                  <textarea
                    id="instruction"
                    name="previewData"
                    className={styles.previewData}
                    value={chartsData.description}
                    onChange={(e) => {
                      setChartsData({
                        ...chartsData,
                        description: e.target.value,
                      });
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Button
              className={styles.pageEndBtn}
              style={{
                marginRight: "16px",
              }}
              onClick={() => {
                myCharts.push(chartsData);
                setMyCharts([...myCharts]);
                allCharts.push({
                  endPointTitle: endPoints.label,
                  chartsData,
                });
                setChartsData(defaultChartsData);
                localStorage.setItem("allApiCharts", JSON.stringify(allCharts));
              }}
            >
              Add Chart
            </Button>

            {/* <CanvasJSChart options={graphData} /> */}

            {myCharts.map((item, index) => (
              <div
                style={{
                  marginTop: "32px",
                  width: "900px",
                  height: "450px",
                  marginInline: "auto",
                }}
                key={index}
              >
                <Chart
                  options={{
                    title: { text: item.title },
                    colors: item.type === "area" ? compreColor : COLORS,
                    stroke: {
                      curve: "smooth",
                    },
                    xaxis: {
                      title: {
                        text: item.axisData.xAxis.title,
                        offsetY: 80,
                      },
                      categories: item.axisData.xAxis.values,
                    },
                    yaxis: [
                      {
                        ...item.axisData.yAxis.leftYAxis,
                        title: { text: item.axisData.yAxis.leftYAxis.title },
                      },
                      {
                        ...item.axisData.yAxis.rightYAxis,
                        opposite: true,
                        title: { text: item.axisData.yAxis.rightYAxis.title },
                      },
                    ],
                    chart: {
                      toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                          download: true,
                          zoom: true,
                          zoomin: true,
                          zoomout: true,
                          pan: false,
                          reset: false,
                          customIcons: [],
                        },
                      },
                    },
                  }}
                  series={item.series}
                  height={300}
                />
              </div>
            ))}
          </>
        )}

        <Dialog onClose={handleClose} open={open} className={styles.dialogBox}>
          <MdCancel
            className={styles.crossIcon}
            onClick={() => handleClose()}
          />
          <DialogTitle style={{ paddingLeft: "12px" }}>
            Select Endpoint Title
          </DialogTitle>
          <Grid container style={{ padding: "12px" }}>
            <Select
              styles={{
                container: (baseStyles) => ({
                  ...baseStyles,
                  width: "400px",
                }),
                menuPortal: (baseStyles) => ({
                  ...baseStyles,
                  zIndex: 100000,
                }),
              }}
              menuPortalTarget={document.body}
              defaultValue={allEndPoints[0]}
              options={allEndPoints}
              value={endPoints}
              onChange={(value) => {
                selectedEndpoints(value);
              }}
              isSearchable={false}
            />
          </Grid>
        </Dialog>
      </Box>
    </Loading>
  );
}

// <Grid container my={1} style={{ paddingInline: "8px" }}>
// <Typography className={styles.inputLabel}>Graph Values </Typography>
// <Box className={`${styles.gridBox} ${styles.headersBox}`}>
//   {chartsData.graphData.map((values, i) => (
//     <Grid container key={i} my={1}>
//       <Grid item xs={6} pr={2}>
//         <select
//           className={`${styles.dropdown}`}
//           placeholder={Object.keys(values)[0]}
//           onChange={(e) => {
//             const axisName =
//               chartsData.graphData.length > 1
//                 ? `x${chartsData.graphData.length - 1}-axis`
//                 : `x-axis`;
//             chartsData.graphData[i] = {
//               ...values,
//               [axisName]: e.target.value,
//             };
//             setChartsData({ ...chartsData });
//           }}
//           defaultValue={""}
//         >
//           <option value="" disabled>
//             Select {Object.keys(values)[0]}
//           </option>
//           {endPointData.headers &&
//             endPointData.headers.length > 0 &&
//             endPointData.headers.map((header) => (
//               <option>{header}</option>
//             ))}
//         </select>
//       </Grid>
//       <Grid item xs={6}>
//         <select
//           className={`${styles.dropdown}`}
//           placeholder={Object.keys(values)[1]}
//           onChange={(e) => {
//             const axisName =
//               chartsData.graphData.length > 1
//                 ? `y${chartsData.graphData.length - 1}-axis`
//                 : `y-axis`;
//             chartsData.graphData[i] = {
//               ...values,
//               [axisName]: e.target.value,
//             };
//             setChartsData({ ...chartsData });
//           }}
//           defaultValue={""}
//         >
//           <option value="" disabled>
//             Select {Object.keys(values)[1]}
//           </option>
//           {endPointData.headers &&
//             endPointData.headers.length > 0 &&
//             endPointData.headers.map((header) => (
//               <option>{header}</option>
//             ))}
//         </select>
//       </Grid>
//       {
//         <Grid item xs={1} style={{ alignSelf: "center" }}>
//           {i === chartsData.axisColumns.length - 1 && (
//             <Typography
//               className={styles.headerActionBtn}
//               onClick={() => {
//                 const xAxisName = `x${chartsData.axisColumns.length}-axis`;
//                 const yAxisName = `y${chartsData.axisColumns.length}-axis`;

//                 chartsData.axisColumns.push({
//                   [xAxisName]: "",
//                   [yAxisName]: "",
//                 });
//                 setChartsData({ ...chartsData });
//               }}
//             >
//               +
//             </Typography>
//           )}
//           {chartsData.axisColumns.length - 1 === i && i > 0 && (
//             <Typography
//               className={styles.headerActionBtn}
//               onClick={() => {
//                 const newaxisColumns = chartsData.axisColumns;
//                 newaxisColumns.splice(i, 1);
//                 setChartsData({ ...chartsData });
//               }}
//             >
//               -
//             </Typography>
//           )}
//         </Grid>
//       }
//     </Grid>
//   ))}
// </Box>
// </Grid>

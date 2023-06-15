import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./analytics.module.css";
import { MdCancel } from "react-icons/md";
import { Select } from "components/ui";
import { CanvasJSChart } from "canvasjs-react-charts";
import { Chart } from "components/shared";
import { bookReadcolor, compreColor } from "constants/chart.constant";

export default function Graph({ open, setOpen, setPageNumber }) {
  const [endPoints, setEndPoints] = useState({});
  const [endpointsData, setEndpointsData] = useState([]); //update this state on api call
  const [showTable, setShowTable] = useState(false); //dummy state (can be removed after api is implemented on endpoint selection)
  const [chartsdata, setChartsdata] = useState({
    title: "",
    description: "",
    axisColumns: [{ "x-axis": "", "y-axis": "" }],
  });

  const endpointsAvailable = localStorage.getItem("apiRecords");
  const getEndPoints = endpointsAvailable && JSON.parse(endpointsAvailable);
  const allEndPoints = [];

  getEndPoints &&
    getEndPoints.length > 0 &&
    getEndPoints.map((item) => {
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
    setEndPoints(value);
    setOpen(false);
    setShowTable(true);
  };

  console.log("chartsdata", chartsdata);

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

  const compreshenData = [
    {
      name: "Book Reading count",
      type: "donut",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "Book Reading count",
      data: [
        { y: 11, x: "14 Jan" },
        { y: 18, x: "15 Jan" },
        { y: 19, x: "15 Jan" },
        { y: 12, x: "16 Jan" },
        { y: 15, x: "17 Jan" },
        { y: 12, x: "18 Jan" },
        { y: 13, x: "19 Jan" },
        { y: 11, x: "20 Jan" },
        { y: 14, x: "21 Jan" },
        { y: 16, x: "22 Jan" },
      ],
    },
  ];

  return (
    <Box>
      {showTable && (
        <>
          <table
            className={`table table-bordered border-dark ${styles.table}`}
            style={{ marginBlock: "24px" }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Endpoint Title</th>
                <th scope="col">Endpoint Url</th>
                <th scope="col">Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>

          <Grid
            container
            xs={6}
            my={1}
            style={{
              height: "fit-content",
              paddingInline: "8px",
            }}
          >
            <Box className={styles.gridBox}>
              <Typography className={styles.inputLabel}>Chart Title</Typography>
              <TextField
                type="text"
                variant="outlined"
                className={`${styles.boxInput}`}
                value={chartsdata.title}
                onChange={(e) => {
                  setChartsdata({
                    ...chartsdata,
                    title: e.target.value,
                  });
                }}
              />
            </Box>
          </Grid>

          <Grid container xs={6} my={1} style={{ paddingInline: "8px" }}>
            <Box className={styles.gridBox}>
              <Typography className={styles.inputLabel}>
                Description :
              </Typography>
              <Box>
                <textarea
                  id="instruction"
                  name="previewData"
                  className={styles.previewData}
                  value={chartsdata.description}
                  onChange={(e) => {
                    setChartsdata({
                      ...chartsdata,
                      description: e.target.value,
                    });
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid container my={1} style={{ paddingInline: "8px" }}>
            <Typography className={styles.inputLabel}>Axis </Typography>
            <Box className={`${styles.gridBox} ${styles.headersBox}`}>
              {chartsdata.axisColumns.map((values, i) => (
                <Grid container key={i} my={1}>
                  <Grid item xs={5} pr={2}>
                    <select
                      className={`${styles.dropdown}`}
                      placeholder={Object.keys(values)[0]}
                      onChange={(e) => {
                        const axisName =
                          chartsdata.axisColumns.length > 1
                            ? `x${chartsdata.axisColumns.length - 1}-axis`
                            : `x-axis`;
                        chartsdata.axisColumns[i] = {
                          ...values,
                          [axisName]: e.target.value,
                        };
                        setChartsdata({ ...chartsdata });
                      }}
                      defaultValue={""}
                    >
                      <option value="" disabled>
                        Select {Object.keys(values)[0]}
                      </option>
                      <option>column 1</option>
                      <option>column 2</option>
                      <option>column 3</option>
                      <option>column 4</option>
                    </select>
                  </Grid>
                  <Grid item xs={6}>
                    <select
                      className={`${styles.dropdown}`}
                      placeholder={Object.keys(values)[1]}
                      onChange={(e) => {
                        const axisName =
                          chartsdata.axisColumns.length > 1
                            ? `y${chartsdata.axisColumns.length - 1}-axis`
                            : `y-axis`;
                        chartsdata.axisColumns[i] = {
                          ...values,
                          [axisName]: e.target.value,
                        };
                        setChartsdata({ ...chartsdata });
                      }}
                      defaultValue={""}
                    >
                      <option value="" disabled>
                        Select {Object.keys(values)[1]}
                      </option>
                      <option>column 1</option>
                      <option>column 2</option>
                      <option>column 3</option>
                      <option>column 4</option>
                    </select>
                  </Grid>
                  {/* {
                    <Grid item xs={1} style={{ alignSelf: "center" }}>
                      {i === chartsdata.axisColumns.length - 1 && (
                        <Typography
                          className={styles.headerActionBtn}
                          onClick={() => {
                            const xAxisName = `x${chartsdata.axisColumns.length}-axis`;
                            const yAxisName = `y${chartsdata.axisColumns.length}-axis`;

                            chartsdata.axisColumns.push({
                              [xAxisName]: "",
                              [yAxisName]: "",
                            });
                            setChartsdata({ ...chartsdata });
                          }}
                        >
                          +
                        </Typography>
                      )}
                      {chartsdata.axisColumns.length - 1 === i && i > 0 && (
                        <Typography
                          className={styles.headerActionBtn}
                          onClick={() => {
                            const newaxisColumns = chartsdata.axisColumns;
                            newaxisColumns.splice(i, 1);
                            setChartsdata({ ...chartsdata });
                          }}
                        >
                          -
                        </Typography>
                      )}
                    </Grid>
                  } */}
                </Grid>
              ))}
            </Box>
          </Grid>

          <div
            style={{
              marginTop: "32px",
              width: "900px",
              height: "450px",
              marginInline: "auto",
            }}
          >
            <CanvasJSChart options={graphData} />

            <Chart
              options={{
                dataLabels: {
                  enabled: false,
                },
                legend: {
                  show: true,
                  showForSingleSeries: true,
                },
                colors: compreColor,
                stroke: {
                  curve: "smooth",
                },
                xaxis: {
                  type: "datetime",
                  categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z",
                  ],
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
              }}
              series={compreshenData}
              type="area"
              height={300}
            />
          </div>
        </>
      )}

      <Dialog onClose={handleClose} open={open} className={styles.dialogBox}>
        <MdCancel className={styles.crossIcon} onClick={() => handleClose()} />
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
  );
}

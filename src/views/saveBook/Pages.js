// import { Box, Typography } from "@mui/material";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./kycForm.module.css";

const Pages = ({ pageData, illustration }) => {
  const [data, setData] = useState(pageData?.Story);
  useEffect(() => {
    setData(pageData?.Story);
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
                      {illustration ? (
                        <img style={{ width: "100px" }} src={illustration} />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>@{item.name}</td>
                    <td>
                      <button>Edit</button>
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
      </Box>
    </>
  );
};

export default Pages;

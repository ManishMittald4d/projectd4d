import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./kycForm.module.css";

const Comprehension = () => {
  const [data, setData] = useState();
  const handleApi = async () => {
    const resp = await axios.get("");
    return resp.data;
  };
  useEffect(() => {
    handleApi();
  }, []);

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
          Comprehension
        </Typography>
        <Box>
          <table class={`table table-bordered border-dark ${styles.table}`}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Page Text</th>
                <th scope="col">Correct Answer</th>
                <th scope="col">Reference page</th>
                <th scope="col">OpenAI Id</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.name}</td>
                    <td>{item.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No Data Found
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

export default Comprehension;

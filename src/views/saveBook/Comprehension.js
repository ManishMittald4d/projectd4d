import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./kycForm.module.css";

const Comprehension = ({ pageData, exportJson }) => {
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
          Comprehension
        </Typography>
        <Box>
          <table className={`table table-bordered border-dark ${styles.table}`}>
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
                data.map((item, index) =>
                  item.Questions.map((value, i) => (
                    <tr key={value.Question}>
                      <th>{i + 1}</th>
                      <td>{value.Question}</td>
                      <td>{value.Answer}</td>
                      <td>{index + 1}</td>
                      <td>{"@"}</td>
                      <td>
                        <button>Edit</button>
                        <br />
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))
                )
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

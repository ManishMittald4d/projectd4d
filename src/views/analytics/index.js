import React, { useState } from "react";
import ApiForm from "./apiForm";
import Records from "./records";
import { Button } from "@mui/material";
import styles from "./analytics.module.css";
import Graph from "./Graph";

export default function Analytics() {
  const data =
    localStorage.getItem("apiRecords") &&
    JSON.parse(localStorage.getItem("apiRecords"));
  const [records, setRecords] = useState(data || []);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);

  console.log("records", records);

  return (
    <div style={{ marginInline: "2%" }}>
      {pageNumber === 1 && (
        <>
          <ApiForm records={records} setRecords={setRecords} />
          <Records records={records} />
          <Button
            className={styles.pageEndBtn}
            onClick={() => {
              setOpen(true);
              setPageNumber(2);
            }}
          >
            Add New Chart
          </Button>
        </>
      )}
      {pageNumber === 2 && (
        <>
          <Graph open={open} setOpen={setOpen} setPageNumber={setPageNumber} />
        </>
      )}
    </div>
  );
}

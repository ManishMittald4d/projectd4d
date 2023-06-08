import React, { useState } from "react";
import ApiForm from "./apiForm";
import Records from "./records";

export default function Analytics() {
  const data =
    localStorage.getItem("apiRecords") &&
    JSON.parse(localStorage.getItem("apiRecords"));
  console.log("data", data);
  const [records, setRecords] = useState(data || []);

  console.log("records", records);

  return (
    <div>
      <ApiForm records={records} setRecords={setRecords} />
      <Records records={records} />
    </div>
  );
}

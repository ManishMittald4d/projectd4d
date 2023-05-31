import React, { useState } from "react";
import BookInfo from "./BookInfo";
import Page1 from "./Page1";
import Pages from "./Pages";
import Comprehension from "./Comprehension";
import axios from "axios";

function SaveBook() {
  const [coverImages, setCoverImages] = useState([]);
  const getbookData = async (data) => {
    try {
      const reqData = data;
      const resp = await axios.post(
        "https://predev-api.readabilitytutor.com/AI/v1/GenerateImage",
        reqData
      );
      console.log("resp", resp.data.Data.Urls);
      setCoverImages(resp.data.Data.Urls);
    } catch (err) {
      console.log(err);
    }
    console.log("getbookData");
  };
  return (
    <div>
      <Page1 getbookData={getbookData} />
      <BookInfo coverImages={coverImages} />
      <Pages />
      <Comprehension />
    </div>
  );
}

export default SaveBook;

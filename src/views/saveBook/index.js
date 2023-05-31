import React, { useState } from "react";
import BookInfo from "./BookInfo";
import Page1 from "./Page1";
import Pages from "./Pages";
import Comprehension from "./Comprehension";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import styles from "./kycForm.module.css";

function SaveBook() {
  const [coverImages, setCoverImages] = useState([]);
  const [aiFormData, setAiFormData] = useState({});
  const [newPreview, setNewPreview] = useState("");
  const [loading, setLoadung] = useState(false);

  const getbookData = async (getCoverImage, bookData, formData) => {
    setLoadung(true);
    try {
      if (getCoverImage) {
        const bookReqData = bookData;
        const resp = await axios.post(
          "https://predev-api.readabilitytutor.com/AI/v1/GenerateImage",
          bookReqData
        );
        console.log("resp", resp.data.Data.Urls);
        setCoverImages(resp.data.Data.Urls);
      }
      const formReqData = formData;
      const formResp = await axios.post(
        "https://predev-api.readabilitytutor.com/AI/v1/ChatCompletions",
        formReqData
      );
      setAiFormData(formResp.data.Data);
      console.log("formResp", formResp.data);

      let body = "";
      formResp.data.Data.Story &&
        formResp.data.Data.Story.map((item) => {
          body += item.PageText;
        });

      getNewPreview(body);
      setLoadung(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getNewPreview = (preview) => {
    setNewPreview(preview);
  };

  return (
    <div>
      <LoadingOverlay
        active={loading}
        spinner
        className={loading ? styles.loader : ""}
      >
        <>
          <Page1 getbookData={getbookData} newPreview={newPreview} />
          <BookInfo
            coverImages={coverImages}
            aiFormData={aiFormData}
            getNewPreview={getNewPreview}
          />
          <Pages pageData={aiFormData} illustration={coverImages[0]} />
          <Comprehension pageData={aiFormData} />
        </>
      </LoadingOverlay>
    </div>
  );
}

export default SaveBook;

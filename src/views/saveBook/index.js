import React, { useState } from "react";
import BookInfo from "./BookInfo";
import Page1 from "./Page1";
import Pages from "./Pages";
import Comprehension from "./Comprehension";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import styles from "./kycForm.module.css";
import { Button } from "@mui/material";
import BaseService from "services/BaseService";

function SaveBook() {
  const [coverImages, setCoverImages] = useState([]);
  const [aiFormData, setAiFormData] = useState({});
  const [newPreview, setNewPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [exportableJSON, setExportableJSON] = useState({});
  const [editingImage, setEditingImage] = useState(null);
  const [newImage, setNewImage] = useState("");
  const [exportingJson, setExportingJson] = useState(false);
  const [apiCallNumber, setApiCallNumber] = useState(0);

  const generateImage = async (coverImageData, editing = null) => {
    setLoading(true);
    setEditingImage(editing);
    const bookReqData = {
      imageCount: coverImageData.imageCount,
      imageFormat: "url",
      imageSize: "512x512",
      text: coverImageData.text,
    };
    const resp = await axios.post(
      "https://predev-api.readabilitytutor.com/AI/v1/GenerateImage",
      bookReqData
    );
    console.log("cover Images", resp.data);
    if (editing) {
      setNewImage(resp.data.Data.Urls);
    } else {
      setCoverImages(resp.data.Data.Urls);
    }
    setLoading(false);
    return resp.data.Data.Urls[0];
    // setEditingImage(false);
  };

  const getFormData = async (formData, coverImageData, myImage) => {
    setLoading(true);
    const formReqData = formData;
    const formResp = await axios.post(
      "https://predev-api.readabilitytutor.com/AI/v1/ChatCompletions",
      formReqData
    );

    const data = formResp.data.Data;
    if ((!data || formResp.status === 500) && apiCallNumber < 4) {
      setApiCallNumber(apiCallNumber + 1);
      return getFormData(formData);
    }
    const response = data
      ? {
          ...data,
          LexileLevelMin: data.LexileLevelMin.replace(/[^\d.-]/g, ""),
          LexileLevelMax: data.LexileLevelMax.replace(/[^\d.-]/g, ""),
        }
      : data;
    // setAiFormData(response);
    console.log("formResp", formResp.data);
    setLoading(false);
    let body = "";
    let arr = [];

    formResp.data.Data.Story &&
      formResp.data.Data.Story.map((item) => {
        body += item.PageText;
        let value = {
          ...item,
          illustration: coverImageData.illustration ? myImage : "",
        };
        arr.push(value);
      });
    setAiFormData({
      ...response,
      Story: arr,
    });

    getNewPreview(body);
    setApiCallNumber(0);
  };

  const getbookData = async (coverImageData, formData) => {
    setLoading(true);
    try {
      let myImage = "";
      if (coverImageData.getCoverImage) {
        myImage = await generateImage(coverImageData);
      }
      await getFormData(formData, coverImageData, myImage);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getNewPreview = (preview) => {
    setNewPreview(preview);
  };

  const exportJson = async () => {
    setExportingJson(true);
    const {
      ARScore,
      Genre,
      Grade,
      LexileLevelMax,
      LexileLevelMin,
      SightWords,
      Tags,
      Title,
      Story,
    } = aiFormData;

    const bookURL = newImage?.split("/") || coverImages[0]?.split("/") || "";
    const fileName = bookURL && bookURL?.pop();
    const docList = [
      {
        fileName: fileName,
        FilePath: coverImages[0],
        DocumentTypeId: 2,
        DocumentPurposeTypeId: 1,
        DocumentForId: 2,
      },
    ];
    let ExtraList = [];
    let Extra2List = [];

    Story.length > 0 &&
      Story.forEach((story, index) => {
        const title = `Chapter ${index + 1} : ${Title[0]}`;
        ExtraList.push({
          Title: title,
          PageNumber: index + 1,
          Text: `${story.PageText}\r\n`,
          IsActive: true,
          DocumentList: docList,
        });

        story.Questions.forEach((qes) => {
          let Question = qes?.Question;
          let Answer = qes.Answer;
          Extra2List.push({
            BookChapterQuestionId: "",
            Title: title,
            Question: Question,
            Answer: Answer,
            Scope: Question,
            ScopeStartIndex: "0",
            ScopeEndIndex: "0",
            IsInline: true,
            IsEndOfBook: true,
            IsActive: true,
            IsAICheck: "true",
            PassageCode: "901447004ad30749ee14d2f42d759811",
            ExtraJSON: "true",
          });
        });
      });

    const json = {
      Title: Title.join(", "),
      Tags: Tags.join(", "),
      Genre: Genre.join(", "),
      Grade: Grade.toString(),
      SightWords: SightWords.join(", "),
      ARScore: ARScore.toString(),
      LexileLevelMin: LexileLevelMin,
      LexileLevelMax: LexileLevelMax,
      BookId: "",
      Credits: "Capstone",
      OptionalWords: "Manushkin,Fran",
      LexileLevelStart: LexileLevelMin,
      LexileLevelEnd: LexileLevelMax,
      IsActive: true,
      DocumentList: docList,
      ExtraJSON: "",
      BookChapterList: ExtraList,
      BookChapterQuestionAndAnswerList: Extra2List,
      BookURL: coverImages[0],
    };
    setExportableJSON(json);

    const resp = await BaseService({
      url: "/Book/ePubImportSave",
      method: "POST",
      data: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
        UserToken:
          "DGj+TUGtk9GERZJMnE0yy7NKGyMtAnntAliL/ysncrTMy7AesbCuRm47xGRboG/yny1rw6YPkEpheA/xfrF4sKyLJvUjLObOXLkrHFqveuwzxq14iP/0daHWGrPT0bR5siVqO7SKbTDsCansW5+6kSSkQfKJ+V7VCLlyJMeKXWJgMdy4hhUad4Y6oqgQnXZVJJF3lZQrMwLWrgVQpFZvRNVygJ9q03ALLVnw71Pwrac=",
        AcitivityIds: "1",
        FingerPrintKey: "readability",
      },
    });
    setExportingJson(false);
    console.log("jsonresp", resp.data);
  };

  const updateExportableJson = (newData) => {
    console.log("newdata", newData);
    if (newData.illustration) {
      delete newData["illustration"];
    }
    setAiFormData({
      ...aiFormData,
      Story: newData,
    });
  };

  return (
    <div style={{ marginRight: "2%" }}>
      <LoadingOverlay
        active={loading}
        spinner
        className={loading ? styles.loader : ""}
      >
        <>
          <Page1 getbookData={getbookData} newPreview={newPreview} />
          <BookInfo
            coverImages={editingImage == 2 ? newImage : coverImages}
            aiFormData={aiFormData}
            setAiFormData={setAiFormData}
            getNewPreview={getNewPreview}
            generateImage={generateImage}
            loading={loading}
          />
          <Pages
            pageData={aiFormData}
            illustration={editingImage == 1 ? newImage[0] : coverImages[0]}
            generateImage={generateImage}
            loading={loading}
            updateExportableJson={updateExportableJson}
          />
          <Comprehension
            pageData={aiFormData}
            updateExportableJson={updateExportableJson}
          />
          <Button
            className={styles.exportBtn}
            disabled={aiFormData?.Title || !exportingJson ? false : true}
            onClick={exportJson}
          >
            Export JSON
          </Button>
        </>
      </LoadingOverlay>
    </div>
  );
}

export default SaveBook;

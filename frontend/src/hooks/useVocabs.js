import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setVocabs, setNotes, setPages } from "../actions/appStatusActions";
import screencap from "../api/screencap";

export default () => {
  const [fetchFinished, setFetchFinished] = useState(false);

  const token = useSelector((state) => state.appStatus.token);
  // as we skip the login flow, we hard code the token here, if we  include login flow then we use useSelector to store the token.
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxNDc1NTU1LCJleHAiOjE1OTQwNjc1NTV9.bftFKa84LUmEuAXEwIqGUfr-M1yrouY6SHRzYbBHqCc";

  useEffect(() => {
    screencap
      .get("/screencap/vocabs", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => {
        const vocabs = res.data;
        setVocabs(vocabs);

        const repeatedNotes = vocabs.map((vocab) => vocab.page.note.name);
        const notes = [...new Set(repeatedNotes)];
        setNotes(notes);
        setFetchFinished(true);

        const repeatedPages = vocabs.map((vocab) => vocab.page.name);
        const pages = [...new Set(repeatedPages)];
        setPages(pages);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return { fetchFinished };
};

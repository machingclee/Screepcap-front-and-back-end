import express from "express";
import passport from "passport";
import messages from "../enums/messages";

import Vocab from "../database/models/Vocab";
import Note from "../database/models/Note";
import Page from "../database/models/Page";

const router = express.Router();

router.post(
  "/upload",
  passport.authenticate("jwt", { seesion: false, failWithError: true }),
  errorHandling,
  updateData
);
router.get(
  "/vocabs",
  passport.authenticate("jwt", { seesion: false, failWithError: true }),
  errorHandling,
  getVocabs
);

function errorHandling(err, req, res, next) {
  if (err) {
    res.status(401).json({ message: messages.incorrectUsernameOrPassword });
  } else next();
}

async function getVocabs(req, res) {
  try {
    const allVocabs = await Vocab.findAll({
      include: { all: true, nested: true }
    });
    const filteredVocabs = allVocabs.filter(
      (vocab) => vocab.page.note.user.id === req.user.id
    );
    res.json(filteredVocabs);
  } catch (err) {
    console.log(err);
    res.json({ message: messages.serverError });
  }
}

async function updateData(req, res) {
  const { Notes, Pages, Vocabs } = req.body;
  const USER_ID = req.user.id;

  await insertNotes(Notes, USER_ID);
  await insertPages(Pages);
  await insertVocabs(Vocabs);

  console.log(Notes.length, Pages.length, Vocabs.length);
  res.json({ message: "done" });
}

async function insertNotes(Notes, USER_ID) {
  try {
    for (let note of Notes) {
      const { Id, Name, DateTime, Version } = note;

      const sqliteId = Id;
      const name = Name;
      const dateTime = DateTime;
      const version = Version;
      const userId = USER_ID;

      await Note.create({
        sqliteId,
        name,
        dateTime,
        version,
        userId
      });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

async function insertPages(Pages) {
  try {
    for (let page of Pages) {
      const { Id, Name, DateTime, NoteId, CroppedScreenshotByteArray, Version } = page;
      const sqliteId = Id;
      const sqliteNoteId = NoteId;
      const name = Name;
      const dateTime = DateTime;
      const croppedScreenshot = CroppedScreenshotByteArray.match(
        /__cropped__.*\.png/g
      )[0];
      const version = Version;
      await Page.create({
        sqliteId,
        sqliteNoteId,
        name,
        dateTime,
        croppedScreenshot,
        version
      });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

async function insertVocabs(Vocabs) {
  for (let vocab of Vocabs) {
    const { Id, PageId, Word, Pronounciation, Explaination, Version } = vocab;

    const sqliteId = Id;
    const sqlitePageId = PageId;
    const word = Word;
    const pronounciation = Pronounciation;
    const explanation = Explaination;
    const version = Version;

    await Vocab.create({
      sqliteId,
      sqlitePageId,
      word,
      pronounciation,
      explanation,
      version
    });
  }
  return null;
}

export default router;

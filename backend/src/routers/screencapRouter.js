import express from "express";
import passport from "passport";
import messages from "../enums/messages";
import { sequelize, query } from "../database/database";
import Vocab from "../database/models/Vocab";
import { screencapService } from "../services/screencapServices";

const router = express.Router();

router.post(
  "/upload",
  passport.authenticate("jwt", { seesion: false, failWithError: true }),
  errorHandling,
  uploadVocabs
);

router.get(
  "/notes",
  passport.authenticate("jwt", { seesion: false, failWithError: true }),
  errorHandling,
  getNotes
);

router.get(
  "/vocabs/:sqliteNoteId",
  passport.authenticate("jwt", { seesion: false, failWithError: true }),
  errorHandling,
  getVocabs
);

function errorHandling(err, req, res, next) {
  if (err) {
    console.log(err);
    res.status(401).json({ message: messages.incorrectUsernameOrPassword });
  } else next();
}

async function getNotes(req, res) {
  const userId = req.user.id;
  try {
    const result = await query(
      `
      SELECT * FROM notes
      WHERE "userId" = ${userId};
      `
    );

    console.log(("what is the result", result));
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.json({ message: messages.serverError });
  }
}

async function getVocabs(req, res) {
  const { sqliteNoteId } = req.params;

  try {
    const result = await screencapService.getVocabsBySqliteNoteId(sqliteNoteId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: messages.serverError });
  }
}

async function uploadVocabs(req, res) {
  const { Notes, Pages, Vocabs } = req.body;
  const USER_ID = req.user.id;

  await screencapService.insertNotes(Notes, USER_ID);
  await screencapService.insertPages(Pages);
  await screencapService.insertVocabs(Vocabs);

  console.log(Notes.length, Pages.length, Vocabs.length);
  res.json({ message: "done" });
}

export default router;

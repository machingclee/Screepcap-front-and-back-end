import Note from "../database/models/Note";
import Page from "../database/models/Page";
import Vocab from "../database/models/Vocab";
import { db } from "../database/database";

async function getVocabsBySqliteNoteId(sqliteNoteId) {
  const result = await db.query(
    `
PREPARE get_notes (int) AS
  SELECT v."id", v."word", v."pronounciation", v."explanation", p."dateTime", p."croppedScreenshot"
  FROM vocabs v
  INNER JOIN pages p 
  ON v."sqlitePageId"=p."sqliteId"
  WHERE p."sqliteNoteId"=$1;
EXECUTE get_notes(${sqliteNoteId});
DEALLOCATE get_notes;
    `
  );
  return result;
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

export const screencapService = {
  getVocabsBySqliteNoteId,
  insertNotes,
  insertPages,
  insertVocabs
};

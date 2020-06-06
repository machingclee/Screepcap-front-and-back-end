import express from "express";
const router = express.Router();
import Dictionary from "../database/models/Dictionary";

router.post("/upload", receiveDictionaries);
router.get("/allDictionaries", getAllDictionary);

function receiveDictionaries(req, res) {
  const { Notes, Pages, Vocabs } = req.body;
  const vocab = Vocabs[0];
  console.log(vocab);
  Vocabs.forEach((vocab) => {
    const { PageId, Word, Pronounciation, Explaination } = vocab;

    Dictionary.create({
      pageId: PageId,
      vocab: Word,
      pronounciation: Pronounciation,
      explanation: Explaination
    });
  });

  res.send("received something");
}

async function getAllDictionary(req, res) {
  try {
    const allDictionary = await Dictionary.findAll();
    res.json(allDictionary);
  } catch (err) {
    console.log(err);
  }
}

export default router;

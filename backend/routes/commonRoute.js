import express from 'express';
import mongoose from 'mongoose';
import Vocab from '../models/vocabModel.js';
import { getWordbyId, getAllWords, updateWord, addWord, deleteWord } from '../controllers/vocabController.js';
import { getTranslation, getMeaning } from '../controllers/controller.js';

const router = express.Router();


// vocab routes

router.get("/vocab/:id", getWordbyId);

router.get("/vocab/get/all", getAllWords);

router.put("/vocab/update/:id", updateWord);

router.post("/vocab/create", addWord);

router.delete("/vocab/delete/:id", deleteWord);

// main Controller routes

router.post("/translation", getTranslation);
router.post("/meaning", getMeaning);


export default router;
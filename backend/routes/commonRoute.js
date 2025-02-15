import express from 'express';
import mongoose from 'mongoose';
import Vocab from '../models/vocabModel.js';
import { getWordbyId, getAllWords, updateWord, addWord, deleteWord } from '../controllers/vocabController.js';
import { getTranslation, getMeaning, saveSelection, addFeature, getALLFeature, deleteFeature, updateFeature, addTopic, updateTopic, deleteTopic, getAllTopic} from '../controllers/controller.js';
import { register, login } from '../controllers/loginController.js';

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
router.post("/saveSelection", saveSelection);

// feature routes
router.post("/addFeature", addFeature);
router.post("/getFeatures", getALLFeature);
router.post("/deleteFeature", deleteFeature);
router.post("/updateFeature", updateFeature);

// topic routes
router.post("/addTopic", addTopic);
router.post("/getTopics", getAllTopic);
router.post("/deleteTopic", deleteTopic);
router.post("/updateTopic", updateTopic);

// login routes
router.post("/register", register);
router.post("/login", login);



export default router;
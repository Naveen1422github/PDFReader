import axios from 'axios';
import Feature from '../models/FeatureModel.js';
import Topic from '../models/TopicModel.js';

export const getTranslation = async (req, res) => { 
    const word = req.body.text;
    try {
        const meaning = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        res.status(200).json({ success: true, data: meaning.data });
    } catch (error) {
        console.error("Error in Fetching data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getMeaning =  async (req, res) => {
    const userText = req.body.userText;

    console.log(userText)
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: `Give a detailed meaning of the word: ${userText}` }],
            },
          ],
        }
      );

      // console.log(response.data.candidates[0].content.parts[0].text)
     
      res.json(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      res.status(500).json({ error: "Meaning lookup failed" });
    }
  };

export const saveSelection = async (req, res) => {
    const collectionName = req.body.collection;
    const selection = req.body.selectedText;
    const meaning = req.body.meaning;

    console.log("collectionName", collectionName)
    console.log("selection", selection)
}

export const addFeature = async (req, res) => {
    const {user, name, prompt, enabled} = req.body.featureToAdd;
    console.log("req.body", req.body);
    const feature = new Feature({
        user,
        name,
        prompt,
        enabled,
    });
    console.log("feature", feature);
    try {
        await feature.save();
        res.status(201).json({ success: true, data: feature });
    } catch (error) {
        console.error("Error in Create data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }

    
}

export const getALLFeature = async (req, res) => {
    const user = req.body.user;
    // console.log("user", user);
    try {
        const feature = await Feature.find({user});
        console.log("feature", feature);
        res.status(200).json({ success: true, data: feature });
    } catch (error) {
        console.error("Error in Fetching data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateFeature = async (req, res) => {
  // const id = req.params.id;
  console.log("req.body", req.body);
  const {_id, user, name, prompt, enabled} = req.body.feature;

  if (Object.keys(req.body).length < 1) {
    return res.status(400).json({ success: false, message: "Please provide some data" });
  }

  try {
    const updatedFeature = await Feature.findByIdAndUpdate(_id, {user, name, prompt, enabled}, { new: true });
    res.status(200).json({ success: true, data: updatedFeature });
  } catch (error) {
    console.error("Error in Updating data:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

};

export const deleteFeature = async (req, res) => {
  const id = req.body.id;
  try {
    await Feature.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Feature deleted" });
  } catch (error) {
    console.error("Error in Deleting data:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




export const addTopic = async (req, res) => {
    const {user, name, enabled} = req.body.topicToAdd;
    const topic = new Topic({
        user,
        name,
        enabled,
    });
    try {
        await topic.save();
        res.status(201).json({ success: true, data: topic });
    } catch (error) {
        console.error("Error in Create data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const updateTopic = async (req, res) => {
    const {_id, user, name, enabled} = req.body.topic;

    if (Object.keys(req.body).length < 1) {
        return res.status(400).json({ success: false, message: "Please provide some data" });
    }

    try {
        const updatedTopic = await Topic.findByIdAndUpdate(_id, {user, name, enabled}, { new: true });
        res.status(200).json({ success: true, data: updatedTopic });
    } catch (error) { 
        console.error("Error in Updating data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }

};

export const deleteTopic = async (req, res) => {
    const id = req.body.id;
    try {
        await Topic.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Topic deleted" });
    } catch (error) {
        console.error("Error in Deleting data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const getAllTopic = async (req, res) => {
    const user = req.body.user;
    try {
        const topic = await Topic.find({user});
        console.log("topic", topic);
        res.status(200).json({ success: true, data: topic });
    } catch (error) {
        console.error("Error in Fetching data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
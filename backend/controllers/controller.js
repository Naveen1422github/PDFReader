import axios from 'axios';

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

      console.log(response.data.candidates[0].content.parts[0].text)
     
      res.json(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      res.status(500).json({ error: "Meaning lookup failed" });
    }
  };
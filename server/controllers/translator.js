const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const translate = async (req, res) => {
  try {
    const { textArray, targetLanguage } = req.body;
    // console.log(req.body);
    if (!textArray || !targetLanguage || !Array.isArray(textArray)) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required parameters" });
    }

    const translations = await Promise.all(
      textArray.map(async (text) => {
        try {
          const response = await axios.post(
            `http://127.0.0.1:5000/translate`,
            {
              q: text,
		          source: "auto",
		          target:  targetLanguage,
            }
          );
          // console.log(response.data);
          return response.data.translatedText;
        } catch (error) {
          console.error('Translation error:', error);
          return text; // fallback to original text if error occurs
        }
      })
    );

    res.json({ translatedTexts: translations });
  } catch (error) {
    console.error("Error translating:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};

module.exports = { translate };
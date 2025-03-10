import React from "react";
import Cookies from "js-cookie";

// Mapping of language names to their ISO 639-1 codes
const languageCodes = {
  "Hindi": "hi",
  "Bengali": "bn",
  "Telugu": "te",
  "Marathi": "mr",
  "Tamil": "ta",
  "Urdu": "ur",
  "Gujarati": "gu",
  "Kannada": "kn",
  "Odia": "or",
  "Malayalam": "ml",
  "Punjabi": "pa",
  "Assamese": "as",
  "Kashmiri": "ks",
  "Nepali": "ne",
  "Sindhi": "sd",
  "Meitei (Manipuri)": "mni",
};

const LanguageSelector = () => {
  const handleLanguageClick = (language) => {
    const languageCode = languageCodes[language]; // Get the ISO 639-1 code
    if (languageCode) {
      Cookies.set('selectedLanguage', languageCode, { expires: 7 });
      window.location.reload(); // Reload the page to apply the new language
    } 
  };

  return (
    <div className="p-6 pt-20 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Select a Language</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.keys(languageCodes).map((language, index) => (
          <button
            key={index}
            className="p-2 bg-gray-100 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-lg shadow-md text-center"
            onClick={() => handleLanguageClick(language)}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;

import axios from "axios";
import Cookies from "js-cookie";

const targetLanguage = Cookies.get("selectedLanguage");

const translatePage = async () => {
  const elements = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, span, div, section, article, li, a, button, label"
  );

  // console.log(elements);
  let textMap = new Map(); // Unique text -> elements
  let uniqueTexts = new Set(); // Use Set to store unique text values

  Array.from(elements).forEach((el) => {
    if (el.children.length === 0) {
      // Check if the element is a leaf element
      const text = el.textContent?.trim();
      if (text && text.length > 1) {
        if (!textMap.has(text)) textMap.set(text, []); // Store text if not already present
        textMap.get(text).push(el); // Associate elements with this text
        uniqueTexts.add(text); // Add text to Set
      }
    }
  });

  const uniqueTextArray = Array.from(uniqueTexts); // Convert Set to Array

  if (uniqueTextArray.length === 0) {
    console.warn("No text extracted from the page.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/translate", {
      textArray: uniqueTextArray, // Send only unique texts
      targetLanguage,
    });

    const translatedTexts = response.data.translatedTexts;

    uniqueTextArray.forEach((originalText, index) => {
      const translatedText = translatedTexts[index];
      textMap.get(originalText).forEach((element) => {
        element.textContent = translatedText; // Replace all occurrences of the original text
      });
    });
  } catch (error) {
    console.error("Translation error:", error);
  }
};

// Run after page load
window.onload = () => {
  translatePage("hi"); // Change language as needed
};

export default translatePage;
